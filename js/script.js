const apikey = "00a0933bbf72dcf9479061a6d3fb0414";

const flagImg = document.getElementById("country")
const cityInput = document.getElementById("city-input");
const searchBtn = document.querySelector("#search");
const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.getElementById("description");
const weatherIconElement = document.getElementById("weather-icon");
const countryElement = document.querySelector("#country");
const umidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");
const weatherData = document.getElementById("weather-data");



// Funções
const showWeatherData = async (city) => {
    const data = await getWeatherData(city);
    cityElement.innerHTML = city
    tempElement.innerHTML = data.current.temp.toFixed(1)
    weatherIconElement.setAttribute("src",`http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png 
    `)
    const bandeira = await flag(city)
    flagImg.setAttribute("src",`https://flagsapi.com/${bandeira}/shiny/64.png`)
    descElement.innerHTML = data.current.weather[0].description
    windElement.innerHTML = data.current.wind_speed.toFixed(0)+" km/h"
    umidityElement.innerHTML = data.current.humidity
    weatherData.classList.remove("hide")
}

const flag = async (city) => {
    const apiWeatherURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apikey}`
    const res = await fetch(apiWeatherURL);
    const data = await res.json()
    const response = data[0].country
    return response
}

const name = async (city) =>{
    const apiWeatherURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apikey}`
    const res = await fetch(apiWeatherURL);
    const data = await res.json()
    const response = await showWeatherData(data[0].name)

}

const lon = async (city) =>{
    const apiWeatherURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apikey}`
    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    return data[0].lon
}

const lat = async(city) =>{
    const apiWeatherURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apikey}`
    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    return data[0].lat
}

const getWeatherData = async(city) =>{
    const latitude = await lat(city).then((valor) => {
        return valor})
    const longitude = await lon(city).then((valor) => {
        return valor})  
    const apiWeatherURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=metric&lang=pt_br&appid=${apikey}`  
    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    console.log(data.current.weather[0].icon);
    return data
}

// Eventos
searchBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    const city = cityInput.value;
    name(city)
})

cityInput.addEventListener("keyup", (e) => {
    if(e.code=="Enter"){
        e.preventDefault();
    const city = cityInput.value;
    name(city)
    }
})