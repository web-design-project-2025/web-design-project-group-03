document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");

  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Load existing users or create new object
    const users = JSON.parse(localStorage.getItem("users")) || {};

    // Store new user
    users[username] = password;

    // Save updated users back to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created!");
    registerForm.reset();
  });
});
