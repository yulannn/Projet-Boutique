const panierItems = JSON.parse(localStorage.getItem('panier')) || [];

if (panierItems.length === 0) {
    window.location.href = "/shop";
}

document.addEventListener('DOMContentLoaded', () => {
    loadSession();
    loadPanier();

    const paymentbutton = document.getElementById('paymentButton');
    paymentbutton.addEventListener('click', async () => {
        await proceedPayment()
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

async function proceedPayment() {
    const paymentContainer = document.querySelector('.payment__container');

    const errorElement = document.getElementById('error__message');
    errorElement.textContent = "";

    let cardNumber = document.getElementById('cardNumber').value;
    cardNumber = cardNumber.replace(/\s/g, '');

    const cardCvc = document.getElementById('cardCvc').value;
    const cardExpiration = document.getElementById('cardExpiration').value;

    const firstName = document.getElementById('first__name').value;
    const lastName = document.getElementById('last__name').value;

    const nameRegex = /^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ' -]*$/;
    const isNumeric = /^\d{16}$/.test(cardNumber);
    const isNumericCvc = /^\d{3}$/.test(cardCvc);
    const isExpiration = /^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiration)

    const amount = getTotalPrice();

    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
        errorElement.textContent = "First name and last name must be valid";
        return;
    }

    if (cardNumber.length !== 16 || !isNumeric) {
        errorElement.textContent = "Card number must be 16 digits";
        return;
    }

    if (cardCvc.length !== 3 || !isNumericCvc) {
        errorElement.textContent = "CVC must be 3 digits";
        return;
    }

    if (!isExpiration) {
        errorElement.textContent = "Expiration date must be MM/YY";
        return;
    }

    paymentContainer.innerHTML = ``;

    const paymentSuccess = document.createElement('div');
    paymentSuccess.classList.add('payment__success');

    paymentSuccess.innerHTML = `
        <h1>Thank you ${firstName} for your purchase !</h1>
        <p>Check your <span id="profile__redirect">profile</span> to see more information</p>
        <a href="/shop">Back to shop</a>
    `;

    paymentContainer.appendChild(paymentSuccess);

    const profileRedirect = document.getElementById('profile__redirect');
    profileRedirect.addEventListener('click', () => {
        window.location.href = "/profile";
    });

    localStorage.removeItem('panier');
}