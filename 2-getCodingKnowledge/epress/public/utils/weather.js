export const weather = (location, units = "m", callback) => {
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
        //         const message = `Le nom de la ville est ${location.name}.
        // Le pays est ${location.country}.
        // Il fait ${current.temperature}°C.
        // Le ressenti est ${current.feelslike}°C parce que le temps est ${current.weather_descriptions[0]}.`;
        callback(undefined, {
          location: location.name,
          country: location.country,
          temperature: current.temperature,
          feelslike: current.feelslike,
          weather_description: current.weather_descriptions[0],
        });
      }
    })
    .catch((err) => {
      callback("Erreur réseau ou serveur: " + err.message, undefined);
    });
};
