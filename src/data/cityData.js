const cityData = [
    {
        cityId: 1,
        cityName: "London",
        cityCode: "LON"
    },
    {
        cityId: 4,
        cityName: "Sydney",
        cityCode: "SYD"
    },
    {
        cityId: 5,
        cityName: "Paris",
        cityCode: "PAR"
    }
]; // Added missing semicolon

function getCityData() {
    return cityData;
}

module.exports = { getCityData };
