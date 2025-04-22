//dropdown "current goals" - Goals page
const button = document.querySelector(".dropdown-button");
const panel = document.querySelector(".dropdown-panel");

button.addEventListener("click", () => {
  panel.classList.toggle("active");
});
