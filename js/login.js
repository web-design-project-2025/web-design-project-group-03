document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // prevent default form submission

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // basic input check
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    // user formatting
    if (!/^[a-zA-Z0-9]{5,20}$/.test(username)) {
      alert(
        "Username must be between 5-20 characters and contain only letters and numbers."
      );
      return;
    }

    // pass strength
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    // demo
    const validUsername = "user123";
    const validPassword = "password123";

    if (username === validUsername && password === validPassword) {
      localStorage.setItem("loggedIn", "true");
      window.location.href = "home-account.html"; // redirect if login is successful
    } else {
      alert("Invalid username or password.");
    }
  });
});

// redirect if already logged in
window.addEventListener("load", () => {
  if (localStorage.getItem("loggedIn") === "true") {
    window.location.href = "home-account.html";
  }
});
