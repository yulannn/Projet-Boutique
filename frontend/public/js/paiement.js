let idUser = null;

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


    const adresseInput = document.getElementById("address");
    const adresseList = document.getElementById("adresse-list");

    adresseInput.addEventListener("input", function() {
        const query = adresseInput.value;

        if (query.length > 2) {
            fetch(`https://api-adresse.data.gouv.fr/search/?q=${query}`)
                .then(response => response.json())
                .then(data => {
                    const addresses = data.features;
                    updateListItems(addresses);
                })
                .catch(error => console.error("Erreur lors de la récupération des adresses:", error));
        } else {
            clearListItems();
        }
    });

    function updateListItems(addresses) {
        clearListItems();
        addresses.forEach(address => {
            const listItem = document.createElement("li");
            listItem.className = "list-item";
            listItem.textContent = address.properties.label;
            listItem.addEventListener("click", function() {
                adresseInput.value = address.properties.label;
                clearListItems();
            });
            adresseList.appendChild(listItem);
        });
    }

    function clearListItems() {
        adresseList.innerHTML = "";
    }

});


function loadSession() {
    fetch('http://localhost:3000/api/user', {
        credentials: 'include'
    })
        .then(response => {
            if (response.status === 401) {
                window.location.href = "/login";
                return;
            }
            return response.json();
        })
        .then(data => {
            idUser = data.id_account;
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
    const isExpiration = /^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiration);

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

    /* Ajout de la commande */

    const address = document.getElementById('address').value;
    const amount = getTotalPrice();
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const paymentMethod = "Credit Card";
    const status = "Paid";

    const order = {
        id_account: idUser,
        address: address,
        amount: amount,
        date: date,
        payment_method: paymentMethod,
        status: status
    };

    let idOrder = null;
    const response = await fetch('http://localhost:3000/api/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    }).then(response => response.json())
        .then(data => {
            console.log(data);
            idOrder = data.order_id;
        });

    const sizeIds = {
        "XS": 1,
        "S": 2,
        "M": 3,
        "L": 4,
        "XL": 5,
        "XXL": 6
    };

    panierItems.forEach(item => {
        const orderItem = {
            id_jersey: item.id_jersey,
            id_order: idOrder,
            size: item.size,
            quantity: item.quantity
        };

        fetch('http://localhost:3000/api/stock', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_jersey: item.id_jersey,
                size: sizeIds[item.size],
                quantity: item.quantity
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            });

        fetch('http://localhost:3000/api/orderItem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderItem)
        }).then(response => response.json())
            .then(data => {
                console.log(data);
            });
    });

    /* Affichage de la confirmation */

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