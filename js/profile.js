// click event to all dropdown buttons with data-dropdown-btn attribute
document.querySelectorAll("[data-dropdown-btn]").forEach((button) => {
  button.addEventListener("click", () => {
    const panel = button.nextElementSibling;
    if (panel) {
      panel.classList.toggle("active");
    }
  });
});
