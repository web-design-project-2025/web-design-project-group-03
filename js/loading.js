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

// Check if the page contains the exercise-related elements
const exerciseNameElement = document.getElementById("exercise-name");

const exerciseDescriptionElement = document.getElementById(
  "exercise-description"
);
const exerciseBenefitsElement = document.getElementById("exercise-benefits");
const exerciseQuoteElement = document.getElementById("exercise-quote");

if (
  exerciseNameElement &&
  exerciseDescriptionElement &&
  exerciseBenefitsElement &&
  exerciseQuoteElement
) {
  if (exerciseId) {
    fetch("json/data.json")
      .then((response) => response.json())
      .then((data) => {
        const exercise = data[exerciseId]; // Use 'data' to avoid overwriting

        if (exercise) {
          exerciseNameElement.innerText = exercise.name;
          exerciseBenefitsElement.innerText = exercise.benefits.join(", "); // Corrected key name
          exerciseDescriptionElement.innerText =
            exercise.description || "No description available.";
          exerciseQuoteElement.innerText = exercise.quote || "";
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
const workoutBenefitsElement = document.getElementById("workout-benefits");
const warmupElement = document.getElementById("warm-up");
const ex1Element = document.getElementById("exercise1");
const ex2Element = document.getElementById("exercise2");
const ex3Element = document.getElementById("exercise3");
const ex4Element = document.getElementById("exercise4");
const ex5Element = document.getElementById("exercise5");
const ex6Element = document.getElementById("exercise6");

if (
  workoutNameElement &&
  workoutDescriptionElement &&
  workoutBenefitsElement &&
  warmupElement &&
  ex1Element &&
  ex2Element &&
  ex3Element &&
  ex4Element &&
  ex5Element &&
  ex6Element
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
            warmupElement.innerText = workout.warmup || "No warm-up available.";
            ex1Element.innerText =
              workout.exercise1 || "No exercise available.";
            ex2Element.innerText =
              workout.exercise2 || "No exercise available.";
            ex3Element.innerText =
              workout.exercise3 || "No exercise available.";
            ex4Element.innerText =
              workout.exercise4 || "No exercise available.";
            ex5Element.innerText =
              workout.exercise5 || "No exercise available.";
            ex6Element.innerText =
              workout.exercise6 || "No exercise available.";
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
