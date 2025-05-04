const hamMenu = document.querySelector(".ham-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");
const video = document.getElementById("home-video");
const playPauseBtn = document.getElementById("playPauseBtn");
const videoTime = document.getElementById("videoTime");
const controls = document.getElementById("videoControls");
const backToTopButton = document.getElementById("backToTop");
const videoWrapper = document.querySelector(".video-wrapper");

let hideTimeout;

// Toggle hamburger menu
hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});

// Show back-to-top button on scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add("visible");
  } else {
    backToTopButton.classList.remove("visible");
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// --- VIDEO LOGIC ---
function showControls() {
  controls.classList.remove("hide");
  clearTimeout(hideTimeout);
}

function startHideTimer() {
  clearTimeout(hideTimeout);
  hideTimeout = setTimeout(() => {
    controls.classList.add("hide");
  }, 2000);
}

// controls show when mouse enters video-wrapper
videoWrapper.addEventListener("mouseenter", showControls);

// start hide timer when mouse leaves video-wrapper
videoWrapper.addEventListener("mouseleave", startHideTimer);

// play/pause
playPauseBtn.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    playPauseBtn.textContent = "⏸";
  } else {
    video.pause();
    playPauseBtn.textContent = "▶";
  }
  showControls(); // reset hide timer
});

// upd time display
video.addEventListener("timeupdate", () => {
  videoTime.textContent = `${Math.floor(video.currentTime)}s`;
});

// reset play button when video ends
video.addEventListener("ended", () => {
  playPauseBtn.textContent = "▶";
});

// Initial display of controls
showControls();
startHideTimer();

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

