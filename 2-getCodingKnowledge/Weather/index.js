const weather = (location, units, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=b06dbfd373df4dc0751045ef7d64650a&query=${encodeURIComponent(
    location
  )}&units=${units}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.success === false) {
        callback(`Erreur ${data.error.code}: ${data.error.info}`, undefined);
      } else {
        const { current, location } = data;
        const message = `Le nom de la ville est ${location.name}.
Le pays est ${location.country}.
Il fait ${current.temperature}°C.
Le ressenti est ${current.feelslike}°C parce que le temps est ${current.weather_descriptions[0]}.`;
        callback(undefined, message);
      }
    })
    .catch((err) => {
      callback("Erreur réseau ou serveur: " + err.message, undefined);
    });
};

const cities = ["Paris", "Madrid", "Dunkerque", "Marseille", "Barcelone"];
cities.map((city) => {
  weather(city, "m", (err, data) => {
    console.log("Err: ", err);
    console.log("Data: ", data);
  });
});
