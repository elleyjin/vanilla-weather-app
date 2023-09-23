let apiKey = "d0138a4c7d1cd8871d6ba4c962225917";

function showCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  // let searchCity = document.querySelector("#")
  let currentLocation = document.querySelector("#location-text");
  currentLocation.innerHTML = searchInput.value;
}

let searchButton = document.querySelector("#search-btn");
searchButton.addEventListener("click", showCity);
