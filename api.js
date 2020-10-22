class Weather{
    constructor()
    {
        this.apiKey="b452ddfa811bbae6aeb06cb170a56e7c";
    }

    async getCity(lat,lon,units)
    {
        const weatherFetch = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${this.apiKey}`);
        const weatherData = await weatherFetch.json();
        return{
            weatherData
        }
    }

    async getCityName(city,units)
    {
        const weatherCity = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${this.apiKey}`);
        const weatherCData = await weatherCity.json();
        return{
            weatherCData
        }
    }
}