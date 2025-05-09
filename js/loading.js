/*
function finishedLoadingHandler(event) {
  const request = event.target;
  const response = request.response;
  console.log(response.role);
}

function loadData() {
  const request = new XMLHttpRequest();
  request.responseType = "json";

  const url = "https://wger.de/api/v2/exerciseinfo/";
  const method = "GET";
  request.open(method, url);
  request.addEventListener("load", finishedLoadingHandler);
  request.send();
}
function loadHandler() {
  loadData();
}
window.addEventListener("load", loadHandler);

// references
//https://chatgpt.com/share/6808d243-cee8-800b-9b6e-1f65af840893 for error explanation

*/
/*
function finishedLoadingHandler(event) {
  const request = event.target;
  const response = request.response;

  // Iterate through each exercise in the response
  response.results.forEach((exercise) => {
    const muscleNames = exercise.muscles.map((muscle) => muscle.name);
    console.log(`Exercise: ${exercise.name}`);
    console.log(`Primary muscles: ${muscleNames.join(", ")}`);
  });
}

function loadData() {
  const request = new XMLHttpRequest();
  request.responseType = "json";

  const url = "https://wger.de/api/v2/exerciseinfo/?limit=10"; // Optional: limit results
  const method = "GET";
  request.open(method, url);
  request.addEventListener("load", finishedLoadingHandler);
  request.send();
}

function loadHandler() {
  loadData();
}
window.addEventListener("load", loadHandler);
*/
/*

//json files
const exerciseId = new URLSearchParams(window.location.search).get("id");

fetch("json/data.json")
  .then((response) => response.json())
  .then((exercise) => {
    const exercise = exercise[exerciseId];

    if (product) {
      document.getElementById("exercise-name").innerText = exercise.name;
      document.getElementById("exercise-bennefits").innerText =
        exercise.bennefits;
      document.getElementById("exercise-description").innerText =
        exercise.description || "No description available.";
    }
  })
  .catch((error) => {
    console.error("Failed to load products:", error);
  });
  */
const exerciseId = new URLSearchParams(window.location.search).get("id");

// Get DOM elements
const exerciseNameElement = document.getElementById("exercise-name");
const exerciseDescriptionElement = document.getElementById(
  "exercise-description"
);
const exerciseBenefitsElement = document.getElementById("exercise-benefits");
const exerciseQuoteElement = document.getElementById("exercise-quote");

// Ensure all required elements exist
if (
  exerciseNameElement &&
  exerciseDescriptionElement &&
  exerciseBenefitsElement &&
  exerciseQuoteElement
) {
  if (exerciseId) {
    fetch("json/data.json") // Removed unnecessary "?" from URL
      .then((response) => response.json())
      .then((data) => {
        const exercise = data[exerciseId];

        if (exercise) {
          exerciseNameElement.innerText = exercise.name;
          exerciseDescriptionElement.innerText =
            exercise.description || "No description available.";
          exerciseQuoteElement.innerText = exercise.quote || "";

          // Render benefits as a list
          exerciseBenefitsElement.innerHTML = ""; // Clear existing content
          if (Array.isArray(exercise.benefits)) {
            exercise.benefits.forEach((benefit) => {
              const li = document.createElement("li");
              li.textContent = benefit;
              exerciseBenefitsElement.appendChild(li);
            });
          } else {
            exerciseBenefitsElement.innerText = "No benefits listed.";
          }

          // Optionally set the image
          const imageElement = document.getElementById("exercise-image");
          if (imageElement && exercise.image) {
            imageElement.src = exercise.image;
          }
        } else {
          console.error("Exercise not found for ID:", exerciseId);
        }
      })
      .catch((error) => {
        console.error("Failed to load exercise data:", error);
      });
  } else {
    exerciseNameElement.innerText = "No exercise selected.";
    exerciseDescriptionElement.innerText =
      "Please select an exercise from the courses page.";
  }
} else {
  console.log("This page does not contain exercise-related elements.");
}

//workout page
const workoutId = new URLSearchParams(window.location.search).get("id");

// Check if the page contains the workout-related elements
const workoutNameElement = document.getElementById("workout-name");
const workoutDescriptionElement = document.getElementById(
  "workout-description"
);
const workoutTimeElement = document.getElementById("workout-time");
const workoutBenefitsElement = document.getElementById("workout-benefits");
const warmupElement = document.getElementById("warm-up");
const warmup2Element = document.getElementById("warm-up2");
const ex1Element = document.getElementById("exercise1");
const ex1DescriptionElement = document.getElementById("exercise1-description");
const ex2Element = document.getElementById("exercise2");
const ex2DescriptionElement = document.getElementById("exercise2-description");
const ex3Element = document.getElementById("exercise3");
const ex3DescriptionElement = document.getElementById("exercise3-description");
const ex4Element = document.getElementById("exercise4");
const ex4DescriptionElement = document.getElementById("exercise4-description");
const ex5Element = document.getElementById("exercise5");
const ex5DescriptionElement = document.getElementById("exercise5-description");
const ex6Element = document.getElementById("exercise6");
const ex6DescriptionElement = document.getElementById("exercise6-description");

if (
  workoutNameElement &&
  workoutDescriptionElement &&
  workoutTimeElement &&
  workoutBenefitsElement &&
  warmupElement &&
  warmup2Element &&
  ex1Element &&
  ex1DescriptionElement &&
  ex2Element &&
  ex2DescriptionElement &&
  ex3Element &&
  ex3DescriptionElement &&
  ex4Element &&
  ex4DescriptionElement &&
  ex5Element &&
  ex5DescriptionElement &&
  ex6Element &&
  ex6DescriptionElement
)
  if (workoutNameElement) {
    if (workoutId) {
      fetch("json/workouts.json")
        .then((response) => response.json())
        .then((data) => {
          const workout = data[workoutId];

          if (workout) {
            workoutNameElement.innerText = workout.name;
            workoutDescriptionElement.innerText =
              workout.description || "No description available.";
            workoutBenefitsElement.innerText = Array.isArray(workout.benefits)
              ? workout.benefits.join(", ")
              : workout.benefits || "No benefits available.";
            workoutTimeElement.innerText = workout.time || "No time specified.";
            warmupElement.innerText = workout.warmup || "No warm-up available.";
            warmup2Element.innerText =
              workout.warmup2 || "No warm-up available.";
            ex1Element.innerText =
              workout.exercise1 || "No exercise available.";
            ex1DescriptionElement.innerText =
              workout.exercise1Description || "No description available.";
            ex2Element.innerText =
              workout.exercise2 || "No exercise available.";
            ex2DescriptionElement.innerText =
              workout.exercise2Description || "No description available.";
            ex3Element.innerText =
              workout.exercise3 || "No exercise available.";
            ex3DescriptionElement.innerText =
              workout.exercise3Description || "No description available.";
            ex4Element.innerText =
              workout.exercise4 || "No exercise available.";
            ex4DescriptionElement.innerText =
              workout.exercise4Description || "No description available.";
            ex5Element.innerText =
              workout.exercise5 || "No exercise available.";
            ex5DescriptionElement.innerText =
              workout.exercise5Description || "No description available.";
            ex6Element.innerText =
              workout.exercise6 || "No exercise available.";
            ex6DescriptionElement.innerText =
              workout.exercise6Description || "No description available.";
          } else {
            console.error("Workout not found for ID:", workoutId);
          }
        })
        .catch((error) => {
          console.error("Failed to load workout data:", error);
        });
    } else {
      workoutNameElement.innerText = "No workout selected.";
    }
  } else {
    console.error("Workout name element not found in the DOM.");
  }

//goal cubes
// Get the current exercise ID from the URL

// Get the strength goal cube link
const strengthGoalLink = document.getElementById("strength-goal");
const staminaGoalLink = document.getElementById("stamina-goal");
const enduranceGoalLink = document.getElementById("endurance-goal");

// Define the mapping of exercise IDs to workout IDs
const strengthGoalMapping = {
  1: "1", // If on exercise.html?id=1, go to workouts.html?id=2
  2: "4", // If on exercise.html?id=2, go to workouts.html?id=4
  3: "7", // If on exercise.html?id=3, go to workouts.html?id=7
};

const staminaGoalMapping = {
  1: "2", // If on exercise.html?id=1, go to workouts.html?id=2
  2: "5", // If on exercise.html?id=2, go to workouts.html?id=5
  3: "8", // If on exercise.html?id=3, go to workouts.html?id=8
};
const enduranceGoalMapping = {
  1: "3", // If on exercise.html?id=1, go to workouts.html?id=3
  2: "6", // If on exercise.html?id=2, go to workouts.html?id=6
  3: "9", // If on exercise.html?id=3, go to workouts.html?id=9
};

// Set the href dynamically based on the current exercise ID
if (strengthGoalLink && strengthGoalMapping[exerciseId]) {
  strengthGoalLink.href = `workouts.html?id=${strengthGoalMapping[exerciseId]}`;
}
if (staminaGoalLink && staminaGoalMapping[exerciseId]) {
  staminaGoalLink.href = `workouts.html?id=${staminaGoalMapping[exerciseId]}`;
}
if (enduranceGoalLink && enduranceGoalMapping[exerciseId]) {
  enduranceGoalLink.href = `workouts.html?id=${enduranceGoalMapping[exerciseId]}`;
}
