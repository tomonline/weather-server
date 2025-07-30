const express = require('express');
const {getCityData} = require("../data/cityData");
const weatherData = require("../data/weatherData");
const app = express();
const port = process.env.PORT || 3000;


app.get("/", (req, res) => {
    res.send("Sample Weather Server is running");
});

app.get("/cities", (req, res) => {
    res.send(getCityData());
})

app.get('/weather', (req, res) => {
    const cityCode = req.query.cityCode;
    if (!cityCode) {
        return res.status(400).json({ error: 'cityCode parameter is required' });
    }
    const cityWeather = weatherData(cityCode);
    if (!cityWeather) {
        return res.status(404).json({ error: 'City not found' });
    }
    res.json(cityWeather);
});



const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})

