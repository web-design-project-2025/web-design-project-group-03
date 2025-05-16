document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    if (!validateUsername(username)) {
      alert(
        "Username must be between 5-20 characters and contain only letters and numbers."
      );
      return;
    }

    if (!validatePassword(password)) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    // Hardcoded login, use for demo
    const hardcodedUsername = "user123";
    const hardcodedPassword = "user123";

    if (username === hardcodedUsername && password === hardcodedPassword) {
      loginSuccess(username);
      return;
    }

    // (Only chec localStorage if not hardcoded)
    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[username] && users[username] === password) {
      loginSuccess(username);
    } else {
      alert("Invalid username or password.");
    }
  });
});

function loginSuccess(username) {
  const loginDuration = 10 * 60 * 1000; // 10 minutes
  const expiryTime = Date.now() + loginDuration;

  localStorage.setItem("loggedIn", "true");
  localStorage.setItem("expiryTime", expiryTime);
  localStorage.setItem("username", username);

  window.location.href = "home-account.html";
}

function validateUsername(username) {
  return /^[a-zA-Z0-9]{5,20}$/.test(username);
}

function validatePassword(password) {
  return password.length >= 6;
}
