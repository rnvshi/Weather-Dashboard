
// call elements from html

const searchBtn = document.getElementById("search-btn");
let cityInput = document.getElementById("city-input");
let searchHistory = document.querySelector(".previousSearch");
let currentWeather = document.getElementById("currentWeather");
let foreCast = document.getElementById("forecastFive");
let forecastHead = document.getElementById("forecastHead");

const APIKey = "20d07d0e39f75d73b8bf8586ae59bfc4";


// add event listener to submit button
searchBtn.addEventListener("click", () => {

    let geoURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityInput.value + "&appid=" + APIKey;

    cityInput.value = "";
    let lat = "";
    let lon = "";
    let geoData = "";
    let forecastData = "";

    fetch(geoURL)
        .then(response => {
            return response.json();
        })
        .then(data => {
            geoData = data;
            lat = geoData[0].lat;
            lon = geoData[0].lon;

            let searchQuery = document.createElement("h3");
            searchQuery.textContent = geoData[0].name;
            searchHistory.appendChild(searchQuery);
        })
        .then(() => {
            let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;

            fetch(forecastURL)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    forecastData = data;

                    let currentDate = document.createElement("h2");
                    currentDate.textContent = "Currently in " + forecastData.city.name + " " + (forecastData.list[0].dt_txt).split(" ")[0];
                    currentWeather.appendChild(currentDate);

                    let currentCard = document.createElement("section");
                    currentCard.classList.add("card");
                    let currentIcon = document.createElement("img");
                    currentIcon.src = "./assets/images/" + forecastData.list[0].weather[0].icon + ".png"
                    currentCard.appendChild(currentIcon);

                    let currentTemp = document.createElement("p");
                    currentTemp.textContent = "Temp: " + (forecastData.list[0].main.temp - 273.15).toFixed(2) + "°C";
                    currentCard.appendChild(currentTemp);

                    let currentWind = document.createElement("p");
                    currentWind.textContent = "Wind: " + (forecastData.list[0].wind.speed * 3.6).toFixed(2) + " km/h";
                    currentCard.appendChild(currentWind);

                    let currentHum = document.createElement("p");
                    currentHum.textContent = "Humidity: " + forecastData.list[0].main.humidity + "%";
                    currentCard.appendChild(currentHum);

                    currentWeather.appendChild(currentCard);

                    forecastHead.textContent = "5 Day Forecast";

                    for (i = 5; i < forecastData.list.length; i += 8) {

                        console.log(forecastData.list[i].weather[0].icon);

                        let forecastCard = document.createElement("section");
                        forecastCard.classList.add("card");
                        let forecastDate = document.createElement("h1");
                        forecastDate.textContent = (forecastData.list[i].dt_txt).split(" ")[0];
                        forecastCard.appendChild(forecastDate);

                        let forecastIcon = document.createElement("img");
                        forecastIcon.src = "./assets/images/" + forecastData.list[i].weather[0].icon + ".png"
                        forecastCard.appendChild(forecastIcon);

                        let forecastTemp = document.createElement("p");
                        forecastTemp.textContent = "Temp: " + (forecastData.list[i].main.temp - 273.15).toFixed(2) + "°C";
                        forecastCard.appendChild(forecastTemp);

                        let forecastWind = document.createElement("p");
                        forecastWind.textContent = "Wind: " + (forecastData.list[i].wind.speed * 3.6).toFixed(2) + " km/h";
                        forecastCard.appendChild(forecastWind);

                        let forecastHum = document.createElement("p");
                        forecastHum.textContent = "Humidity: " + forecastData.list[i].main.humidity + "%";
                        forecastCard.appendChild(forecastHum);

                        foreCast.appendChild(forecastCard);
                    }
                })

        });
});



