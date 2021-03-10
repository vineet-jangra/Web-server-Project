const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/e6af5b5feb891b272e18f5e2fc0370a6/${latitude},${longitude}`;
    request({url: url, json: true}, (error, response) => {
        if (error) {
           callback('unable to connect to weather services', undefined);
        }
        else if(response.body.error) {
            callback('unable to find location. try another search', undefined);
        }
        else {
           callback(undefined, `${response.body.daily.data[0].summary}. it is currently ${response.body.currently.temperature} degrees. The high today is ${response.body.daily.data[0].temperatureHigh} with a low of ${response.body.daily.data[0].temperatureLow}. There is a ${response.body.currently.precipProbability} % chance of rain`);
        }
    });

}
module.exports = forecast;