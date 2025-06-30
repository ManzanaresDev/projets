// javascript/main.js

const myForm = document.querySelector(".myForm");
const myLocation = document.querySelector(".myLocation");
const weatherData = document.querySelector("#weatherData");

myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const url = `/weather?location=${encodeURIComponent(myLocation.value)}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const { location, country, temperature, feelslike, weather_description } =
        data;
      weatherData.innerHTML = `Le nom de la ville est ${location}. Le pays es ${country}. Il fait ${temperature}° mais le ressenti et de ${feelslike}° parce que le temps est ${weather_description}`;
    });
});
