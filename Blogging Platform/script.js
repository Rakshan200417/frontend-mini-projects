const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const publishBtn = document.getElementById("publishBtn");
const postsContainer = document.getElementById("postsContainer");

let posts = JSON.parse(localStorage.getItem("newsPosts")) || [];
let editId = null;

/* SAVE TO LOCALSTORAGE */
function savePosts() {
    localStorage.setItem("newsPosts", JSON.stringify(posts));
}

/* RENDER POSTS */
function renderPosts() {
    postsContainer.innerHTML = "";

    posts.forEach(post => {
        const article = document.createElement("div");
        article.className = "article";

        article.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <div class="date">${post.date}</div>
            <div class="article-actions">
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </div>
        `;

        /* EDIT */
        article.querySelector(".edit").addEventListener("click", () => {
            titleInput.value = post.title;
            contentInput.value = post.content;
            editId = post.id;
            publishBtn.textContent = "Update Article";
        });

        /* DELETE */
        article.querySelector(".delete").addEventListener("click", () => {
            if (confirm("Are you sure you want to delete this article?")) {
                posts = posts.filter(p => p.id !== post.id);
                savePosts();
                renderPosts();
            }
        });

        postsContainer.appendChild(article);
    });
}

/* PUBLISH / UPDATE */
publishBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (!title || !content) {
        alert("Headline and content are required");
        return;
    }

    if (editId) {
        // UPDATE
        posts = posts.map(post =>
            post.id === editId ? { ...post, title, content } : post
        );
        editId = null;
        publishBtn.textContent = "Publish Article";
    } else {
        // ADD NEW
        posts.unshift({
            id: Date.now(), // UNIQUE ID
            title,
            content,
            date: new Date().toLocaleDateString()
        });
    }

    titleInput.value = "";
    contentInput.value = "";
    savePosts();
    renderPosts();
});

/* INITIAL LOAD */
renderPosts();
