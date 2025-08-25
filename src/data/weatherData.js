const cityData = require('./cityData');
const {getCityData} = require("./cityData");

function toFahrenheit(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

function getBaseWeather(citycityCode) {
  // Assign base weather by city for consistency
  switch (citycityCode) {
    case 'NYC':
      return { tempC: 22, wind: 12, windDir: 'NW' };
    case 'LON':
      return { tempC: 18, wind: 10, windDir: 'SW' };
    case 'PAR':
      return { tempC: 20, wind: 8, windDir: 'NE' };
    case 'BER':
      return { tempC: 17, wind: 14, windDir: 'E' };
    case 'SYD':
      return { tempC: 35, wind: 9, windDir: 'S' };
    default:
      return { tempC: 21, wind: 10, windDir: 'N' };
  }
}

function generateWeatherRecords(city, days = 30) {
  const base = getBaseWeather(city.cityCode);
  const today = new Date();
  const records = [];
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    // Add some variation for realism
    const tempC = base.tempC + Math.round(Math.sin(i / 5) * 3 + (Math.random() - 0.5) * 2);
    const windspeed = base.wind + Math.round(Math.cos(i / 7) * 2 + (Math.random() - 0.5) * 2);
    const windDirections = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const winddirection = windDirections[(windDirections.indexOf(base.windDir) + i) % windDirections.length];
    const confidence = Math.round(98 - (i * 28) / (days - 1)); // 98% to 70%

    // Generate hourly temperatures for the day
    const hourlyTemperatures = [];
    for (let h = 0; h < 24; h++) {
      // Simulate a daily temperature curve: cooler at night, warmer mid-day, bigger dip in evening and overnight
      const hourVariation = Math.sin((Math.PI * (h - 6)) / 12) * 4; // peak at 14:00
      const eveningDip = h >= 18 && h <= 23 ? -3 : 0; // bigger dip in the evening
      const overnightDip = h >= 0 && h <= 5 ? -4 : 0; // bigger dip overnight (midnight to 5am)
      const randomNoise = (Math.random() - 0.5) * 1.5;
      const hourTempC = Math.round(tempC + hourVariation + eveningDip + overnightDip + randomNoise);
      hourlyTemperatures.push({
        hour: h,
        celsius: hourTempC,
        fahrenheit: toFahrenheit(hourTempC),
      });
    }

    records.push({
      weatherRecordId: `${city.cityCode}-${i + 1}`,
      citycityCode: city.cityCode,
      date: date.toISOString().split('T')[0],
      temperature: {
        celsius: tempC,
        fahrenheit: toFahrenheit(tempC),
      },
      hourlyTemperatures, // <-- new field
      windspeed,
      winddirection,
      accuracyConfidence: confidence,
    });
  }
  return records;
}

// Ensure cityData is an array before mapping
// const cityArray = Array.isArray(cityData) ? cityData : Object.values(cityData);
const cityArray = getCityData();

console.log(cityData);

function weatherData(cityCode) {
    const city = getCityData().find(c => c.cityCode === cityCode);
    // console.log(city)

    // city = {cityCode: "LON"};
    if (!city) {
        return null; // City not found
    }

    return {
        city: city,
        records: generateWeatherRecords(city),
    }
}

module.exports = weatherData;
