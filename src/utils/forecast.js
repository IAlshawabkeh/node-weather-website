const postmanRequest = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const weatherUrl = `http://api.weatherstack.com/current?access_key=63e08a16347e4c66141d7e8df6e916ee&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`;
    postmanRequest(weatherUrl, {json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined); 
        } else if (body.error) {
            callback(body.error.info, undefined);
        } else {
            const weatherDescription = body.current.weather_descriptions[0];
            const temperature = body.current.temperature;
            const feelsLike = body.current.feelslike;
            const is_day = body.current.is_day;
            callback(undefined, `${weatherDescription}. It is crrently ${temperature} degrees out. It feels like ${feelsLike} degrees out. And ${is_day} it is ${is_day ? '' : 'not'} day`);
        }
    });
}

module.exports = forecast