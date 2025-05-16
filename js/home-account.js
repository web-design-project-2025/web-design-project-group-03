document.addEventListener("DOMContentLoaded", () => {
  const userDisplay = document.getElementById("user-name");

  const username = localStorage.getItem("username");
  if (username) {
    userDisplay.textContent = `Welcome, ${username}!`;
  } else {
    userDisplay.textContent = "Welcome!";
  }
});
