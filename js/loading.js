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
