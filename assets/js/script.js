
let city = "London";

const APIKey = "20d07d0e39f75d73b8bf8586ae59bfc4";
let geoData = "";
let lat = "";
let lon = "";

let geoURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + APIKey;


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
        let forecastDate = "";
        let forecastTemp = "";
        let forecastHum = "";
        let forecastWind = "";
        let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;


        fetch(forecastURL)
            .then(response => {
                return response.json();
            })
            .then(data => {
                forecastData = data;

                console.log(forecastData.list[0].dt_txt);
                console.log(forecastData.list[0].main.temp - 273.15);
                console.log(forecastData.list[0].main.humidity);
                console.log(forecastData.list[0].wind.speed * 3.6);
                console.log(forecastData.list[0].weather[0].icon);

                for (i = 5; i < forecastData.list.length; i += 8) {

                    forecastDate = forecastData.list[i].dt_txt;
                    forecastTemp = forecastData.list[i].main.temp - 273.15;
                    forecastHum = forecastData.list[i].main.humidity;
                    forecastWind = forecastData.list[i].wind.speed * 3.6;

                    // fix wind speed units, round temperature to nearest 2 decimal places
                    console.log(forecastDate);
                    console.log(forecastTemp + "°C");
                    console.log(forecastHum + "%");
                    console.log(forecastWind + " km/h");
                    console.log(forecastData.list[i].weather[0].icon)
                }
            })

    });

