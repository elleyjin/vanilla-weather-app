let apiKey = "d0138a4c7d1cd8871d6ba4c962225917";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New%20York&units=metric&appid=${apiKey}`;

// function showCity(event) {
//   event.preventDefault();
//   let searchInput = document.querySelector("#search-input");
//   let currentLocation = document.querySelector("#location-text");
//   currentLocation.innerHTML = searchInput.value;
// }

// let searchButton = document.querySelector("#search-btn");
// searchButton.addEventListener("click", showCity);

function showWeather(response) {
  console.log(response.data);

  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = Math.floor(response.data.main.temp);

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
}

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

function showDate() {
  let currentDate = new Date();
  let day = currentDate.getDay();
  let month = months[currentDate.getMonth()];
  let year = currentDate.getFullYear();
  let hour = currentDate.getHours();
  let minutes = currentDate.getMinutes();

  let date = document.querySelector("#date");
  date.innerHTML = `${day} ${month} ${year} | ${hour}:${minutes}`;
}

axios.get(apiUrl).then(showWeather).then(showDate);
