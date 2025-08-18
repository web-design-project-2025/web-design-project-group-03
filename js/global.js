document.addEventListener("DOMContentLoaded", () => {
  // ----- GLOBAL UI FUNCTIONALITY -----

  // back button functionality
  const backButton = document.getElementById("back-button");
  if (backButton) {
    backButton.addEventListener("click", () => {
      window.history.back();
    });
  }

  // Move search between desktop and hamburger menu
  const search = document.querySelector(".search"); // desktop search
  const offScreenMenu = document.querySelector(".off-screen-menu");

  let placeholder;
  if (search && offScreenMenu) {
    const originalParent = search.parentNode;
    placeholder = document.createElement("div");
    placeholder.style.display = "none";
    originalParent.insertBefore(placeholder, search);

    function moveSearchIntoMenu() {
      if (search.parentNode !== offScreenMenu) {
        offScreenMenu.prepend(search);
      }
    }

    function moveSearchBack() {
      if (search.parentNode !== originalParent) {
        originalParent.insertBefore(search, placeholder);
      }
    }

    function handleResize() {
      if (window.innerWidth <= 968) {
        moveSearchIntoMenu();
      } else {
        moveSearchBack();
      }
    }

    // Run once and on resize
    handleResize();
    window.addEventListener("resize", handleResize);
  }

  // ham toggle purely toggles menu visibility
  const hamMenu = document.querySelector(".ham-menu");
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

  const searchForm = document.getElementById("search-form");
  if (searchForm) {
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form from reloading the page
      searchPage();
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
      courses: "courses.html",
      exercise: "exercise.html",
      favorite: "favorite.html",
      inspiration: "inspiration.html",
      register: "Register.html",
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
