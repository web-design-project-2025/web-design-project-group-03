const exerciseContainer = document.getElementById("exercise-list");
const workoutList = document.getElementById("workout-list");
const template = document.getElementById("exercise-template");
let workout = [];
let exercisesData = []; // stores fetched exercises data, for filtering

// upd muscleGroupMapping with right muscles
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
    exercisesData = data.results; // stores fetched exercises data for filtering
    renderExercises(exercisesData);
    generateMuscleGroupButtons(exercisesData);
  } catch (error) {
    exerciseContainer.innerHTML = "<p>Error fetching data.</p>";
    console.error(error);
  }
}

function renderExercises(exercises) {
  exerciseContainer.innerHTML = ""; // clear prev
  exercises.forEach((exercise) => {
    const clone = template.content.cloneNode(true);

    // try to find eng transl (language code 2), fallback to first available translation
    const translation =
      exercise.translations?.find((t) => t.language === 2) ||
      exercise.translations?.[0];

    const name = translation?.name || "No name available";
    const description = translation?.description || "No description available";
    const category = exercise.category?.name || "No category";

    // render exerc
    clone.querySelector(".exercise-title").textContent = name;
    clone.querySelector(".exercise-cat").textContent = `Category: ${category}`;
    clone.querySelector(".exercise-description").innerHTML = description;

    // show valid muscles or no muscle listed
    const muscles = exercise.muscles?.length
      ? exercise.muscles.map((m) => m.name).join(", ")
      : "No muscles listed";
    clone.querySelector(".muscles").textContent = `Muscles: ${muscles}`;

    // show bw if no equipment
    const equipment = exercise.equipment?.length
      ? exercise.equipment.map((e) => e.name).join(", ")
      : "Bodyweight";
    clone.querySelector(".equipment").textContent = `Equipment: ${equipment}`;

    exerciseContainer.appendChild(clone);
  });
}

// gen muscle group filter buttons
function generateMuscleGroupButtons(exercises) {
  const muscleGroups = new Set();

  exercises.forEach((exercise) => {
    exercise.muscles?.forEach((muscle) => {
      // find correct muscle group by checking the muscleGroupMapping
      for (const group in muscleGroupMapping) {
        if (muscleGroupMapping[group].includes(muscle.name)) {
          muscleGroups.add(group); // add muscle group to the set
        }
      }
    });
  });

  const filterContainer = document.getElementById("muscle-filter-buttons");
  filterContainer.innerHTML = ""; // clear existing buttons

  // create filter buttons for each muscle group
  muscleGroups.forEach((group) => {
    const button = document.createElement("button");
    button.textContent = group;
    button.onclick = () => filterByMuscleGroup(group);
    filterContainer.appendChild(button);
  });

  // add clear filter
  const clearButton = document.createElement("button");
  clearButton.textContent = "Clear Filter";
  clearButton.onclick = clearFilter;
  filterContainer.appendChild(clearButton);
}

function filterByMuscleGroup(group) {
  const filteredExercises = exercisesData.filter((exercise) =>
    exercise.muscles?.some((m) => muscleGroupMapping[group]?.includes(m.name))
  );
  renderExercises(filteredExercises);
}

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

// create exercise card for the workout list
function createExerciseCard(ex, showAddButton) {
  const clone = template.content.cloneNode(true);

  // try to find eng
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

  // show bw or list equipment
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
