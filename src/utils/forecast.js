const req = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/6c60352a05ab068f62e8d245861489ec/${latitude},${longitude}?lang=bg&units=si`;

  req(
    {
      url,
      json: true
    },
    (error, { body }) => {
      if (error) {
        callback("Unable to connect to weather service", undefined);
      } else if (body.error) {
        callback("Unable to find location", undefined);
      } else {
        const summary = body.daily.data[0].summary;
        const tempHigh = body.daily.data[0].temperatureHigh;
        const precipProbability = body.currently.precipProbability;
        const temperature = body.currently.temperature;
        callback(undefined, {
          summary,
          temperature,
          precipProbability,
          tempHigh
        });
      }
    }
  );
};

module.exports = forecast;
