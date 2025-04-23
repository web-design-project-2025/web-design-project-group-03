//dropdown "current goals" - Goals page
const button = document.querySelector(".dropdown-button");
const panel = document.querySelector(".dropdown-panel");

button.addEventListener("click", () => {
  panel.classList.toggle("active");
});

//dropdown "create goals" - Goals page
const button2 = document.querySelector(".dropdown-button2");
const panel2 = document.querySelector(".dropdown-panel2");

button2.addEventListener("click", () => {
  panel2.classList.toggle("active");
});
