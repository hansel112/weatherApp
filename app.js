const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res) {
    const query = req.body.cityName;
    const apiKey = "3202c5d2bcc5d3dbebdbbf046ff48529";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+ unit;
    //const url = "https://api.openweathermap.org/data/2.5/weather?lat=0.347596&lon=32.582520&appid=3202c5d2bcc5d3dbebdbbf046ff48529&units=metric";
    
    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            // console.log(weatherData);
            const temperature = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const pressure = weatherData.main.pressure;
            const humidity = weatherData.main.humidity;
            const icon = weatherData.weather[0].icon;
            const imageUrl = " https://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<p>the weather is currently " + weatherDescription + ".</p>");
            res.write("<h1>The temperature in "+ query +" is " + temperature + "*C.</h1>");
            res.write("<h2>The pressure is " + pressure + "Pa. </h2>");
            res.write("<h2>The corresponding humidity is " + humidity + "gcm<sup>3</sup> </h2>");
            res.write("<img src="+ imageUrl + ">");
            res.send();
        }) 
    });
})


app.listen(3000, function () {
    console.log("server sucessfully running on port 3000!"); 
    
})


    