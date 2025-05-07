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
  controls.classList.remove("hide");
  clearTimeout(hideTimeout);
}

// Hide video controls after a delay
function startHideTimer() {
  clearTimeout(hideTimeout);
  hideTimeout = setTimeout(() => controls.classList.add("hide"), 2000);
}

// Mouse enter: Show controls
videoWrapper.addEventListener("mouseenter", showControls);

// Mouse leave: Start hide timer
videoWrapper.addEventListener("mouseleave", startHideTimer);

// Play/Pause button click
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

// Update time display as video plays
video.addEventListener("timeupdate", () => {
  videoTime.textContent = `${Math.floor(video.currentTime)}s`;
});

// Reset play button when video ends
video.addEventListener("ended", () => {
  playPauseBtn.textContent = "▶"; // Reset to play icon
});

// --- SEARCH FUNCTIONALITY ---

document
  .getElementById("search-box")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      searchPage();
    }
  });

// Handle page redirection based on search input
function searchPage() {
  const query = document
    .getElementById("search-box")
    .value.trim()
    .toLowerCase();
  const pages = {
    about: "about.html",
    community: "Community.html",
    courses: "courses.html",
    goals: "Goals.html",
    inspiration: "inspiration.html",
  };

  window.location.href = pages[query] || "search.html";
}

// Initial display of controls and timer start
showControls();
startHideTimer();
