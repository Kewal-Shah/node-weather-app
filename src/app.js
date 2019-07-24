const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");


// Define paths for Express and Handlebars config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const port = process.env.PORT || 3000;


// Setup path for views of Handlebars
app.set('views', viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

// setup for static files 
app.use(express.static(publicDirectory));



app.get("", (request, response) => {
    response.render("index", {
        title: "Weather",
        name: "Kewal Shah",
        headerText : "Header"
    });   
})

app.get("/help", (request, response)  => {
    response.render("help", {
        message: "We are here to help",
        name: "Kewal Shah",
        headerText : "Header"
    })
})

app.get("/about", (request, response)  => {
    response.render("about", {
        title: "About Me",
        name: "Kewal Shah",
        headerText : "Header"
    })
})


app.get("/weather", (request, response)  => {
    let address = request.query.address;
    if(!address) {
        return response.send({
            error: "Please provide an address"
        })
    }

    geocode(address, (error, {latitude, longitude,location } ={}) => {
        if(error){
            return response.send({
                error: error
            });
        } 
        forecast(latitude, longitude, (error, forecastData) =>{
            if(error){
                return response.send({
                    error: error
                });
            } 
            response.send({
                forecast : forecastData,
                location: location,
                address: address
            });
        });
    });
    
})


app.get("/help/*", (request,response) => {
    response.render("error", {
        message : "Help article not found",
        name: "Kewal Shah",
        headerText : "Header"
    })
})


app.get("*", (request, response) => {
    response.render("error", {
        message : "Page not found",
        name: "Kewal Shah",
        headerText : "Header"
    })
})


app.listen(port, () => {
    console.log("Server is up on port "+ port);
})