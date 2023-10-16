function showWeather(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name.toLowerCase();

  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.floor(response.data.main.temp);

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let minTempElement = document.querySelector("#low-temp");
  minTempElement.innerHTML = Math.floor(response.data.main.temp_min) + `°`;

  let maxTempElement = document.querySelector("#high-temp");
  maxTempElement.innerHTML = Math.floor(response.data.main.temp_max) + `°`;

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDateTime(response.data.dt * 1000);

  celsiusTemperature = response.data.main.temp;

  let iconElement = document.querySelector("#icon");
  let icon = response.data.weather[0].icon;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${icon}@2x.png`
  );

  iconElement.setAttribute("alt", response.data.weather[0].description);
  iconElement.setAttribute("src", switchIcon(response.data.weather[0].main));

  showForecast();
}

function switchIcon(description) {
  switch (description) {
    case "Clear":
      return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/097/811/original/sun.png?1695302792";
      break;
    case "Clouds":
      return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/100/114/original/few_cloud.png?1697107645";
      break;
    case "Thunderstorm":
      return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/100/112/original/thunder.png?1697107627";
      break;
    case "Rain":
    case "Drizzle":
      return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/100/111/original/rainy_%281%29.png?1697107612";
      break;
    case "Snow":
      return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/100/116/original/snow.png?1697108437";
      break;
    case "Mist":
    case "Dust":
    case "Haze":
    case "Fog":
      return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/100/234/original/misty.png?1697163791";
      break;
  }
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

  return `${day} ${month} ${year} | last updated: ${hour}:${minutes} ${suffix}`;
}

function searchApi(city) {
  let apiKey = "d0138a4c7d1cd8871d6ba4c962225917";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather).then(formatDateTime);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  searchApi(searchInputElement.value);
}

function showFarenheitTemp(event) {
  event.preventDefault();
  let calcFarenheit = document.querySelector("#farenheit-link");
  let temperatureElement = document.querySelector("#temperature");

  farenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");

  calcFarenheit = Math.floor((celsiusTemperature * 9) / 5 + 32);
  temperatureElement.innerHTML = calcFarenheit;
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let showCelsiusTemp = document.querySelector("#temperature");

  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");

  showCelsiusTemp.innerHTML = Math.floor(celsiusTemperature);
}

function showForecast() {
  let forecastElement = document.querySelector("#forecast");

  // variable to store forecast HTML
  let forecastHTML = `<div class="row row-cols-1 row-cols-md-6 g-4">`;

  // loop through and display each day & HTML block in forecast
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col">
      <div class="card text-center h-100">
      <div class="card-body">
      <h5 class="card-title" id="today">${day.toLowerCase()}</h5>
      <p class="card-text weather-icon">
      <img src="images/shower.png" alt="freepik-rainy" class="weather-icon">
      </p>
      <p class="card-text weekday">24° | 34°</p>
      </div>
          </div> 
          </div>
          `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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

let celsiusTemperature = null;

let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", handleSubmit);

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", showFarenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

// Display default city weather information
searchApi("new york");
