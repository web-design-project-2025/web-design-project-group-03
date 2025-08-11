document.addEventListener("DOMContentLoaded", () => {
  // ----- GLOBAL UI FUNCTIONALITY -----

  // back button functionality
  const backButton = document.getElementById("back-button");
  if (backButton) {
    backButton.addEventListener("click", () => {
      window.history.back();
    });
  }

  const hamMenu = document.querySelector(".ham-menu");
  const offScreenMenu = document.querySelector(".off-screen-menu");
  const search = document.querySelector(".search");

  const originalParent = search.parentElement;
  let originalNextSibling = search.nextElementSibling; // might be null

  function moveSearchIntoMenu() {
    if (!offScreenMenu.contains(search)) {
      offScreenMenu.prepend(search);
      search.classList.add("slide-in");
    }
  }

  function moveSearchBack() {
    if (!originalParent.contains(search)) {
      if (
        originalNextSibling &&
        originalNextSibling.parentElement === originalParent
      ) {
        originalParent.insertBefore(search, originalNextSibling);
      } else {
        originalParent.appendChild(search);
      }
      search.classList.remove("slide-in");
    }
    // Uupd sibling every time we move it back
    originalNextSibling = search.nextElementSibling;
  }

  function checkWidthAndMoveSearch() {
    if (window.innerWidth <= 968) {
      moveSearchIntoMenu();
    } else {
      moveSearchBack();
    }
  }

  // initall setup on page load
  window.addEventListener("load", () => {
    checkWidthAndMoveSearch();
    // upd sibling in case search is inside original parent on load
    if (originalParent.contains(search)) {
      originalNextSibling = search.nextElementSibling;
    }
  });

  // listen resize
  window.addEventListener("resize", checkWidthAndMoveSearch);

  // ham toggle purely toggles menu visibility
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
