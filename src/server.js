const express = require('express');
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const cors = require('cors');
const {getCityData} = require("./data/cityData");
const weatherData = require("./data/weatherData");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
    res.sendFile((path.join(__dirname, "index.html")));
    // res.send("Sample Weather Server is running");
});

// Load swagger.yaml
const swaggerDocument = YAML.load("./swagger.yaml");

// Serve Swagger UI
app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get("/cities", (req, res) => {
    console.log("Fetching city data");
    res.send(getCityData());
})

app.get('/weather', (req, res) => {
    const cityCode = req.query.cityCode;
    if (!cityCode) {
        return res.status(400).json({ error: 'cityCode parameter is required' });
    }
    console.log(`Fetching weather for cityCode: ${cityCode}`);
    const cityWeather = weatherData(cityCode);
    if (!cityWeather) {
        return res.status(404).json({ error: 'City not found' });
    }
    res.json(cityWeather);
});



const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})

