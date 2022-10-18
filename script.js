const search_input = document.querySelector("#input-field");
const place = document.querySelector("#place");
const desc = document.querySelector("#description");
const deg = document.querySelector("#deg");
const feelslike = document.querySelector("#feels_like");
const hum = document.querySelector("#humidity");
const weathericon = document.querySelector("#icon");
const API_KEY = '0b5bb2ea8b4d2d77fff4465b68f945f4'

function datatrans() {
    localStorage.setItem("Location",search_input.value);
    return false;
}

function redirect(){
    location.href = "./weather-details.html"
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
    // localStorage.setItem('icon', icon);
    // localStorage.setItem('description', description);
    // localStorage.setItem('humidity',humidity);
    // localStorage.setItem('temp',temp);
    // localStorage.setItem('feels_like',feels_like);
    
    feelslike.innerHTML = feels_like + " &deg;c";
    place.innerHTML = localStorage.getItem("Location");
    deg.innerHTML = temp + " &deg;c";
    hum.innerHTML = humidity + "%";
    desc.innerHTML = description;
    weathericon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`
}

getWeatherData();