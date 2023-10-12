let apiKey = "d0138a4c7d1cd8871d6ba4c962225917";

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

function showWeather(response) {
  console.log(response.data);

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

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDateTime(response.data.dt * 1000);
}

function formatDateTime(timestamp) {
  let currentDate = new Date(timestamp);
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

  // let newDate = new Date(timestamp);
  // let newDay = newDate.getDate();

  // Display proper time format and date suffix

  // Display current information
  // let dateElement = document.querySelector("#date");
  // dateElement.innerHTML = `${day} ${month} ${year} | ${hour}:${minutes} ${suffix}`;

  // Display weather for next 6 days
  // let currentDay = currentDate.getDay();
  // let nextDay;
  // if (currentDay === -1) {
  //   nextDay = 0;
  // } else {
  //   nextDay = currentDay + 1;
  // }
  // let dayName = days[nextDay].toLowerCase();
  // let weekDays = document.querySelectorAll(".days");
  // weekDays.forEach((dayElement) => {
  //   dayElement.innerHTML = "";
  //   for (let dayCounter = 0; dayCounter < days.length; dayCounter++) {
  //     let index = currentDay + dayCounter;
  //     if (index >= days.length) {
  //       index = index - days.length;
  //     }
  //     dayElement.innerHTML += days[index].toLowerCase();
  //   }
  return `${day} ${month} ${year} | last updated: ${hour}:${minutes} ${suffix}`;
}

function weeklyWeather() {
  let weeklyApiUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt=6&appid=${apiKey}`;

  // select the info to show for weekly

  axios.get(weeklyApiUrl).then(showWeather);
}

// Display days output
// let today = document.querySelector("#today");
// today.innerHTML = days[currentDay].toLowerCase();

// let tomorrow = document.querySelector("#tomorrow");
// tomorrow.innerHTML = dayName;
// console.log(nextDay);
// console.log(days[currentDay]);

// console.log(days[dayCounter]);

function searchApi(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New%20York&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather).then(formatDateTime);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchApi(searchInput.value);
}

let searchButton = document.querySelector("#search-btn");
searchButton.addEventListener("submit", handleSubmit);

// Display default city weather information
searchApi("new york");

// need to convert to lon/lat
