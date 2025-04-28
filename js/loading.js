/*function finishedLoadingHandler(event) {
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

function loadHandler() {
  fetch("https://wger.de/api/v2/exerciseinfo/")
    .then((response) => {
      response.json();
    })
    .then((response) => {
      const url = response.results[0].image;

      const imgElement = document.createElement("img");
      imgElement.src = url;

      const bodyElement = document.querySelector("body");
      bodyElement.appendChild(imgElement);
    });
}
window.addEventListener("load", loadHandler);
*/

function loadHandler() {
  fetch("https://wger.de/api/v2/exerciseinfo/")
    .then((response) => response.json()) // return the parsed JSON
    .then((data) => {
      // Find the image with id: 6
      const exercise = data.results.find((item) => item.id === 6);

      if (exercise && exercise.image) {
        console.log("Image URL for ID 6:", exercise.image);

        const imgElement = document.createElement("img");
        imgElement.src = exercise.image;

        document.body.appendChild(imgElement);
      } else {
        console.log("Exercise with ID 6 not found or has no image.");
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}

window.addEventListener("load", loadHandler);
