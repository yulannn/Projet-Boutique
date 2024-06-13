var swiper = new Swiper(".mySwiper", {});
const infos = document.querySelector("#infos");
const activities = document.querySelector("#activities");

function convertDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
}

infos.addEventListener("click", function () {
    swiper.slideTo(0);
});

activities.addEventListener("click", function () {
    swiper.slideTo(1);
});

swiper.on("slideChange", function () {
    console.log("slide changed");
    console.log(swiper.realIndex);
    if (swiper.realIndex == 0) {
        infos.style.color = "#5f3dc4";
        activities.style.color = "grey";
        infos.classList.add("underline");
        activities.classList.remove("underline");
    } else {
        infos.style.color = "grey";
        activities.style.color = "#5f3dc4";
        activities.classList.add("underline");
        infos.classList.remove("underline");
    }
});


document.addEventListener('DOMContentLoaded', () => {
    loadSession();
    getProfile();

    const logoutButton = document.getElementById('logout__button');
    const logoutPopup = document.getElementById('logoutPopup');
    const confirmLogoutButton = document.getElementById('confirmLogout');

    logoutButton.addEventListener('click', function (event) {
        event.preventDefault();
        togglePopup();
    });

    confirmLogoutButton.addEventListener('click', function () {
        document.cookie = "session_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/"
    });

});

function togglePopup() {
    const popup = document.getElementById('logoutPopup');
    popup.style.display = (popup.style.display === 'flex') ? 'none' : 'flex';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const dayString = String(day).padStart(2, '0');
    const monthString = String(month).padStart(2, '0');
    return `${dayString}/${monthString}/${year}`;
}

function getProfile() {
    fetch('http://localhost:3000/api/user', {
        credentials: 'include'
    })
        .then(response => response.json())
        .then(data => {
            const first__name = document.getElementById('first__name');
            const email = document.getElementById('email');
            const created__at = document.getElementById('created__at');

            first__name.textContent = data.first_name + " " + data.last_name;
            email.textContent = data.email;
            created__at.textContent = "Member since : " + formatDate(data.created_at);
        })
        .catch(error => console.error('Error fetching profile:', error));
}

function getActivities(id_account) {
    fetch('http://localhost:3000/api/order?id_account=' + id_account, {
        credentials: 'include',
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            const activities = document.querySelector(".activities__container")
            activities.innerHTML = "";

            document.getElementById('total__orders').textContent = data.length;

            if (data.length === 0) {
                activities.innerHTML = "<p class='no__activities'>You don't have orders yet</p>";
                return;
            }


            data.forEach(order => {
                const activity = document.createElement('div');
                activity.classList.add('activity');
                activity.innerHTML = `
                    <i class='bx bx-money-withdraw'></i>
                    <div class="activity__info">
                        <h2>Commande</h2>
                        <p class="order_id">Order ID : ${order.order_id}</p>
                        <p class="order_date">${convertDate(order.order_date)}</p>
                        <p class="order_price">Price : ${order.total_price} €</p>
                    </div>
                    `;
                activity.addEventListener('click', () => {
                    window.location.href = `/order/${order.order_id}`;
                });
                activities.appendChild(activity);
            });
        });
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
                if (data.first_name) {
                    loginButton.textContent = data.first_name;
                    loginButton.style.color = "#5f3dc4";
                    loginButton.href = "/profile";
                    loginBurgerButton.textContent = data.first_name;
                    loginBurgerButton.style.color = "#5f3dc4";
                    getActivities(data.id_account);
                } else {
                    loginButton.textContent = "Login";
                    loginButton.href = "/login";
                    loginBurgerButton.textContent = "Login";
                    loginBurgerButton.href = "/login";
                }
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération de la session:', error);
            window.location.href = "/login";
        });
}


