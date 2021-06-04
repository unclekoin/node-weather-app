const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=3f797cf64bd47aee79bfdcaba83e6ea2&query=${ latitude },${ longitude }&units=m`;

  request({url, json: true}, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
      callback(body.error.info, undefined)
    } else {
      const data = body.current;
      const info = `${data.weather_descriptions[0]}. It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out.`
      const icon = data.weather_icons[0];
      callback(undefined, info, icon)
    }
  })
}

module.exports = forecast;
