let apiKey = "7d0c93b619373cc00de59a11bc67506b";
const searchCity = document.querySelector(".searchbar");
const searchBtn = document.querySelector(".searchBtn");
const lookupHistory = [];


searchBtn.addEventListener("click", (event) => {
    var currentCity = searchCity.value;
    let queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&appid=${apiKey}`
    fetch(queryUrl)
        .then(headers => headers.json())
        .then(weatherData => {
            let currentDate = weatherData.list[0].dt_txt
            let currentIcon = weatherData.list[0].weather.icon
            
            let currentTemp = weatherData.list[0].main.temp
            let currentWind = weatherData.list[0].wind.speed
            let currentHumidity = weatherData.list[0].main.humidity
            let UV = weatherData.list[0].main.temp


            document.querySelector("#current-city").innerHTML = currentCity;
            document.querySelector("#current-date").innerHTML = currentDate;
            document.querySelector("#current-icon").innerHTML = currentIcon;

            document.querySelector("#current-temp").innerHTML = "Temperature: " + currentTemp;
            document.querySelector("#current-wind").innerHTML = "Wind: " +currentWind;
            document.querySelector("#current-humidity").innerHTML = "Humidity: " +currentHumidity;
            
        });

});