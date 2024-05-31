const optionMenu = document.querySelector(".dropdown");
const selectBtn = document.querySelector(".from");
const dd_Text = document.querySelector(".dd-text");
const options = optionMenu.querySelectorAll(".option");

options.forEach(option => {
    option.addEventListener("click", () => {
        let selectedOption = option.querySelector(".option-text").innerText;
        dd_Text.innerText = selectedOption;
        optionMenu.classList.remove("active");
        updateBuyAmount(prices);
    });
});

selectBtn.addEventListener("click", () => {
    optionMenu.classList.toggle("active");
});

document.addEventListener("click", (event) => {
    if (!optionMenu.contains(event.target) && event.target !== selectBtn) {
        optionMenu.classList.remove("active");
    }
});

const optionMenu2 = document.querySelector(".dropdown2");
const selectBtn2 = document.querySelector(".to");
const dd_Text2 = document.querySelector(".dd-text2");
const options2 = optionMenu2.querySelectorAll(".option2");

options2.forEach(option2 => {
    option2.addEventListener("click", () => {
        let selectedOption = option2.querySelector(".option-text").innerText;
        dd_Text2.innerText = selectedOption;
        optionMenu2.classList.remove("active");
        updateBuyAmount(prices);
    });
});

selectBtn2.addEventListener("click", () => {
    optionMenu2.classList.toggle("active");
});

document.addEventListener("click", (event) => {
    if (!optionMenu2.contains(event.target) && event.target !== selectBtn2) {
        optionMenu2.classList.remove("active");
    }
});

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const fromSelection = dd_Text.innerText;
    const sellAmount = document.querySelector(".sell-txt").value;
    const toSelection = dd_Text2.innerText;
    const buyAmount = document.querySelector(".buy-txt").value;

    if (buyAmount === "" || buyAmount === "Buy Amount") {
        alert("Please fill in all fields.");
        return;
    }

  
    console.log("From:", fromSelection);
    console.log("Sell Amount:", sellAmount);
    console.log("To:", toSelection);
    console.log("Buy Amount:", buyAmount);


    clearForm();


    updateBuyAmount(prices);
});


function clearForm() {
    dd_Text.innerText = "From";
    selectBtn.classList.remove("error");
    document.querySelector(".sell-txt").value = "";
    document.querySelector(".sell-txt").classList.remove("error");
    dd_Text2.innerText = "To";
    selectBtn2.classList.remove("error");
    document.querySelector(".buy-txt").value = "";
    document.querySelector(".buy-txt").classList.remove("error");
}


document.getElementById("buyAmount").value = "New Buy Amount";

function updateBuyAmount(prices) {
    const sellCurrency = dd_Text.innerText;
    const sellAmount = parseFloat(document.querySelector(".sell-txt").value);
    const buyCurrency = dd_Text2.innerText;

    console.log("Sell Currency:", sellCurrency);
    console.log("Sell Amount:", sellAmount);
    console.log("Buy Currency:", buyCurrency);

    const sellPrice = prices.find(item => item.currency === sellCurrency)?.price;
    const buyPrice = prices.find(item => item.currency === buyCurrency)?.price;

    console.log("Sell Price:", sellPrice);
    console.log("Buy Price:", buyPrice);

    if (sellPrice === undefined || buyPrice === undefined || isNaN(sellAmount)) {
        console.log("Unable to calculate buy amount. Missing or invalid data.");
        document.querySelector(".buy-txt").value = '';
        document.querySelector(".buy-txt").setAttribute('placeholder', 'Buy Amount');
        return;
    }

    const buyAmount = (sellAmount * sellPrice) / buyPrice;
    console.log("Buy Amount:", buyAmount);
    document.querySelector(".buy-txt").value = buyAmount.toFixed(6);
    document.querySelector(".buy-txt").setAttribute('placeholder', buyAmount.toFixed(6));
}





let prices;

fetch('https://interview.switcheo.com/prices.json')
    .then(response => response.json())
    .then(data => {
        prices = data; 
        updateBuyAmount(prices); 
        
        document.querySelector(".sell-txt").addEventListener("input", () => {
            updateBuyAmount(prices);
        });
        document.querySelector(".from").addEventListener("click", () => {
            updateBuyAmount(prices);
        });
        document.querySelector(".to").addEventListener("click", () => {
            updateBuyAmount(prices);
        });
        document.querySelector(".buy-txt").addEventListener("input", () => {
            updateBuyAmount(prices);
        });
    })
    .catch(error => console.error('Error fetching prices.json:', error));
