const postmanRequest = require('postman-request');

const geocode = (address, callback) => {
    const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaGVzb2thIiwiYSI6ImNrYWpuYTJ3bTBjYW0yeHBqbGNlcXRjdTcifQ.Yc8umT19tcXc-KNw4El10Q`;
    postmanRequest(url, {json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to geoCode service!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location, try another search!', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;