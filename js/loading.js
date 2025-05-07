/*
function finishedLoadingHandler(event) {
  const request = event.target;
  const response = request.response;
  console.log(response.role);
}

function loadData() {
  const request = new XMLHttpRequest();
  request.responseType = "json";

  const url = "https://wger.de/api/v2/exerciseinfo/.json";
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

// references
//https://chatgpt.com/share/6808d243-cee8-800b-9b6e-1f65af840893 for error explanation

function loadExercises(url = "https://wger.de/api/v2/exerciseinfo/") {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      const data = JSON.parse(xhr.responseText);

      // Filter for language ID 2 (English)
      const englishExercises = data.results.filter(
        (item) => item.language === 2
      );

      // Display them in the list
      const list = document.getElementById("exercise-list");
      englishExercises.forEach((ex) => {
        const li = document.createElement("li");
        li.textContent = ex.name;
        list.appendChild(li);
      });

      // If there's a next page, load it
      if (data.next) {
        loadExercises(data.next);
      }
    } else {
      console.error("Failed to fetch:", xhr.statusText);
    }
  };

  xhr.onerror = function () {
    console.error("Request error");
  };

  xhr.send();
}

window.onload = () => {
  loadExercises();
};
