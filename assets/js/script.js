
// call elements from html

let cityInput = document.getElementById("city-input");
let searchBtn = document.getElementById("search-btn");
let currentWeather = document.getElementById("currentWeather");
let foreCast = document.getElementById("forecastFive");

const APIKey = "20d07d0e39f75d73b8bf8586ae59bfc4";
let geoData = "";
let lat = "";
let lon = "";

// add event listener to submit button
searchBtn.addEventListener("click", () => {
    console.log("search button has been clicked");
    console.log(cityInput.value);

    let geoURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityInput.value + "&appid=" + APIKey;

    fetch(geoURL)
        .then(response => {
            return response.json();
        })
        .then(data => {
            geoData = data;
            lat = geoData[0].lat;
            lon = geoData[0].lon;
        })
        .then(() => {
            let forecastData = "";
            let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;


            fetch(forecastURL)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    forecastData = data;

                    console.log(forecastData.list[0].weather[0].icon);

                    let currentDate = document.createElement("h1");
                    currentDate.textContent = forecastData.city.name + " " + (forecastData.list[0].dt_txt).split(" ")[0];
                    currentWeather.appendChild(currentDate);

                    let currentTemp = document.createElement("p");
                    currentTemp.textContent = (forecastData.list[0].main.temp - 273.15).toFixed(2) + "°C";
                    currentWeather.appendChild(currentTemp);

                    let currentWind = document.createElement("p");
                    currentWind.textContent = (forecastData.list[0].wind.speed * 3.6).toFixed(2) + " km/h";
                    currentWeather.appendChild(currentWind);

                    let currentHum = document.createElement("p");
                    currentHum.textContent = forecastData.list[0].main.humidity + "%";
                    currentWeather.appendChild(currentHum);

                    for (i = 5; i < forecastData.list.length; i += 8) {

                        console.log(forecastData.list[i].weather[0].icon);

                        let forecastDate = document.createElement("h1");
                        forecastDate.textContent = (forecastData.list[i].dt_txt).split(" ")[0];
                        foreCast.appendChild(forecastDate);

                        let forecastTemp = document.createElement("p");
                        forecastTemp.textContent = (forecastData.list[i].main.temp - 273.15).toFixed(2) + "°C";
                        foreCast.appendChild(forecastTemp);

                        let forecastWind = document.createElement("p");
                        forecastWind.textContent = (forecastData.list[i].wind.speed * 3.6).toFixed(2) + " km/h";
                        foreCast.appendChild(forecastWind);

                        let forecastHum = document.createElement("p");
                        forecastHum.textContent = forecastData.list[i].main.humidity + "%";
                        foreCast.appendChild(forecastHum);
                    }
                })

        });
});



