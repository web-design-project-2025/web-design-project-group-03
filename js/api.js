const exerciseContainer = document.getElementById("exercise-list");
const workoutList = document.getElementById("workout-list");
const template = document.getElementById("exercise-template");
let workout = [];
let exercisesData = [];

const muscleGroupMapping = {
  Legs: [
    "Biceps femoris",
    "Quadriceps femoris",
    "Gluteus maximus",
    "Hamstrings",
    "Soleus",
    "Gastrocnemius",
  ],
  Arms: ["Biceps brachii", "Anterior deltoid", "Triceps brachii", "Brachialis"],
  Back: ["Trapezius", "Latissimus dorsi", "Rhomboid", "Erector spinae"],
  Chest: ["Pectoralis major", "Serratus anterior"],
  Core: [
    "Rectus abdominis",
    "Obliquus externus abdominis",
    "Transverse abdominis",
  ],
};

async function fetchExercises() {
  try {
    const response = await fetch(
      "https://wger.de/api/v2/exerciseinfo/?limit=100&language=2"
    );
    const data = await response.json();
    exercisesData = data.results;
    renderExercises(exercisesData);
    generateMuscleGroupButtons(exercisesData);
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

function createExerciseCard(ex, showAddButton = true) {
  const clone = template.content.cloneNode(true);
  const translation =
    ex.translations?.find((t) => t.language === 2) || ex.translations?.[0];
  const name = translation?.name?.trim() || "No name available";
  const description =
    translation?.description?.trim() || "No description available";

  clone.querySelector(".exercise-title").textContent = name;
  clone.querySelector(".exercise-cat").textContent = ex.category?.name
    ? `Category: ${ex.category.name}`
    : "Category: N/A";
  clone.querySelector(".exercise-description").innerHTML = description;

  const muscles = ex.muscles?.length
    ? ex.muscles.map((m) => `<span class="tag">${m.name}</span>`).join(", ")
    : '<span class="tag">No muscles listed</span>';
  clone.querySelector(".muscles").innerHTML = muscles;

  const equipment = ex.equipment?.length
    ? ex.equipment.map((e) => `<span class="tag">${e.name}</span>`).join(", ")
    : '<span class="tag">Bodyweight</span>';
  clone.querySelector(".equipment").innerHTML = equipment;

  const button = clone.querySelector(".action-button");
  if (button) {
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
  }

  return clone;
}

function generateMuscleGroupButtons(exercises) {
  const muscleGroups = new Set();

  exercises.forEach((exercise) => {
    const primaryMuscle = exercise.muscles?.[0]?.name;
    for (const group in muscleGroupMapping) {
      if (muscleGroupMapping[group].includes(primaryMuscle)) {
        muscleGroups.add(group);
      }
    }
  });

  const filterContainer = document.getElementById("muscle-filter-buttons");
  filterContainer.innerHTML = "";

  muscleGroups.forEach((group) => {
    const button = document.createElement("button");
    button.textContent = group;
    button.onclick = () => filterByMuscleGroup(group);
    filterContainer.appendChild(button);
  });

  const clearButton = document.createElement("button");
  clearButton.textContent = "Clear Filter";
  clearButton.onclick = clearFilter;
  filterContainer.appendChild(clearButton);
}

function filterByMuscleGroup(group) {
  const filteredExercises = exercisesData.filter((exercise) => {
    const primaryMuscle = exercise.muscles?.[0]?.name;
    return muscleGroupMapping[group]?.includes(primaryMuscle);
  });
  renderExercises(filteredExercises);
}

function clearFilter() {
  renderExercises(exercisesData);
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

fetchExercises();

//used help from github copilot to create the above code
