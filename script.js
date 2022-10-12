const search_input = document.querySelector("#input-field");
const place = document.querySelector("#place");
const description = document.querySelector("#description");
const deg = document.querySelector("#deg");
const feels_like = document.querySelector("#feels_like");
const humidity = document.querySelector("#humidity");
const icon = document.querySelector("#icon");
const API_KEY = '0b5bb2ea8b4d2d77fff4465b68f945f4'

function datatrans() {
    localStorage.setItem("Location",search_input.value);
    return false;
}

function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {
        let {latitude,longitude} = success.coords;

        console.log(success);

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localStorage.getItem("Location")}&units=metric&appid=0b5bb2ea8b4d2d77fff4465b68f945f4`).then(res => res.json()).then(data => {
            console.log(data);
            showWeatherData(data);
        });
    })
}

function showWeatherData(data) {
    let {humidity,temp,feels_like} = data.main;
    let {description, icon} = data.weather[0];
    console.log(description,icon);
    console.log(humidity,temp,feels_like);
    localStorage.setItem('icon', icon);
    localStorage.setItem('description', description);
    localStorage.setItem('humidity',humidity);
    localStorage.setItem('temp',temp);
    localStorage.setItem('feels_like',feels_like);
}

getWeatherData();

place.innerHTML = localStorage.getItem("Location");
deg.innerHTML = localStorage.getItem("temp") + " &deg;c";
feels_like.innerHTML = localStorage.getItem("feels_like") + " &deg;c";
humidity.innerHTML = localStorage.getItem("humidity") + "%";
description.innerHTML = localStorage.getItem("description");
icon.src = `http://openweathermap.org/img/wn/${localStorage.getItem("icon")}@2x.png`