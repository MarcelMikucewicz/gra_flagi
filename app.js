const page = document.querySelector("body");
page.style.display = "flex";
page.style.flexDirection = "column";
page.style.alignItems = "center";
page.style.justifyContent = "center";
page.style.minHeight = "100vh";
page.style.margin = "0";
page.style.backgroundColor = "violet";
page.style.color = "blue";
page.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";

const title = document.createElement("h1");
title.textContent = "Zgdanij Stolice Państwa!";
title.style.color = "blue";
title.style.fontSize = "40px";
title.style.fontWeight = "500";
title.style.marginBottom = "15px";

const infoBox = document.createElement("div");
infoBox.style.width = "240px";
infoBox.style.height = "80sspx";
infoBox.style.border = "1px solid red";
infoBox.style.backgroundColor = "cadetblue";
infoBox.style.textAlign = "center";
infoBox.style.borderRadius = "10px";
infoBox.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.3)";
infoBox.style.marginTop = "20px";
infoBox.style.padding = "10px";

const scoreboard = document.createElement("div");
scoreboard.style.width = "280px";
scoreboard.style.height = "auto";
scoreboard.style.border = "1px solid red";
scoreboard.style.backgroundColor = "cadetblue";
scoreboard.style.borderRadius = "10px";
scoreboard.style.padding = "15px";
scoreboard.style.color = "white"
scoreboard.style.fontSize = "18px";
scoreboard.style.marginTop = "15px";
scoreboard.style.boxShadow = "0px 5px 12px rgba(0, 0, 0, 0.5)";

let correct = 0;
let incorrect = 0;

let scoreList = document.createElement("ul");
scoreList.textContent = "Wyniki";
scoreList.style.margin = "0";
scoreList.style.padding = "0";
scoreList.style.listStyleType = "none";
scoreList.style.textAlign = "center";

let correctCount = document.createElement("li");
correctCount.textContent = "Poprawne Odpowiedzi: " + correct;

let incorrectCount = document.createElement("li");
incorrectCount.textContent = "Niepoprawne Odpowiedzi: " + incorrect;

scoreboard.appendChild(scoreList);
scoreList.appendChild(correctCount);
scoreList.appendChild(incorrectCount);

const flagImage = document.createElement("img");
flagImage.style.width = "320px";
flagImage.style.height = "180px";
flagImage.style.marginTop = "15px";
flagImage.style.borderRadius = "10px";
flagImage.style.boxShadow = "0px 5px 15px rgba(0, 0, 0, 0.5)";

let countryName = document.createElement("h2");
countryName.style.color = "white";
countryName.style.fontSize = "22px";

let inputField = document.createElement("input");
inputField.setAttribute("type", "text");
inputField.setAttribute("id", "inputField");
inputField.style.width = "320px";
inputField.style.height = "35px";
inputField.style.margin = "12px 0";
inputField.style.borderRadius = "8px";
inputField.style.border = "1px solid red";
inputField.style.backgroundColor = "cadetblue";
inputField.style.color = "white";
inputField.style.padding = "10px";
inputField.style.fontSize = "16px";
inputField.style.outline = "none";


let submitButton = document.createElement("button");
submitButton.textContent = "Sprawdź";
submitButton.style.width = "320px";
submitButton.style.height = "45px";
submitButton.style.margin = "15px 0";
submitButton.style.borderRadius = "8px";
submitButton.style.border = "none";
submitButton.style.backgroundColor = "blue";
submitButton.style.color = "white";
submitButton.style.fontSize = "17px";
submitButton.style.cursor = "pointer";
submitButton.style.boxShadow = "0px 4px 12px rgba(233, 69, 96, 0.4)";
submitButton.style.transition = "background-color 0.3s, transform 0.2s";

let selectedCapital = "";

async function fetchCountries() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/region/europe");
        const countries = await response.json();
        return countries;
    } catch (error) {
        console.error("błąd w znalezieniu dancyh", error);
    }
}

async function selectRandomCountry() {
    const countries = await fetchCountries();
    if (!countries) return;

    let randomIndex = Math.floor(Math.random() * countries.length);
    selectedCapital = countries[randomIndex].capital ? countries[randomIndex].capital[0] : "";
    flagImage.setAttribute("src", countries[randomIndex].flags.png);

    countryName.textContent = countries[randomIndex].name.common;
    infoBox.innerHTML = "";
    infoBox.appendChild(countryName);
}

async function checkAnswer() {
    let userAnswer = document.getElementById("inputField").value.trim();
    if (userAnswer.toLowerCase() === selectedCapital.toLowerCase()) {
        correct++;
        correctCount.textContent = "Poprawne Odpowiedzi: " + correct;
    } else {
        incorrect++;
        incorrectCount.textContent = "Niepoprawne Odpowiedzi: " + incorrect;
    }
    inputField.value = "";

    if (incorrect === 5) {
        let gameOverMessage = document.createElement("h1");
        gameOverMessage.textContent = "Koniec Gry - wykorzystano limit błędów";
        gameOverMessage.style.color = "blue";
        gameOverMessage.style.fontSize = "24px";

        let resetButton = document.createElement("button");
        resetButton.textContent = "Spróbuj Ponownie";
        resetButton.style.width = "320px";
        resetButton.style.height = "45px";
        resetButton.style.margin = "10px 0";
        resetButton.style.borderRadius = "8px";
        resetButton.style.border = "none";
        resetButton.style.backgroundColor = "cadetblue";
        resetButton.style.color = "white";
        resetButton.style.fontSize = "17px";
        resetButton.style.cursor = "pointer";
        resetButton.onclick = () => window.location.reload();

        page.appendChild(gameOverMessage);
        page.appendChild(resetButton);
    } else {
        await selectRandomCountry();
    }
}

selectRandomCountry();

submitButton.addEventListener("click", checkAnswer);

page.appendChild(title);
page.appendChild(flagImage);
page.appendChild(infoBox);
page.appendChild(inputField);
page.appendChild(submitButton);
page.appendChild(scoreboard);
