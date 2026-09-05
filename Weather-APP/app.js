const weatherForm = document.querySelector(".weather-form");
const cityInput = document.getElementById("cityInput");
const card = document.querySelector(".card");
const apiKey = "ab2538ac78710e15afbdd6125d71f954";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Please enter a city!");
  }
});
async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Could not fetch weather data");
  }
  return await response.json();
}

function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;
  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const discDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");
  cityDisplay.textContent = city;
  cityDisplay.classList.add("cityDisplay");

  tempDisplay.textContent = `${Math.floor(temp - 273)}C`;
  tempDisplay.classList.add("tempDisplay");

  humidityDisplay.textContent = `humidity: ${humidity}%`;
  humidityDisplay.classList.add("humidityDisplay");

  discDisplay.textContent = description;
  discDisplay.classList.add("discDisplay");

  weatherEmoji.textContent = getWeatherEmoji(id);
  weatherEmoji.classList.add("weatherEmoji");
card.append(cityDisplay, tempDisplay, humidityDisplay, discDisplay, weatherEmoji);
}

function getWeatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return "⛈️";
    case weatherId >= 300 && weatherId < 400:
      return "🌧️";
    case weatherId >= 500 && weatherId < 600:
      return "🌧️";
    case weatherId >= 600 && weatherId < 700:
      return "❄️";
    case weatherId >= 700 && weatherId < 800:
      return "🌫️";
    case weatherId === 800:
      return "☀️";
    case weatherId > 800 && weatherId < 810:
      return "☁️";
    default:
        return "❓";
  }
}

function displayError(msg) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = msg;
  errorDisplay.classList.add("errorDisplay");
  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}
