"use strict";

const Weather = async function (city) {
    try {
        const request = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=0a9869fd42b14a2ba93235136232009&q=${city}&aqi=no`
        );
        const WeatherData = await request.json();
        console.log(WeatherData);
        const temp = document.querySelectorAll(".data span")[0];
        const cidade = document.querySelectorAll(".data span")[1];
        const wind = document.querySelectorAll(".font")[2];
        const humidity = document.querySelectorAll(".font")[0];

        temp.innerHTML = Number.parseInt(WeatherData.current.temp_c) + " °";
        cidade.innerHTML = WeatherData.location.name;

        humidity.innerHTML = WeatherData.current.humidity + " %";
        wind.innerHTML =
            Number.parseInt(WeatherData.current.wind_kph) + " km/h";

        const imagem = document.querySelector(".image");

        if (WeatherData.current.condition.text === "Clear") {
            imagem.src = "imagens/night.png";
        } else if (WeatherData.current.condition.text === "Sunny") {
            imagem.src = "imagens/sun.png";
        } else if (WeatherData.current.condition.code === 1003) {
            imagem.src = "imagens/cloudly.png";
        } else if (WeatherData.current.condition.code === 1006 || 1009) {
            imagem.src = "imagens/overcast.png";
        }
    } catch (error) {
        console.error(error);
    } 
};

const form = document.querySelector("#texto");
const botão = document.querySelector(".button");
const InfoModal = document.querySelector(".hidden-container");

botão.addEventListener("click", function () {
    if (form.value === "") {
        InfoModal.style.display = 'none'
    } else {
        InfoModal.style.display = 'flex'
    }
    Weather(form.value);
    if (InfoModal.classList.contains("show")) {
        InfoModal.classList.remove("show");
    } else {
        form.classList.add("hidden");
    }
});
