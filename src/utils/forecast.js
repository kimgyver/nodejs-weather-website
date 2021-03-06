const request = require('request');

const forecast = ({ latitude, longitude }, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=8bb69bcd0902450f143630db7cf6e42e&query=' +
    latitude +
    ',' +
    longitude +
    '&units=m';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location!', undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ' / It is currently ' +
          body.current.temperature +
          ' deegree out. It feels like ' +
          body.current.feelslike +
          ' degree out. Humidity is ' +
          body.current.humidity +
          '%.' +
          "<p><img src='" +
          body.current.weather_icons[0] +
          "'></p>"
      );
    }
  });
};

module.exports = forecast;
