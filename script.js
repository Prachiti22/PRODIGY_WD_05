const apiKey = 'd605e1bf972938069f5059a93c30ca1f';

document.addEventListener('DOMContentLoaded', () => {
  const locationInput = document.getElementById('location');
  const getWeatherButton = document.getElementById('getWeatherButton');

  getWeatherButton.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location === '') {
      showError('Please enter a location.');
    } else {
      getWeather(location);
    }
  });
});

function getWeather(location) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      showError(error.message);
    });
}

function displayWeather(weatherData) {
  const weatherInfo = document.getElementById('weather-info');
  weatherInfo.innerHTML = '';

  const cityName = weatherData.name;
  const temperature = weatherData.main.temp;
  const description = weatherData.weather[0].description;
  const humidity = weatherData.main.humidity;
  const windSpeed = weatherData.wind.speed;

  const weatherDisplay = document.createElement('div');
  weatherDisplay.className = 'weather-display';
  weatherDisplay.innerHTML = `
    <h2>${cityName}</h2>
    <div class="weather-info-item">
      <h3>Temperature</h3>
      <p>${temperature}°C</p>
    </div>
    <div class="weather-info-item">
      <h3>Description</h3>
      <p>${description}</p>
    </div>
    <div class="weather-info-item">
      <h3>Humidity</h3>
      <p>${humidity}%</p>
    </div>
    <div class="weather-info-item">
      <h3>Wind Speed</h3>
      <p>${windSpeed} m/s</p>
    </div>
  `;

  weatherInfo.appendChild(weatherDisplay);
}

function showError(errorMessage) {
  const weatherInfo = document.getElementById('weather-info');
  weatherInfo.innerHTML = `<p class="error-message">${errorMessage}</p>`;
}
