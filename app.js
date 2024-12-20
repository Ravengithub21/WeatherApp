const weatherInput = document.getElementById("weather-input");
const dataContainer = document.getElementById("generate-data");
const searchBtn = document.getElementById("search");
const apiKey = "7889ff25b0dbaa918b3723aaea579abd";
const weatherIcon = document.querySelector(".weather-icon");
const allCities = [];

async function getWeatherData(city) {
  try {
    let resp = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    let data = await resp.json();
    let weatherIcon = data.weather[0].icon;
    let wind = data.wind.speed;
    let temperature = data.main.temp;
    let humidity = data.main.humidity;
    allCities.push({
      city,
      weatherIcon,
      wind,
      temperature,
      humidity,
    });
    console.log(allCities);

    renderHtml(weatherIcon, wind, temperature, humidity);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

function renderHtml() {
  let html = "";
  for (let i = 0; i < allCities.length; i++) {
    html += `<img src="https://openweathermap.org/img/wn/${
      allCities[i].weatherIcon
    }@2x.png" alt="weathericon">
          <span>Wind: ${allCities[i].wind.toFixed(0)} km/h</span>
          <span>Temperature: ${allCities[i].temperature.toFixed(0)}°C</span>
          <span>Humidity: ${allCities[i].humidity}</span>`;
  }

  dataContainer.innerHTML = html;
}

searchBtn.addEventListener("click", function () {
  search();
});

function search() {
  let city = weatherInput.value;
  if (city !== "") {
    getWeatherData(city);
    weatherInput.value = "";
  }
}

weatherInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    search();
  }
});
