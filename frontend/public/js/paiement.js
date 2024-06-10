const apiPaymentKey = "ee7a45eb-9a7e-4f86-80fa-89016d1d8447"

document.addEventListener('DOMContentLoaded', () => {
    loadSession();
    loadPanier();

    const paymentbutton = document.getElementById('paymentButton');
    paymentbutton.addEventListener('click', async () => {
        console.log(proceedPayment(apiPaymentKey));
    });

});


function loadSession() {
    fetch('http://localhost:3000/api/user', {
        credentials: 'include'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const loginButton = document.getElementById('login__button');
            const loginBurgerButton = document.getElementById('login__burger__button');
            if (data.first_name) {
                loginButton.textContent = data.first_name;
                loginButton.href = "/profile";
                loginBurgerButton.textContent = data.first_name;
                loginBurgerButton.href = "/profile";
            } else {
                loginButton.textContent = "Login";
                loginButton.href = "/login";
                loginBurgerButton.textContent = "Login";
                loginBurgerButton.href = "/login";
            }
        })
}

function getTotalPrice() {
    const panierItems = JSON.parse(localStorage.getItem('panier')) || [];
    let total = 0;
    panierItems.forEach(item => {
        const itemTotalPrice = (item.price * item.quantity).toFixed(2);
        total += parseFloat(itemTotalPrice);
    });
    return total.toFixed(2);
}

function loadPanier() {
    const amountPanier = document.getElementById('amount__panier');
    const pricePanier = getTotalPrice()
    amountPanier.textContent = "Amount : " + pricePanier + " €";
}

async function proceedPayment(token) {
    const errorElement = document.getElementById('error__message');
    errorElement.textContent = "";

    let cardNumber = document.getElementById('cardNumber').value;
    cardNumber = cardNumber.replace(/\s/g, '');

    const isNumeric = /^\d{16}$/.test(cardNumber);
    const isNumericCvc = /^\d{3}$/.test(cardNumber);
    const cardExpiration = document.getElementById('cardExpiration').value;
    const cardCvc = document.getElementById('cardCvc').value;
    const amount = getTotalPrice();

    if (cardNumber.length !== 16 || !isNumeric) {
        errorElement.textContent = "Card number must be 16 digits";
        return;
    }

    if (cardCvc.length !== 3 || !isNumericCvc) {
        errorElement.textContent = "CVC must be 3 digits";
        return;
    }

    const bodyData = {
        "card": {
            "number": "2525252525252525",
            "expiration_date": "12/28",
            "cvc": "123"
        },
        "payment_intent": {
            "price": 8.00
        }
    }

    console.log(bodyData)
    const result = await fetch('https://challenge-js.ynovaix.com/payment', {
        method: 'POST',
        headers: {
            Authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData),
    });

    console.log(result);

    if (!result.ok) {
        const error = await result.json();
        throw new Error(error.message);
        return;
    }
    return await result.json();
}