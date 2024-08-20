let fromOptionBox = document.querySelector(".container .from-country-options");
let toOptionBox = document.querySelector(".container .to-country-options");
let fromInputBox = document.querySelector(".container .from-input");
let toInputBox = document.querySelector(".container .to-input");
let fromInputFlag = document.querySelector(".container .from-flag img");
let toInputFlag = document.querySelector(".container .to-flag img");
let fromInput = document.querySelector(".container .from-input input");
let toInput = document.querySelector(".container .to-input input");
let convertBtn = document.querySelector(".container .convert-btn");
let amount = document.querySelector(".container .amount input");
let resultBox = document.querySelector(".container .result-box");
let result = document.querySelector(".container .result");
let switchBtn = document.querySelector(".container .switch-btn");

let curFromValue, curToValue, curFromFlagSrc, curToFlagSrc;


let getSymbols = () => {
    let fromLi = "";
    let toLi = "";
    for (currency_code in country_list) {
        fromLi += `<li onclick="getFromValue('${currency_code}')"><img src="https://flagsapi.com/${country_list[currency_code]}/flat/64.png" alt="">${currency_code}</li>`;
        toLi += `<li onclick="getToValue('${currency_code}')"><img src="https://flagsapi.com/${country_list[currency_code]}/flat/64.png" alt="">${currency_code}</li>`;
    }
    fromOptionBox.innerHTML = fromLi;
    toOptionBox.innerHTML = toLi;
};


fromInputBox.addEventListener("click", () => {
    fromOptionBox.classList.toggle("active");
    toOptionBox.classList.remove("active");
});
toInputBox.addEventListener("click", () => {
    toOptionBox.classList.toggle("active");
    fromOptionBox.classList.remove("active");
});


function getFromValue(country) {
    fromInputFlag.src = `https://flagsapi.com/${country_list[country]}/flat/64.png`;
    fromInput.value = country;
    fromOptionBox.classList.remove("active");
};
function getToValue(country) {
    toInputFlag.src = `https://flagsapi.com/${country_list[country]}/flat/64.png`;
    toInput.value = country;
    toOptionBox.classList.remove("active");
};


function getExchangeRate() {
    result.innerHTML = "Getting Exchange Rate.....";
    result.style.fontSize = "15px";
    let apiKey = "8b544d65cb7cfff762e11912";
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromInput.value}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            let exchangeRate = data.conversion_rates[toInput.value];
            let totalExchangeRate = (amount.value * exchangeRate).toFixed(2);
            result.innerHTML = `${amount.value} ${fromInput.value} = ${totalExchangeRate} ${toInput.value}`;
            result.style.fontSize = "20px";

        });
    resultBox.style.display = "block";
};

switchBtn.addEventListener("click", () => {
    curFromValue = fromInput.value;
    curToValue = toInput.value;
    curFromFlagSrc = fromInputFlag.src;
    curToFlagSrc = toInputFlag.src;
    //exchanging values..........
    fromInput.value = curToValue;
    toInput.value = curFromValue;
    fromInputFlag.src = curToFlagSrc;
    toInputFlag.src = curFromFlagSrc;
    getExchangeRate();
});

convertBtn.addEventListener("click", () => {
    if (amount.value != "") {
        getExchangeRate();
    }
    else {
        alert("*enter amount !!");
    }
});

window.addEventListener("keypress", (e) => {
    if (e.code == "Enter" && amount.value != "") {
        getExchangeRate();
    }
});

getSymbols();