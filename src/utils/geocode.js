const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYWJpb2R1bm1lIiwiYSI6ImNqdnBnemRqNDFlZjc0OWxldDBvMmw5b2wifQ.tZWf55B5dcIV6zmUpfP-WQ&limit=1`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Error fetching location. Please, try again.", null);
    } else if (response.body.features.length === 0) {
      callback(
        "Unable to find location supplied. Try again with another location.",
        null
      );
    } else {
      const { features } = response.body;
      const center = features[0].center;
      const latitude = center[0];
      const longitude = center[1];
      const location = features[0].place_name;
      callback(null, {
        latitude,
        longitude,
        location
      });
    }
  });
};

module.exports = geocode;
