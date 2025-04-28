const hamMenu = document.querySelector(".ham-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});

//search bar
function searchPage() {
  let query = document.getElementById("search-box").value.toLowerCase();
  if (query === "about") {
    window.location.href = "about.html";
  } else if (query === "community") {
    window.location.href = "Community.html";
  } else if (query === "courses") {
    window.location.href = "courses.html";
  } else if (query === "goals") {
    window.location.href = "Goals.html";
  } else {
    window.location.href = "search.html";
  }
}
