const hamMenu = document.querySelector(".ham-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");
const video = document.getElementById("home-video");
const playPauseBtn = document.getElementById("playPauseBtn");
const videoTime = document.getElementById("videoTime");
const controls = document.getElementById("videoControls");
const backToTopButton = document.getElementById("backToTop");
const videoWrapper = document.querySelector(".video-wrapper");

let hideTimeout;

// Toggle hamburger menu visibility
hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});

// Show back-to-top button on scroll
window.addEventListener("scroll", () => {
  backToTopButton.classList.toggle("visible", window.scrollY > 300);
});

// Scroll to top on back-to-top button click
backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// --- VIDEO LOGIC ---
// show video controls and clear the hide timer
function showControls() {
  if (controls) {
    controls.classList.remove("hide");
    clearTimeout(hideTimeout);
  }
}

function startHideTimer() {
  if (controls) {
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => controls.classList.add("hide"), 2000);
  }
}

if (controls) {
  showControls();
  startHideTimer();
}

// Mouse enter: Show controls
if (videoWrapper) {
  videoWrapper.addEventListener("mouseenter", showControls);
  videoWrapper.addEventListener("mouseleave", startHideTimer);
}

// Mouse leave: Start hide timer
if (videoWrapper) {
  videoWrapper.addEventListener("mouseleave", startHideTimer);
} //
// videoWrapper.addEventListener("mouseleave", startHideTimer);

// Play/Pause button click
if (playPauseBtn && video) {
  playPauseBtn.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      playPauseBtn.textContent = "⏸"; // Pause icon
    } else {
      video.pause();
      playPauseBtn.textContent = "▶"; // Play icon
    }
    showControls(); // Reset hide timer
  });
}

if (video && videoTime) {
  video.addEventListener("timeupdate", () => {
    videoTime.textContent = `${Math.floor(video.currentTime)}s`;
  });

  video.addEventListener("ended", () => {
    if (playPauseBtn) playPauseBtn.textContent = "▶"; // Reset to play icon
  });
}

// Initial display of controls and timer start
showControls();
startHideTimer();

// Handle page redirection based on search input
function searchPage() {
  const searchBox = document.getElementById("search-box");
  if (!searchBox) {
    console.warn("Search box not found!");
    return;
  }
  let query = searchBox.value.toLowerCase();
  if (query === "home") {
    window.location.href = "index.html";
  } else if (query === "about") {
    window.location.href = "about.html";
  } else if (query === "account") {
    window.location.href = "Account.html";
  } else if (query === "workouts") {
    window.location.href = "workouts.html";
  } else if (query === "Community") {
    window.location.href = "Community.html";
  } else if (query === "exercise") {
    window.location.href = "exercise.html";
  } else if (query === "favorite") {
    window.location.href = "favorite.html";
  } else if (query === "inspiration") {
    window.location.href = "inspiration.html";
  } else if (query === "products") {
    window.location.href = "products.html";
  } else if (query === "goals") {
    window.location.href = "Goals.html";
  } else {
    window.location.href = "search.html";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const workoutPages = {
    high: "workouts.html?id=6",
    medium: "workouts.html?id=2",
    low: "workouts.html?id=9",
  };

  Object.entries(workoutPages).forEach(([intensity, url]) => {
    const panel = document.getElementById(intensity);
    if (panel) {
      const iframe = document.createElement("iframe");
      iframe.src = url;
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.border = "none";
      panel.appendChild(iframe);
    }
  });
});
const navbar = document.querySelector(".nav-bar");
const footer = document.querySelector("footer");

navbar.classList.add("hidden");
footer.classList.add("hidden");
