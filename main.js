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
        const ErrorMessage = document.querySelector(".erro");
        const corpo = document.querySelector("body");
        const imagem = document.querySelector(".image");

        if (request.status === 400) {
            ErrorMessage.innerHTML = `Error: ${WeatherData?.error.message} ❌`;
            ErrorMessage.style.display = "block";
            document.querySelector(".hidden-container").classList.add("show");
            throw new Error(`${WeatherData.error?.message}`);
        } else if (request.status === 200) {
            ErrorMessage.innerHTML = "";
        }

        corpo.style.backgroundImage = `url(nation/${(WeatherData.location.country).split(" ").join("")}.jpg)`;

        temp.innerHTML = Number.parseInt(WeatherData.current.temp_c) + " °";
        cidade.innerHTML = WeatherData.location.name;

        humidity.innerHTML = WeatherData.current.humidity + " %";
        wind.innerHTML =
            Number.parseInt(WeatherData.current.wind_kph) + " km/h";

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
        console.log(error);
    }

    document.querySelector(".lds-ring").style.visibility = "hidden";
    document.querySelector(".hidden-container").style.visibility = "visible";
};

const form = document.querySelector("#texto");
const botão = document.querySelector(".button");
const InfoModal = document.querySelector(".hidden-container");

botão.addEventListener("click", Value);
form.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
        Value();
    }
});

function Value() {
    Weather(form.value);
    if (InfoModal.classList.contains("show")) {
        InfoModal.classList.remove("show");
    } else {
        form.classList.add("hidden");
    }
}
