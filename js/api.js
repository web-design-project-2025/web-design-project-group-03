const exerciseContainer = document.getElementById("exercise-list");
const workoutList = document.getElementById("workout-list");
const template = document.getElementById("exercise-template");
let workout = [];

async function fetchExercises() {
  try {
    const response = await fetch(
      "https://wger.de/api/v2/exerciseinfo/?limit=100&language=2"
    );
    const data = await response.json();
    renderExercises(data.results);
  } catch (error) {
    exerciseContainer.innerHTML = "<p>Error fetching data.</p>";
    console.error(error);
  }
}

function renderExercises(exercises) {
  exerciseContainer.innerHTML = ""; // Clear previous content
  exercises.forEach((exercise) => {
    const card = createExerciseCard(exercise, true); // true = show "Add to Workout"
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

  // Try to find English translation (language code 2), fallback to first available translation
  const translation =
    ex.translations?.find((t) => t.language === 2) || ex.translations?.[0];

  const name = translation?.name?.trim() || "No name available";
  clone.querySelector(".exercise-title").textContent = name;

  clone.querySelector(".exercise-cat").textContent = ex.category?.name
    ? `Category: ${ex.category.name}`
    : "Category: N/A";

  const description =
    translation?.description?.trim() || "No description available";
  clone.querySelector(".exercise-description").innerHTML = description;

  // Handling muscles - ensuring no repeated tags and no "undefined"
  const muscles = ex.muscles?.length
    ? ex.muscles.map((m) => `<span class="tag">${m.name}</span>`).join(", ")
    : '<span class="tag">No muscles listed</span>';

  // Handling equipment - show "Bodyweight" or list the equipment
  const equipment = ex.equipment?.length
    ? ex.equipment.map((eq) => `<span class="tag">${eq.name}</span>`).join(", ")
    : '<span class="tag">Bodyweight</span>';

  clone.querySelector(".muscles").innerHTML = muscles;
  clone.querySelector(".equipment").innerHTML = equipment;

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
