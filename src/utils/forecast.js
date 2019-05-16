const request = require("request");

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/e3b77234e206d514c3a18d2c1a97ab1f/${lat},${long}?units=si&lang=en`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to fetch weather", null);
    } else if (response.body.error) {
      callback(response.body.error, null);
    } else {
      const { currently, daily } = response.body;
      const summary = daily.data[0].summary;
      const temperature = currently.temperature;
      const precipProbability = currently.precipProbability;
      const reply = `${summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chace of rain`;
      callback(null, reply);
    }
  });
};

module.exports = forecast;
