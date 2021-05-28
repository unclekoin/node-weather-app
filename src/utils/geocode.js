const request = require('postman-request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${ encodeURIComponent(address) }.json?access_token=pk.eyJ1IjoicnVzOTU0IiwiYSI6ImNrb24wbHVxaDB1amIybnBlZjV1aGlyZWMifQ.-ZD5mW5g3CF7yjlxBIHIrQ&limit=1`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to location services!', undefined);
    } else if (!body.features.length) {
      callback('Unable to find location. Try another search.', undefined)
    } else {
      const [longitude, latitude] = body.features[0].center;
      const location = body.features[0].place_name;

      callback(undefined, { latitude, longitude, location })
    }
  })
}

module.exports = geocode;
