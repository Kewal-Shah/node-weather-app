const request = require("request");


const geocode = (address, callback) => {
    const geoCodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1Ijoia2V3YWwtc2hhaCIsImEiOiJjank2cWR6anIwOWc3M21vZTUyYThkaG5mIn0.QyyOMJ7fP7B8NGAC_dfBdA&limit=1";
    request({url: geoCodeUrl, json:true}, (error, {body}) => {
        if(error) {
            callback("Unable to access to Map Box Service", undefined);
        } else if(body.features.length === 0 ){
            callback("Unable to find details of the location", undefined);
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;