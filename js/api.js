fetch("https://wger.de/api/v2/exerciseinfo/?language=2")
  .then((response) => response.json())
  .then((data) => {
    displayData(data);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

function displayData(data) {
  const movementsContainer = document.querySelector(".movements"); // Target the parent container
  movementsContainer.innerHTML = ""; // Clear existing content

  // Convert data to an array if it's an object
  const workouts = Array.isArray(data) ? data : Object.values(data);

  // Loop through the data and create movement panels
  workouts.forEach((workout) => {
    const movementPanel = document.createElement("div");
    movementPanel.classList.add("movement-panel");

    const movementItem = document.createElement("p");
    movementItem.classList.add("movement-item");
    movementItem.textContent = workout.name; // Use the workout name

    movementPanel.appendChild(movementItem);
    movementsContainer.appendChild(movementPanel);
  });
}
