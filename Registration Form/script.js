const form = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const country = document.getElementById("country").value;
    const message = document.getElementById("message").value.trim();
    const gender = document.querySelector('input[name="gender"]:checked');

    if (
        fullname === "" ||
        email === "" ||
        phone === "" ||
        country === "" ||
        message === "" ||
        !gender
    ) {
        alert("Please fill all required fields.");
        return;
    }

    successMessage.style.display = "block";
    form.reset();

    setTimeout(() => {
        successMessage.style.display = "none";
    }, 3000);
});
