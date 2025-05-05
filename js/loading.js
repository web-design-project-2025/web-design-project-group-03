/*
function finishedLoadingHandler(event) {
  const request = event.target;
  const response = request.response;
  console.log(response.role);
}

function loadData() {
  const request = new XMLHttpRequest();
  request.responseType = "json";

  const url = "json/data.json";
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

  if (!response || !response.results) return;

  // Filter by language: 2 (English)
  const englishExercises = response.results.filter((ex) => ex.language === 2);
  englishExercises.forEach((exercise) => {
    console.log(`Exercise: ${exercise.name}`);
  });

  // If there's a next page, fetch it
  if (response.next) {
    loadData(response.next);
  }
}

function loadData(url = "https://wger.de/api/v2/exerciseinfo/") {
  const request = new XMLHttpRequest();
  request.responseType = "json";
  request.open("GET", url);
  request.addEventListener("load", finishedLoadingHandler);
  request.send();
}

function loadHandler() {
  loadData();
}

window.addEventListener("load", loadHandler);
