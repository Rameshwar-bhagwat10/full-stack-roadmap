const API_KEY = "735a0a9ad6da0a518decbe56857303e2"; 

const searchBtn = document.getElementById("search-button");
const cityInput = document.getElementById("city-input");

const cityName = document.getElementById("city-name");
const weatherBox = document.getElementById("weather-box");
const errorMessage = document.getElementById("error-message");

const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weather-icon");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) return;
  fetchWeather(city);
});

async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${API_KEY}&units=metric`;

  try {
    console.log("Fetching weather for:", city);
    const res = await fetch(url);
    const data = await res.json();
    console.log("API Response:", data);
    
    if (data.cod === '404') {
      throw new Error("City not found");
    } else if (data.cod === '401') {
      throw new Error("Invalid API key. Please check your API key or wait if it's a new key (can take 2 hours to activate)");
    } else if (data.cod !== 200) {
      throw new Error(data.message || "API Error");
    }

    updateWeatherInfo(data);
  } catch (error) {
    console.error("Weather API Error:", error);
    weatherBox.classList.add("hidden");
    errorMessage.classList.remove("hidden");
    errorMessage.textContent = `❌ ${error.message}`;
  }
}

function updateWeatherInfo(data) {
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  temperature.textContent = Math.round(data.main.temp);
  humidity.textContent = data.main.humidity;
  windSpeed.textContent = data.wind.speed;
  description.textContent = data.weather[0].description;
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  weatherBox.classList.remove("hidden");
  errorMessage.classList.add("hidden");
}
