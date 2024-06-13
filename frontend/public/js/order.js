document.addEventListener('DOMContentLoaded', () => {
    loadSession();
    loadOrder();
});

function convertDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
}


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
            if (data) {
                const loginButton = document.getElementById('login__button');
                const loginBurgerButton = document.getElementById('login__burger__button');
                loginButton.textContent = data.first_name;
                loginButton.style.color = "#5f3dc4";
                loginButton.href = "/profile";
                loginBurgerButton.textContent = data.first_name;
                loginBurgerButton.style.color = "#5f3dc4";
                idUser = data.id_account;
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération de la session:', error);
            window.location.href = "/login";
        });
}


function loadOrder() {
    const idOrder = window.location.pathname.split('/')[2];
    fetch(`http://localhost:3000/api/order?order_id=${idOrder}`, {
        credentials: 'include'
    })
        .then(response => {
            if (response.status === 401) {
                document.querySelector(".order_title").textContent = "An error occurred while retrieving the order";
                return;
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                document.querySelector(".order_title").textContent = "No order found";
                return;
            }

            const order = data[0];


            const detailsContainer = document.querySelector(".order__details");

            detailsContainer.innerHTML = `
                    <p>Date : ${convertDate(order.order_date)}</p>
                    <p>Shipping address : ${order.shipping_address}</p>
                    <p>Status : ${order.status}</p>
                    <p>Total : ${order.total_price} €</p>
            `;

            document.querySelector(".order_title").textContent = "Order n°" + order.order_id;

            fetchItems(order.order_id);
        });
}

function fetchItems(order_id) {
    fetch(`http://localhost:3000/api/orderItem?order_id=${order_id}`, {
        credentials: 'include'
    })
        .then(response => {
            if (response.status === 401) {
                document.querySelector(".order__items").textContent = "An error occurred while retrieving the order items";
                return;
            }
            return response.json();
        })
        .then(data => {
            const itemsContainer = document.querySelector(".order__items");

            if (data.length === 0) {
                itemsContainer.textContent = "No items found in this order";
                return;
            }

            data.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('order__item');
                itemElement.innerHTML = `
                    <div class="order__item__image">
                        <img src="/public/img/jersey-images/${item.url_path}" alt="${item.name}">
                    </div>
                    <div class="order__item__content">
                        <h3>${item.name}</h3>
                        <p>Size : ${item.size}</p>
                        <p>${item.quantity} x ${item.price} €</p>
                    </div>
                `;
                itemsContainer.appendChild(itemElement);
            });
        });
    }