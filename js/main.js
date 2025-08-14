document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("home-video");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const videoTime = document.getElementById("videoTime");
  const controls = document.getElementById("videoControls");
  const videoWrapper = document.querySelector(".video-wrapper");

  let hideTimeout;

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

  if (videoWrapper) {
    videoWrapper.addEventListener("mouseenter", showControls);
    videoWrapper.addEventListener("mouseleave", startHideTimer);
  }

  if (playPauseBtn && video) {
    playPauseBtn.addEventListener("click", () => {
      if (video.paused) {
        video.play();
        playPauseBtn.textContent = "⏸";
      } else {
        video.pause();
        playPauseBtn.textContent = "▶";
      }
      showControls();
    });
  }

  if (video && videoTime) {
    video.addEventListener("timeupdate", () => {
      videoTime.textContent = `${Math.floor(video.currentTime)}s`;
    });

    video.addEventListener("ended", () => {
      if (playPauseBtn) playPauseBtn.textContent = "▶";
    });
  }

  showControls();
  startHideTimer();

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

  const navbar = document.querySelector(".nav-bar");
  const footer = document.querySelector("footer");

  if (navbar) navbar.classList.add("hidden");
  if (footer) footer.classList.add("hidden");
});
