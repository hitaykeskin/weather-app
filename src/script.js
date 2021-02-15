////////////////////////////////////////////////////////////////////////////////////////////////
//1) Tarihi yazıyoruz.
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

///////////////////////////////////////////////////////////////////////////////////////
//3)Call back function'ı yazıyoruz. event bir object'tir.event.preventDefault formun submit e-
//dilmesini önler.Formun submit edilmesini engelliyoruz. h1 'i ve input bilgisini seçiyoruz.
function handleSubmit(event) {
  event.preventDefault();
  let h1 = document.querySelector("h1");
  let cityInput = document.querySelector("#city");
  h1.innerHTML = cityInput.value;
  searchCity(cityInput.value);
}

//2) Form elementini seçiyoruz. Form'a submit eventListener'ını ekliyoruz.
let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", handleSubmit);

///////////////////////////////////////////////////////////////////////////////////////
//5)retreiveTemperature fonks oluşturuyoruz. response bir object'tir. Tek tek html element
//lerini seçiyoruz. Ardından object içindeki key-value pair'lerine eşitliyoruz
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
  let forecast = response.data.list[0];
  forecastElement.innerHTML = `<div class="row weather-forcast" id="forecast">
          <div class="col">
            <h3>12:00</h3>
            <img
              src=""http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png""
            />
            <div class="weather-forecast-temperature">
              <strong>${Math.round(forecast.main.temp_max)}°</strong>${Math.round(forecast.main.temp_min)}
            </div>
          </div>
					</div>`

//4) API call için searchCity fonksiyonunu oluşturduk. retrieveTemperature fonks ve retrieveForeccast oluşturacağız.
function searchCity(city) {
  let apiKey = "8db434350a59b780ed9dec3c5447cf53";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(retrieveTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}
///////////////////////////////////////////////////////////////////////////////////////

//9)response
function locationTemperature(response) {
  let temp = document.querySelector("#degree");
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
//8)API
function getCurrentLocation(position) {
  let lat = Math.round(position.coords.latitude);
  let lon = Math.round(position.coords.longitude);
  let apiKey = "8db434350a59b780ed9dec3c5447cf53";
  let endPoint = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "metric";
  let apiUrl = `${endPoint}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(locationTemperature);
}
//7)Lokasyon bilgisi allow deny penceresi için navigator.geolocation.getCurrentPosition
//kullanıyoruz
function getLocation() {
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}
//6) Button'u seçiyoruz. eventListener ekliyoruz. click ettiğinde getLocation fons. çalıştır!
let currentLocationButton = document.querySelector(".current-location");
currentLocationButton.addEventListener("click", getLocation);

///////////////////////////////////////////////////////////////////////////////////////

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
///////////////////////////////////////////////////////////////////////////////////////
