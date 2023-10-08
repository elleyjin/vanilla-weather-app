let apiKey = "d0138a4c7d1cd8871d6ba4c962225917";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New%20York&units=metric&appid=${apiKey}`;

function showCity(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-input");
  let currentLocation = document.querySelector("#city");
  currentLocation.innerHTML = searchInput.value;
}

let searchButton = document.querySelector("#search-btn");
searchButton.addEventListener("click", showCity);

function showWeather(response) {
  console.log(response.data);

  // shows default city (NY)
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name.toLowerCase();

  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = Math.floor(response.data.main.temp);

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  let minTemp = document.querySelector("#low-temp");
  minTemp.innerHTML = Math.floor(response.data.main.temp_min) + `°`;

  let maxTemp = document.querySelector("#high-temp");
  maxTemp.innerHTML = Math.floor(response.data.main.temp_max) + `°`;
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

let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

function showDateTime() {
  let currentDate = new Date();
  let day = currentDate.getDate();
  let month = months[currentDate.getMonth()];
  let year = currentDate.getFullYear();
  let hour = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let suffix = document.querySelector("#suffix");

  if (minutes < 10) {
    minutes = `0` + minutes;
  }

  if (day === 1 || day === 21 || day === 31) {
    day = day + `st`;
  } else if (day === 2 || day === 22) {
    day = day + `nd`;
  } else if (day === 3 || day === 23) {
    day = day + `rd`;
  } else {
    day = day + `th`;
  }

  if (hour === 12 || hour > 12) {
    if (hour > 12) {
      hour = hour - 12;
    }
    suffix = "pm";
  } else if (hour === 0) {
    hour = `0` + hour;
    suffix = "am";
  } else {
    suffix = "am";
  }

  let date = document.querySelector("#date");
  date.innerHTML = `${day} ${month} ${year} | ${hour}:${minutes} ${suffix}`;

  let currentDay = currentDate.getDay();
  let nextDay = currentDay + 1;
  let dayName = days[nextDay].toLowerCase();

  if (nextDay >= days.length) {
    nextDay = 0;
  }
  console.log(nextDay);

  let today = document.querySelector("#today");
  today.innerHTML = days[currentDay].toLowerCase();

  let tomorrow = document.querySelector("#tomorrow");
  tomorrow.innerHTML = dayName;
  console.log(nextDay);

  let thirdDay = document.querySelector("#third-day");
  thirdDay.innerHTML = dayName;

  let fourthDay = document.querySelector("#fourth-day");
  fourthDay.innerHTML = dayName;

  let fifthDay = document.querySelector("#fifth-day");
  fifthDay.innerHTML = dayName;

  let sixthDay = document.querySelector("#sixth-day");
  sixthDay.innerHTML = dayName;
}

axios.get(apiUrl).then(showWeather).then(showDateTime);
