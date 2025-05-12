const exerciseContainer = document.getElementById("exercise-list");
const workoutList = document.getElementById("workout-list");
const template = document.getElementById("exercise-template");
let workout = [];
let exercisesData = []; // stores fetched exercises data, 4 filtering

async function fetchExercises() {
  try {
    const response = await fetch(
      "https://wger.de/api/v2/exerciseinfo/?limit=100&language=2"
    );
    const data = await response.json();
    exercisesData = data.results; // stored fetched exercise data, same thing here, for filtering
    renderExercises(exercisesData);
    generateMuscleGroupButtons(exercisesData);
  } catch (error) {
    exerciseContainer.innerHTML = "<p>Error fetching data.</p>";
    console.error(error);
  }
}

// render exercises
function renderExercises(exercises) {
  exerciseContainer.innerHTML = ""; // clear prev exercises
  exercises.forEach((exercise) => {
    const clone = template.content.cloneNode(true);

    // try to find English translation (language code 2), fallback to first available translation
    const translation =
      exercise.translations?.find((t) => t.language === 2) ||
      exercise.translations?.[0];

    const name = translation?.name || "No name available";
    const description = translation?.description || "No description available";
    const category = exercise.category?.name || "No category";

    // render excrs data
    clone.querySelector(".exercise-title").textContent = name;
    clone.querySelector(".exercise-cat").textContent = `Category: ${category}`;
    clone.querySelector(".exercise-description").innerHTML = description;

    // show valid muscles or "no muscles listed"
    const muscles = exercise.muscles?.length
      ? exercise.muscles.map((m) => m.name).join(", ")
      : "No muscles listed";
    clone.querySelector(".muscles").textContent = `Muscles: ${muscles}`;

    // show bodyweight if no equipment
    const equipment = exercise.equipment?.length
      ? exercise.equipment.map((e) => e.name).join(", ")
      : "Bodyweight";
    clone.querySelector(".equipment").textContent = `Equipment: ${equipment}`;

    exerciseContainer.appendChild(clone);
  });
}

// gen muscle group filter buttons dynamically based on exercises
function generateMuscleGroupButtons(exercises) {
  const muscleGroups = new Set(); // store unique muscle groups
  exercises.forEach((exercise) => {
    exercise.muscles?.forEach((muscle) => {
      muscleGroups.add(muscle.name); // add each muscle to the set
    });
  });

  const filterContainer = document.getElementById("muscle-filter-buttons");
  filterContainer.innerHTML = ""; // clear existing buttons

  // create filter buttons for each muscle group
  muscleGroups.forEach((muscle) => {
    const button = document.createElement("button");
    button.textContent = muscle;
    button.onclick = () => filterByMuscle(muscle);
    filterContainer.appendChild(button);
  });

  // add clear button
  const clearButton = document.createElement("button");
  clearButton.textContent = "Clear Filter";
  clearButton.onclick = clearFilter;
  filterContainer.appendChild(clearButton);
}

// filter ex by muscle group
function filterByMuscle(muscle) {
  const filteredExercises = exercisesData.filter((exercise) =>
    exercise.muscles?.some((m) => m.name === muscle)
  );
  renderExercises(filteredExercises);
}

// cleat current filter + show all exercises again
function clearFilter() {
  renderExercises(exercisesData);
}

// add to workout
function addToWorkout(exercise) {
  if (!workout.find((e) => e.id === exercise.id)) {
    workout.push(exercise);
    updateWorkoutList();
  }
}

// remove from workout
function removeFromWorkout(id) {
  workout = workout.filter((e) => e.id !== id);
  updateWorkoutList();
}

// upd workout list
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

// create exercise 'card' for workout list
function createExerciseCard(ex, showAddButton) {
  const clone = template.content.cloneNode(true);

  // try to find eng transl (same as b4)
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

  // no repeated tags and no "undefined"
  const muscles = ex.muscles?.length
    ? ex.muscles.map((m) => `<span class="tag">${m.name}</span>`).join(", ")
    : '<span class="tag">No muscles listed</span>';

  // show bodyweight or list the equipment
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
