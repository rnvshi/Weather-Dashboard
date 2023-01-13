// CALL ELEMENTS FROM HTML

let main = document.querySelector("main");

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const searchHistory = document.querySelector(".previousSearch");
const currentWeather = document.getElementById("currentWeather");
const foreCast = document.getElementById("forecastFive");
const forecastHead = document.getElementById("forecastHead");

// CURRENT WEATHER ELEMENTS
const curCity = document.getElementById("curCity");
const curImg = document.getElementById("curIcon");
const curTemp = document.getElementById("curTemp");
const curWind = document.getElementById("curWind");
const curHum = document.getElementById("curHum");

// FORECAST WEATHER ELEMENTS
const card1 = document.getElementById("first");
const date1 = document.getElementById("date1");
const img1 = document.getElementById("icon1");
const temp1 = document.getElementById("temp1");
const wind1 = document.getElementById("wind1");
const hum1 = document.getElementById("hum1");

const card2 = document.getElementById("second");
const date2 = document.getElementById("date2");
const img2 = document.getElementById("icon2");
const temp2 = document.getElementById("temp2");
const wind2 = document.getElementById("wind2");
const hum2 = document.getElementById("hum2");

const card3 = document.getElementById("third");
const date3 = document.getElementById("date3");
const img3 = document.getElementById("icon3");
const temp3 = document.getElementById("temp3");
const wind3 = document.getElementById("wind3");
const hum3 = document.getElementById("hum3");

const card4 = document.getElementById("fourth");
const date4 = document.getElementById("date4");
const img4 = document.getElementById("icon4");
const temp4 = document.getElementById("temp4");
const wind4 = document.getElementById("wind4");
const hum4 = document.getElementById("hum4");

const card5 = document.getElementById("fifth");
const date5 = document.getElementById("date5");
const img5 = document.getElementById("icon5");
const temp5 = document.getElementById("temp5");
const wind5 = document.getElementById("wind5");
const hum5 = document.getElementById("hum5");

// API KEY
const APIKey = "20d07d0e39f75d73b8bf8586ae59bfc4";

// ADD EVENT LISTENER TO SEARCH BUTTON TO START FETCH
searchBtn.addEventListener("click", () => {

    // SHOW WEATHER CARDS AND GENERATE TEXT UPON RESPONSE RETRIEVAL
    main.style.display = "block";
    let geoURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityInput.value + "&appid=" + APIKey;

    cityInput.value = "";
    let lat = "";
    let lon = "";
    let geoData = "";
    let forecastData = "";
    forecastHead.textContent = "";

    fetch(geoURL)
        .then(response => {
            return response.json();
        })
        .then(data => {

            // RETRIEVES LAT & LON DATA FROM GEO FETCH ALLOWING A STRING ENTRY TO BE CONVERTED TO COORDINATES WHICH ARE THEN INPUT INTO WEATHER DATA RETRIEVAL
            geoData = data;
            lat = geoData[0].lat;
            lon = geoData[0].lon;
        })
        .then(() => {
            let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;

            fetch(forecastURL)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    forecastData = data;

                    // STORES CURRENT WEATHER CONDITIONS DATA IN LOCAL
                    let currentCond = {
                        date: (forecastData.list[0].dt_txt).split(" ")[0],
                        img: "./assets/images/" + forecastData.list[0].weather[0].icon + ".png",
                        temp: (forecastData.list[0].main.temp - 273.15).toFixed(2),
                        wind: (forecastData.list[0].wind.speed * 3.6).toFixed(2),
                        hum: forecastData.list[0].main.humidity
                    }

                    localStorage.setItem("currentCond", JSON.stringify(currentCond));
                    localStorage.setItem(geoData[0].name, JSON.stringify(currentCond));

                    let forecastFive = [];

                    // ITERATIVELY STORES FORECAST DATA FOR 5 DAYS (24H HOURS APART) IN LOCAL
                    for (i = 5; i < forecastData.list.length; i += 8) {

                        let forecast = {
                            date: (forecastData.list[i].dt_txt).split(" ")[0],
                            img: "./assets/images/" + forecastData.list[0].weather[0].icon + ".png",
                            temp: (forecastData.list[i].main.temp - 273.15).toFixed(2),
                            wind: (forecastData.list[i].wind.speed * 3.6).toFixed(2),
                            hum: forecastData.list[i].main.humidity
                        };

                        forecastFive.push(forecast)
                    }

                    localStorage.setItem(geoData[0].name + "Forecast", JSON.stringify(forecastFive));

                    // GENERATES TEXT CONTENT FOR WEATHER CARDS
                    curCity.textContent = "Currently in " + geoData[0].name + " " + currentCond.date;
                    curImg.src = currentCond.img;
                    curTemp.textContent = "Temp: " + currentCond.temp + "°C";
                    curWind.textContent = "Wind " + currentCond.wind + "km/h";
                    curHum.textContent = "Humidity: " + currentCond.hum + "%";

                    forecastHead.textContent = "5 Day Forecast";
                    date1.textContent = forecastFive[0].date;
                    img1.src = forecastFive[0].img;
                    temp1.textContent = "Temp: " + forecastFive[0].temp + "°C";
                    wind1.textContent = "Wind " + forecastFive[0].wind + "km/h";
                    hum1.textContent = "Humidity: " + forecastFive[0].hum + "%";

                    date2.textContent = forecastFive[1].date;
                    img2.src = forecastFive[1].img;
                    temp2.textContent = "Temp: " + forecastFive[1].temp + "°C";
                    wind2.textContent = "Wind " + forecastFive[1].wind + "km/h";
                    hum2.textContent = "Humidity: " + forecastFive[1].hum + "%";

                    date3.textContent = forecastFive[2].date;
                    img3.src = forecastFive[2].img;
                    temp3.textContent = "Temp: " + forecastFive[2].temp + "°C";
                    wind3.textContent = "Wind " + forecastFive[2].wind + "km/h";
                    hum3.textContent = "Humidity: " + forecastFive[2].hum + "%";

                    date4.textContent = forecastFive[3].date;
                    img4.src = forecastFive[3].img;
                    temp4.textContent = "Temp: " + forecastFive[3].temp + "°C";
                    wind4.textContent = "Wind " + forecastFive[3].wind + "km/h";
                    hum4.textContent = "Humidity: " + forecastFive[3].hum + "%";

                    date5.textContent = forecastFive[4].date;
                    img5.src = forecastFive[4].img;
                    temp5.textContent = "Temp: " + forecastFive[4].temp + "°C";
                    wind5.textContent = "Wind " + forecastFive[4].wind + "km/h";
                    hum5.textContent = "Humidity: " + forecastFive[4].hum + "%";

                    // CREATES AN ELEMENT THAT STORES PREVIOUS CITY SEARCHED AND CHANGES CARD TEXT TO CITY DATA IF CLICKED
                    let searchQuery = document.createElement("h3");
                    searchQuery.textContent = geoData[0].name;
                    searchQuery.classList.add("queryBtn");
                    searchQuery.addEventListener("click", () => {

                        curCity.textContent = "Currently in " + geoData[0].name + " " + JSON.parse(localStorage.getItem(geoData[0].name)).date;
                        curImg.src = JSON.parse(localStorage.getItem(geoData[0].name)).img;
                        curTemp.textContent = "Temp: " + JSON.parse(localStorage.getItem(geoData[0].name)).temp + "°C";
                        curWind.textContent = "Wind " + JSON.parse(localStorage.getItem(geoData[0].name)).wind + "km/h";
                        curHum.textContent = "Humidity: " + JSON.parse(localStorage.getItem(geoData[0].name)).hum + "%";

                        date1.textContent = JSON.parse(localStorage.getItem((geoData[0].name) + "Forecast"))[0].date;
                        img1.src = JSON.parse(localStorage.getItem((geoData[0].name) + "Forecast"))[0].img;
                        temp1.textContent = "Temp: " + JSON.parse(localStorage.getItem((geoData[0].name) + "Forecast"))[0].temp + "°C";
                        wind1.textContent = "Wind " + JSON.parse(localStorage.getItem((geoData[0].name) + "Forecast"))[0].wind + "km/h";
                        hum1.textContent = "Humidity: " + JSON.parse(localStorage.getItem((geoData[0].name) + "Forecast"))[0].hum + "%";

                        date2.textContent = JSON.parse(localStorage.getItem((geoData[0].name) + "Forecast"))[1].date;
                        img2.src = JSON.parse(localStorage.getItem((geoData[0].name) + "Forecast"))[1].img;
                        temp2.textContent = "Temp: " + JSON.parse(localStorage.getItem((geoData[0].name) + "Forecast"))[1].temp + "°C";
                        wind2.textContent = "Wind " + JSON.parse(localStorage.getItem((geoData[0].name) + "Forecast"))[1].wind + "km/h";
                        hum2.textContent = "Humidity: " + JSON.parse(localStorage.getItem((geoData[0].name) + "Forecast"))[1].hum + "%";

                        date3.textContent = JSON.parse(localStorage.getItem((geoData[0].name) + "Forecast"))[2].date;
                        img3.src = JSON.parse(localStorage.getItem((geoData[0].name) + "Forecast"))[2].img;
                        temp3.textContent = "Temp: " + JSON.parse(localStorage.getItem((geoData[0].name) + "Forecast"))[2].temp + "°C";
                        wind3.textContent = "Wind " + JSON.parse(localStorage.getItem((geoData[0].name) + "Forecast"))[2].wind + "km/h";
                        hum3.textContent = "Humidity: " + JSON.parse(localStorage.getItem((geoData[0].name) + "Forecast"))[2].hum + "%";

                        date4.textContent = JSON.parse(localStorage.getItem((geoData[0].name) + "Forecast"))[3].date;
                        img4.src = JSON.parse(localStorage.getItem((geoData[0].name) + "Forecast"))[3].img;
                        temp4.textContent = "Temp: " + JSON.parse(localStorage.getItem((geoData[0].name) + "Forecast"))[3].temp + "°C";
                        wind4.textContent = "Wind " + JSON.parse(localStorage.getItem((geoData[0].name) + "Forecast"))[3].wind + "km/h";
                        hum4.textContent = "Humidity: " + JSON.parse(localStorage.getItem((geoData[0].name) + "Forecast"))[3].hum + "%";

                        date5.textContent = JSON.parse(localStorage.getItem((geoData[0].name) + "Forecast"))[4].date;
                        img5.src = JSON.parse(localStorage.getItem((geoData[0].name) + "Forecast"))[4].img;
                        temp5.textContent = "Temp: " + JSON.parse(localStorage.getItem((geoData[0].name) + "Forecast"))[4].temp + "°C";
                        wind5.textContent = "Wind " + JSON.parse(localStorage.getItem((geoData[0].name) + "Forecast"))[4].wind + "km/h";
                        hum5.textContent = "Humidity: " + JSON.parse(localStorage.getItem((geoData[0].name) + "Forecast"))[4].hum + "%";

                    });

                    searchHistory.appendChild(searchQuery);
                });
        });
});
