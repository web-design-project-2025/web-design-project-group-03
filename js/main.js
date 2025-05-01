const hamMenu = document.querySelector(".ham-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});

document
  .getElementById("search-box")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      searchPage(); // Call your search function
    }
  });

function searchPage() {
  let query = document.getElementById("search-box").value.toLowerCase();
  if (query === "about") {
    window.location.href = "about.html";
  } else if (query === "community") {
    window.location.href = "Community.html";
  } else if (query === "courses") {
    window.location.href = "courses.html";
  } else if (query === "goals") {
    window.location.href = "goals.html";
  } else if (query === "inspiration") {
    window.location.href = "inspiration.html";
  } else {
    window.location.href = "search.html";
  }
}
