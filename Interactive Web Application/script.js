const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const clearAllBtn = document.getElementById("clearAll");
const emptyState = document.getElementById("emptyState");

const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");
const pendingCount = document.getElementById("pendingCount");

const filterButtons = document.querySelectorAll(".filter-btn");
const themeToggle = document.getElementById("themeToggle");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

/* Enable button */
taskInput.addEventListener("input", () => {
    addBtn.disabled = taskInput.value.trim() === "";
});

/* Add task */
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !addBtn.disabled) addTask();
});

function addTask() {
    const now = new Date();
    const time = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    tasks.push({ text: taskInput.value.trim(), completed: false, time });
    taskInput.value = "";
    addBtn.disabled = true;
    saveAndRender();
}

/* Render tasks */
function renderTasks() {
    taskList.innerHTML = "";

    const filteredTasks = tasks.filter(task => {
        if (currentFilter === "completed") return task.completed;
        if (currentFilter === "pending") return !task.completed;
        return true;
    });

    emptyState.style.display = tasks.length === 0 ? "block" : "none";

    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");
        if (task.completed) li.classList.add("completed");

        const left = document.createElement("div");
        left.className = "task-left";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => toggleTask(index));

        const span = document.createElement("span");
        span.textContent = task.text;

        const timeSpan = document.createElement("span");
        timeSpan.className = "task-time";
        timeSpan.textContent = task.time;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑";
        deleteBtn.className = "delete-btn";
        deleteBtn.addEventListener("click", () => deleteTask(index));

        left.appendChild(checkbox);
        left.appendChild(span);
        left.appendChild(timeSpan);

        li.appendChild(left);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });

    updateStats();
}

function updateStats() {
    totalCount.textContent = tasks.length;
    completedCount.textContent = tasks.filter(t => t.completed).length;
    pendingCount.textContent = tasks.filter(t => !t.completed).length;
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveAndRender();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveAndRender();
}

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});

clearAllBtn.addEventListener("click", () => {
    tasks = [];
    saveAndRender();
});

/* Theme toggle */
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("theme-dark");
    themeToggle.textContent = document.body.classList.contains("theme-dark") ? "☀️" : "🌙";
});

function saveAndRender() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

/* Initial load */
renderTasks();
