document.addEventListener("DOMContentLoaded", () => {
  const userDisplay = document.getElementById("user-name");

  const username = localStorage.getItem("username");
  if (username) {
    userDisplay.textContent = `Welcome, ${username}!`;
  } else {
    userDisplay.textContent = "Welcome!";
  }
});

// ---------- SAVE WORKOUT AND UPDATE LATEST PANEL ----------
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
      id: Date.now(),
      title: "Custom Workout",
      description: `Includes ${exercises.length} exercises`,
      exercises: exercises,
    };

    savedItems.push(newItem);
    localStorage.setItem("savedItems", JSON.stringify(savedItems));
    alert("Workout saved!");

    displayLatestWorkout(); // upd panel after saving
  });
}

// ---------- DISPLAY LATEST WORKOUT PANEL ----------
function displayLatestWorkout() {
  const latestPanel = document.getElementById("latest");
  if (!latestPanel) return;

  const savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];

  if (savedItems.length === 0) {
    latestPanel.innerHTML = "<p>No saved workouts yet.</p>";
    return;
  }

  const latest = savedItems[savedItems.length - 1];

  latestPanel.innerHTML = `
    <h3>${latest.title || "Unnamed Workout"}</h3>
    <p>${latest.description || "No description provided."}</p>
    <p><strong>Exercises:</strong> ${latest.exercises?.length || 0}</p>
  `;
}

// load the latest workout when page loads
displayLatestWorkout();
