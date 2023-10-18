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

  iconElement.setAttribute("src", switchIcon(icon));
  iconElement.setAttribute("alt", response.data.weather[0].description);

  // calling the function with coordinate as parameter
  getForecastApi(response.data.coord);
}

function switchIcon(icon) {
  switch (icon) {
    case "01d":
      return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/097/811/original/sun.png?1695302792";
      break;
    case "01n":
      return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/101/029/original/night_%281%29.png?1697547173";
      break;
    case "02d":
    case "04d":
      return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/100/114/original/few_cloud.png?1697107645";
      break;
    case "03d":
      return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/100/113/original/clouds.png?1697107638";
      break;
    case "02n":
    case "04n":
    case "03n":
      return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/101/028/original/darkness.png?1697547158";
    case "09d":
    case "10d":
      return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/100/111/original/rainy_%281%29.png?1697107612";
      break;
    case "09n":
    case "10n":
      return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/101/031/original/nightrain_%281%29.png?1697547648";
      break;
    case "11d":
      return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/100/112/original/thunder.png?1697107627";
      break;
    case "11n":
      return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/101/030/original/thunder_%281%29.png?1697547183";
      break;
    case "13d":
    case "13n":
      return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/100/116/original/snow.png?1697108437";
      break;
    case "50d":
    case "50n":
      return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/100/234/original/misty.png?1697163791";
      break;
  }
}

function getForecastApi(coordinates) {
  console.log(coordinates);
  let apiKey = "46fac47dd8b8fa26d1b6852218ad3dfe";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  // variable to store forecast HTML
  let forecastHTML = `<div class="row row-cols-1 row-cols-md-6 g-4">`;

  // display daily array
  let forecast = response.data.daily;
  // loop through and display each day & HTML block in forecast
  forecast.forEach(function (day, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
          <div class="card text-center h-100">
            <div class="card-body">
              <h5 class="card-title" id="day">${formatDay(day.dt)}</h5>
              <p class="card-text weather-icon">
              <img 
                id="forecast-icon"
                src="${switchIcon(day.weather[0].icon)}@2x.png";
                alt="${day.weather[0].description}" 
                class="weather-icon" 
              >
              </p>
              <p class="card-text">
              ${Math.floor(day.temp.min)}° | <strong>${Math.floor(
          day.temp.max
        )}°</strong></p>
              </div>
          </div> 
        </div>
      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;

  console.log(forecast);
}

function formatDay(timestamp) {
  let forecastDay = new Date(timestamp * 1000);
  let days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  return days[forecastDay.getDay()];
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

let celsiusTemperature = null;

let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", handleSubmit);

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", showFarenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

// Display default city weather information
searchApi("new york");
