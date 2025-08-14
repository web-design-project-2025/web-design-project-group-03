document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("register-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("register-username").value.trim();
    const password = document.getElementById("register-password").value;

    if (!username || !password) {
      alert("Please fill in both fields.");
      return;
    }

    if (!/^[a-zA-Z0-9]{5,20}$/.test(username)) {
      alert("Username must be 5-20 characters and only letters/numbers.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (users[username]) {
      alert("Username already taken.");
      return;
    }

    users[username] = password;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful. You can now log in.");
    window.location.href = "Account.html";
  });
});
