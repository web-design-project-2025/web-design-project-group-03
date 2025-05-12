// Favorite and saved workouts on favorite.html
const favoriteContainer = document.getElementById("favorite-container");
const savedContainer = document.getElementById("saved-container");

// ---------- FAVORITES ----------
if (favoriteContainer) {
  const favoriteItems = JSON.parse(localStorage.getItem("favoriteItems")) || [];

  if (favoriteItems.length === 0) {
    favoriteContainer.innerHTML = "<p>No favorite items found.</p>";
  } else {
    favoriteContainer.innerHTML = favoriteItems
      .map(
        (item, index) => `
        <div class="favorite-item">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <p>Time: ${item.time}</p>
          <button class="remove-favorite" data-index="${index}">Remove from Favorites</button>
        </div>`
      )
      .join("");

    document.querySelectorAll(".remove-favorite").forEach((btn) => {
      btn.addEventListener("click", function () {
        const idx = parseInt(this.getAttribute("data-index"));
        removeFromFavorite(idx);
      });
    });
  }
}

function removeFromFavorite(idx) {
  const favoriteItems = JSON.parse(localStorage.getItem("favoriteItems")) || [];
  favoriteItems.splice(idx, 1);
  localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
  window.location.reload();
}

// ---------- SAVED WORKOUTS ----------
if (savedContainer) {
  const savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];

  if (savedItems.length === 0) {
    savedContainer.innerHTML = "<p>No saved items found.</p>";
  } else {
    savedContainer.innerHTML = savedItems
      .map(
        (item, index) => `
        <div class="saved-item">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <button class="remove-saved" data-index="${index}">Remove from Saved</button>
        </div>`
      )
      .join("");

    document.querySelectorAll(".remove-saved").forEach((btn) => {
      btn.addEventListener("click", function () {
        const idx = parseInt(this.getAttribute("data-index"));
        removeFromSaved(idx);
      });
    });
  }
}

function removeFromSaved(idx) {
  const savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];
  savedItems.splice(idx, 1);
  localStorage.setItem("savedItems", JSON.stringify(savedItems));
  window.location.reload();
}

// ---------- WORKOUT DETAIL FROM workouts.json ----------
fetch("json/workouts.json")
  .then((response) => response.json())
  .then((workouts) => {
    const workoutId = new URLSearchParams(window.location.search).get("id");
    const workout = workouts[workoutId];

    if (workout) {
      document.getElementById("workout-name").innerText = workout.name;
      document.getElementById("workout-description").innerText =
        workout.description || "No description available.";
      document.getElementById("workout-time").innerText =
        workout.time || "No time available.";

      const addToFavoriteButton = document.getElementById("add-to-favorite");
      if (addToFavoriteButton) {
        addToFavoriteButton.addEventListener("click", function () {
          const favoriteItems =
            JSON.parse(localStorage.getItem("favoriteItems")) || [];

          const newItem = {
            id: String(workout.id),
            name: workout.name,
            description: workout.description || "No description available.",
            time: workout.time || "No time available.",
          };

          favoriteItems.push(newItem);
          localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
          alert("Added to favorites!");
        });
      }
    }
  })
  .catch((error) => {
    console.error("Error loading workouts.json:", error);
  });

// ---------- SAVE WORKOUT FROM BUILDER ----------
const saveButton = document.getElementById("save-workout");
if (saveButton) {
  saveButton.addEventListener("click", () => {
    const workoutList = document.querySelectorAll("#workout-list li");

    const exercises = Array.from(workoutList)
      .filter((li) => !li.classList.contains("placeholder"))
      .map((li) => ({
        name:
          li.querySelector(".exercise-title")?.textContent || li.textContent,
        description:
          li.querySelector(".exercise-description")?.textContent || "",
        id: li.getAttribute("data-id"),
      }));

    if (exercises.length === 0) {
      alert("No exercises to save.");
      return;
    }

    const savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];

    const newItem = {
      id: Date.now(), // simple unique ID
      title: "Custom Workout",
      description: `Includes ${exercises.length} exercises`,
      exercises: exercises,
    };

    savedItems.push(newItem);
    localStorage.setItem("savedItems", JSON.stringify(savedItems));
    alert("Workout saved!");
  });
}
