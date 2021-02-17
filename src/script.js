let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "	Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];
let currentHour = now.getHours();
let currentMinute = now.getMinutes();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}
let currentTime = `${currentDay} ${currentHour}:${currentMinute}`;
let currentDate = document.querySelector(".current-date");
currentDate.innerHTML = `${currentTime}`;

function formatHours(timestrap) {
  let now = new Date(timestrap);
  let currentHour = now.getHours();
  let currentMinute = now.getMinutes();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }
  return `${currentHour}:${currentMinute}`;
}

function handleSubmit(event) {
  event.preventDefault();
  let h1 = document.querySelector("h1");
  let cityInput = document.querySelector("#city");
  h1.innerHTML = cityInput.value;
  searchCity(cityInput.value);
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", handleSubmit);

function retrieveTemperature(response) {
  let temp = document.querySelector(".degree");
  let descr = document.querySelector(".description");
  let hum = document.querySelector(".humidity");
  let wind = document.querySelector(".wind");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].main;
  let humidity = response.data.main.humidity;
  let windSpeed = Math.round(response.data.wind.speed);

  temp.innerHTML = celsiusTemperature;
  descr.innerHTML = description;
  hum.innerHTML = humidity;
  wind.innerHTML = windSpeed;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].main);
}
//response by API
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    let forecast = response.data.list[index];
    forecastElement.innerHTML += `
          <div class="col-2 text-center">
            <h5>${formatHours(forecast.dt * 1000)}</h5>
            <img
						class="w-100"
						src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
            />
            <div class="weather-forecast-temperature">
              <strong>${Math.round(
                forecast.main.temp_max
              )}° / </strong>${Math.round(forecast.main.temp_min)}°
            </div>
          </div>`;
  }
}

function searchCity(city) {
  let apiKey = "8db434350a59b780ed9dec3c5447cf53";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(retrieveTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function locationTemperature(response) {
  let temp = document.querySelector(".degree");
  let descr = document.querySelector(".description");
  let hum = document.querySelector(".humidity");
  let wind = document.querySelector(".wind");

  let temperature = Math.round(response.data.main.temp);
  let description = Math.round(response.data.weather[0].main);
  let windSpeed = Math.round(response.data.wind.speed);
  let humidity = response.data.main.humidity;

  temp.innerHTML = temperature;
  descr.innerHTML = description;
  wind.innerHTML = windSpeed;
  hum.innerHTML = humidity;
}

function getCurrentLocation(position) {
  let lat = Math.round(position.coords.latitude);
  let lon = Math.round(position.coords.longitude);
  let apiKey = "8db434350a59b780ed9dec3c5447cf53";
  let endPoint = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "metric";
  let apiUrl = `${endPoint}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(locationTemperature);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

let currentLocationButton = document.querySelector(".current-location");
currentLocationButton.addEventListener("click", getLocation);

let celsiusTemperature = null;

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  celsiusUnit.classList.remove("active");
  fahrenheitUnit.classList.add("active");
  let temperatureElement = document.querySelector(".degree");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusUnit.classList.add("active");
  fahrenheitUnit.classList.remove("active");
  let temperatureElement = document.querySelector(".degree");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitUnit = document.querySelector("#fahrenheit-unit");
fahrenheitUnit.addEventListener("click", displayFahrenheitTemperature);

let celsiusUnit = document.querySelector("#celsius-unit");
celsiusUnit.addEventListener("click", displayCelsiusTemperature);

searchCity("Istanbul");
