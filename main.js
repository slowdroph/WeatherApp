"use strict";

const Weather = async function (city) {
    try {
        const request = await fetch(
            `https:api.weatherapi.com/v1/current.json?key=0a9869fd42b14a2ba93235136232009&q=${city}&aqi=no`
        );
        const WeatherData = await request.json();

        const temp = document.querySelectorAll(".data span")[0];
        const cityElement = document.querySelectorAll(".data span")[1];
        const wind = document.querySelector(
            ".info-box[data-info='wind'] .font"
        );
        const humidity = document.querySelector(
            ".info-box[data-info='humidity'] .font"
        );
        const errorMessage = document.querySelector(".erro");
        const body = document.querySelector("body");
        const imagem = document.querySelector(".image");
        const infoContainer = document.querySelector(".local-info-container");

        if (request.status === 400) {
            errorMessage.innerHTML = `Error: ${WeatherData?.error.message} ❌`;
            errorMessage.style.display = "block";
            document.querySelector(".hidden-container").classList.add("show");
            infoContainer.classList.add("show");
            throw new Error(`${WeatherData.error?.message}`);
        } else if (request.status === 200) {
            errorMessage.innerHTML = "";
            infoContainer.classList.remove("show");
        }

        body.style.backgroundImage = `url(nation/${WeatherData.location.country
            .split(" ")
            .join("")}.jpg)`;

        infoContainer.innerHTML = `
            <ul class="info-list">
                <li><span class="highlights">City :</span> ${WeatherData.location.name}</li>
                <li><span class="highlights">Region :</span> ${WeatherData.location.region}</li>
                <li><span class="highlights">Country :</span> ${WeatherData.location.country}</li>
            </ul>
            <div>
                <p><span class="highlights">Local Time :</span> ${WeatherData.location.localtime}</p>
            </div> `;

        infoContainer.style.visibility = "visible";

        temp.innerHTML = Number.parseInt(WeatherData.current.temp_c) + " °";
        cityElement.innerHTML = WeatherData.location.name;

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
const button = document.querySelector(".button");
const infoModal = document.querySelector(".hidden-container");

button.addEventListener("click", getValue);
form.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
        getValue();
    }
});

function getValue() {
    Weather(form.value);
    if (infoModal.classList.contains("show")) {
        infoModal.classList.remove("show");
    } else {
        form.classList.add("hidden");
    }
}
