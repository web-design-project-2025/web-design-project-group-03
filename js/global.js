document.addEventListener("DOMContentLoaded", () => {
  // ----- GLOBAL UI FUNCTIONALITY -----

  // back button functionality
  const backButton = document.getElementById("back-button");
  if (backButton) {
    backButton.addEventListener("click", () => {
      window.history.back();
    });
  }

  // hamburger menu toggle
  const hamMenu = document.querySelector(".ham-menu");
  const offScreenMenu = document.querySelector(".off-screen-menu");

  if (hamMenu && offScreenMenu) {
    hamMenu.addEventListener("click", () => {
      hamMenu.classList.toggle("active");
      offScreenMenu.classList.toggle("active");
    });
  }

  // back-to-top button logic
  const backToTopButton = document.getElementById("backToTop");

  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      backToTopButton.classList.toggle("visible", window.scrollY > 300);
    });

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // search page redirection
  function searchPage() {
    const searchBox = document.getElementById("search-box");
    if (!searchBox) return;
    let query = searchBox.value.toLowerCase();
    const routes = {
      home: "index.html",
      about: "about.html",
      account: "Account.html",
      workouts: "workouts.html",
      community: "Community.html",
      exercise: "exercise.html",
      favorite: "favorite.html",
      inspiration: "inspiration.html",
      products: "products.html",
      goals: "Goals.html",
    };
    window.location.href = routes[query] || "search.html";
  }

  // hide navbar and footer by default
  const navbar = document.querySelector(".nav-bar");
  const footer = document.querySelector("footer");

  if (navbar) navbar.classList.add("hidden");
  if (footer) footer.classList.add("hidden");
});
