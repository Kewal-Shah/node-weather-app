const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const forecastUrl = "https://api.darksky.net/forecast/7efaee1d5bd2b91ad4578448613fbcb1/"+latitude+","+longitude+"?units=si";

    request({url: forecastUrl, json:true}, (error, {body}) => {  
        if(error){
            callback("Unable to access Forecase Service", undefined);
        } else if(body.error){
            callback("Unable to find location", undefined);
        } else{
            callback(undefined, "It is currently " + body.currently.temperature + " degrees out. There is " + body.currently.precipProbability+ "% chance of rain");
        }
    });
};

module.exports = forecast;