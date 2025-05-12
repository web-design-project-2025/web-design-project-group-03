const exerciseContainer = document.getElementById("exercise-list");
const workoutList = document.getElementById("workout-list");
const template = document.getElementById("exercise-template");
let workout = [];

async function fetchExercises() {
  try {
    const response = await fetch(
      "https://wger.de/api/v2/exerciseinfo/?limit=100"
    );
    const data = await response.json();
    renderExercises(data.results);
  } catch (error) {
    exerciseContainer.innerHTML = "<p>Error fetching data.</p>";
    console.error(error);
  }
}

function renderExercises(exercises) {
  exerciseContainer.innerHTML = "";
  exercises.forEach((ex) => {
    const card = createExerciseCard(ex, true);
    exerciseContainer.appendChild(card);
  });
}

function addToWorkout(exercise) {
  if (!workout.find((e) => e.id === exercise.id)) {
    workout.push(exercise);
    updateWorkoutList();
  }
}

function removeFromWorkout(id) {
  workout = workout.filter((e) => e.id !== id);
  updateWorkoutList();
}

function updateWorkoutList() {
  workoutList.innerHTML = "";

  if (workout.length === 0) {
    workoutList.innerHTML =
      '<li class="placeholder">No exercises added yet.</li>';
    return;
  }

  workout.forEach((exercise) => {
    const card = createExerciseCard(exercise, false);
    const li = document.createElement("li");
    li.appendChild(card);
    workoutList.appendChild(li);
  });
}

function createExerciseCard(ex, showAddButton) {
  const clone = template.content.cloneNode(true);
  clone.querySelector(".exercise-title").textContent =
    ex.name || "No name available";
  clone.querySelector(
    ".exercise-cat"
  ).textContent = `Category: ${ex.category.name}`;
  clone.querySelector(".exercise-description").textContent =
    ex.description || "No description available";

  const musclesContainer = clone.querySelector(".muscles");
  musclesContainer.innerHTML = ex.muscles.length
    ? ex.muscles.map((m) => `<span class="tag">${m.name}</span>`).join("")
    : '<span class="tag">N/A</span>';

  const equipmentContainer = clone.querySelector(".equipment");
  equipmentContainer.innerHTML = ex.equipment.length
    ? ex.equipment.map((eq) => `<span class="tag">${eq.name}</span>`).join("")
    : '<span class="tag">Bodyweight</span>';

  const button = clone.querySelector(".action-button");
  button.textContent = showAddButton ? "Add to Workout" : "Remove";
  button.className = showAddButton
    ? "add-button action-button"
    : "remove-btn action-button";
  button.onclick = () => {
    if (showAddButton) {
      addToWorkout(ex);
    } else {
      removeFromWorkout(ex.id);
    }
  };

  return clone;
}

fetchExercises();

//used help from github copilot to create the above code
