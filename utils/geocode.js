const request = require('request');

const geocode = (address, callback) => {
    const urlForMap = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGFya2Vya25pZ2h0IiwiYSI6ImNrbHV2ajNmZjBteTEycGxvYjIwZXh4Y2cifQ.zE8j6FSv49cQwVkTLHVY1Q`;
   
    request({url: urlForMap, json: true}, (error, response) => {
        if (error) {
           callback('unable to connect to location services', undefined);
        }
        else if(response.body.features[0] === undefined) {
            callback('unable to find location. try another search', undefined);
        }
        else {
            console.log(response.body.features);
           callback(undefined, {
               latitude: response.body.features[0].center[1],
               longitude: response.body.features[0].center[0],
               location: response.body.features[0].place_name
           });
        }
    });
}

module.exports = geocode;