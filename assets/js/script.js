let apiKey = "7d0c93b619373cc00de59a11bc67506b";
const searchCity = document.querySelector(".searchbar");
const searchBtn = document.querySelector(".searchBtn");
const lookupHistory = [];


searchBtn.addEventListener("click", (event) => {
    var currentCity = searchCity.value;
    let queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&appid=${apiKey}&units=imperial`
    fetch(queryUrl)
        .then(headers => headers.json())
        .then(weatherData => {

            console.log("weatherData", weatherData);

            let currentDate = new Date(weatherData.list[0].dt_txt).toLocaleDateString();
            let currentIcon = weatherData.list[0].weather[0].icon;
            
            
            
            document.querySelector("#current-city").innerHTML = currentCity;
            document.querySelector("#current-date").innerHTML = currentDate;
            document.querySelector("#current-icon").innerHTML = `<img src="https://openweathermap.org/img/w/${currentIcon}.png"/>`;
            
            
            let lat = weatherData.city.coord.lat
            let long = weatherData.city.coord.lon
            
            let futureUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly&appid=${apiKey}&units=imperial`;
            
            fetch(futureUrl)
            .then(headers => headers.json()).then(futureData => {
                console.log("futureData",futureData)
                
                let currentTemp = futureData.current.temp;
                let currentWind = futureData.current.wind_speed;
                let currentHumidity = futureData.current.humidity;
                let UV = futureData.current.uvi;

                document.querySelector("#current-temp").innerHTML = "Temperature: " + currentTemp;
                document.querySelector("#current-wind").innerHTML = "Wind: " +currentWind;
                document.querySelector("#current-humidity").innerHTML = "Humidity: " +currentHumidity;
                document.querySelector("#UV").innerHTML = "UVi: " +UV;
                
                let template = "";
                for (let i = 1; i < 6; i++) {
                    const weatherInfo = futureData.daily[i];

                    console.log("weatherInfo",weatherInfo);
                    template += `
                    <div class="card" style="width: 18rem;">
                        <img src="https://openweathermap.org/img/w/${weatherInfo.weather[0].icon}.png"/>
                        <div class="card-body">
                            <h5 class="card-date">${new Date(weatherInfo.dt).toLocaleDateString()}</h5>
                            <p class="card-temp">${weatherInfo.temp.day}</p>
                            <p class="card-wind">${weatherInfo.wind_speed}</p>
                            <p class="card-humidity">${weatherInfo.humidity}</p>
                            </div>
                    </div>
                    `;
                };

                document.querySelector(".future .row").innerHTML = template;

            });
        });

});

//why is it not grabbing the icon?

//bootstrap my css, add some color, spacing,borders



//https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=daily&appid=${apiKey}