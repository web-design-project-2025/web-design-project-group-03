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
