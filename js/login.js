document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

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
      // set login state and expiry
      const loginDuration = 10 * 60 * 1000; // 10 minutes
      const expiryTime = Date.now() + loginDuration;

      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("expiryTime", expiryTime);

      localStorage.setItem("username", username);

      window.location.href = "home-account.html";
    } else {
      alert("Invalid username or password.");
    }
  });
});

// redirect or logout if session is expired
window.addEventListener("load", () => {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  const expiryTime = localStorage.getItem("expiryTime");

  if (!isLoggedIn || !expiryTime || Date.now() > Number(expiryTime)) {
    // session expired or invalid
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("expiryTime");

    if (window.location.pathname.includes("home-account.html")) {
      alert("Your session has expired. Please log in again.");
      window.location.href = "login.html";
    }
  }
});
