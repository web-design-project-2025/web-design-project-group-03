document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();  // prevents from submitting traditionally

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // basic client val
        if (!username || !password) {
            alert("Please enter both username and password.");
            return;
        }

        // username parameters
        if (!/^[a-zA-Z0-9]{5,20}$/.test(username)) {
            alert("Username must be between 5-20 characters and contain only letters and numbers.");
            return;
        }

        // password strength
        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        // programmed demo user
        const validUsername = "user123";
        const validPassword = "password123";

        // simulating backend validation
        if (username === validUsername && password === validPassword) {
            // store session data in localStorage (simulate login session)
            localStorage.setItem("loggedIn", true);

            // redirect to the home page if login is successful
            window.location.href = "home-account.html";
        } else {
            alert("Invalid username or password.");
        }
    });
});

// checks if already logged in 
window.addEventListener("load", () => {
    if (localStorage.getItem("loggedIn") === "true") {
        // if user logged in, redirect
        window.location.href = "home-account.html";
    }
});
