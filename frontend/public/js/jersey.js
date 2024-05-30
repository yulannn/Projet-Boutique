document.addEventListener('DOMContentLoaded', () => {
    loadSession();
    displayImage();
    displayJersey();
    loadStock(3);
});

document.querySelectorAll(".size__button").forEach(button => {
    button.addEventListener("click", (event) => {
        document.querySelectorAll(".size__button").forEach(button => {
            button.classList.remove("size__button--selected");
        });
        event.target.classList.add("size__button--selected");
        const id = parseInt(event.target.id);
        loadStock(id);
    });
});

function loadStock(id) {
    const jerseyId = window.location.pathname.split('/')[2];
    fetch('http://localhost:3000/api/stock?id_jersey=' + jerseyId, {
        credentials: 'include'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            data.forEach(stock => {
                if (stock.id_size === id) {
                    const stockDiv = document.querySelector(".product__stock");
                    const addButton = document.querySelector("#add__button");
                    if (stock.stock === 0) {
                        stockDiv.textContent = "Out of stock";
                        stockDiv.style.color = "red";
                        addButton.className = '';
                        addButton.classList.add("add__button-invalid");
                    } else {
                        stockDiv.textContent = "In stock : " + stock.stock;
                        stockDiv.style.color = "green";
                        addButton.className = '';
                        addButton.classList.add("add__button-valid");
                    }
                }
            });
        })
}

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

function displayJersey() {
    const jerseyId = window.location.pathname.split('/')[2];
    fetch(`http://localhost:3000/api/jersey?id_jersey=${jerseyId}`)
        .then(response => response.json())
        .then(data => {
            const jersey = data[0]
            const productInfosDiv = document.querySelector(".product__infos")
            productInfosDiv.innerHTML = `
                    <h3>${jersey.name}</h3>
                    <p>${jersey.description}</p>
                    <p>Matière : ${jersey.material}</p>
                    <p>Couleur : ${jersey.color}</p>
                `;
            const productPriceDiv = document.querySelector(".product__price")
            productPriceDiv.innerHTML = `
                    <p>${jersey.price}€</p>
                `;
            if (jersey.id_reduction) {
                setReduction(jersey.id_jersey, jersey.price, jersey.id_reduction);
            }
        });
}

function displayImage() {
    const jerseyId = window.location.pathname.split('/')[2];
    fetch('http://localhost:3000/api/jersey_images?id_jersey=' + jerseyId)
        .then(response => response.json())
        .then(data => {
            const firstImage = data[0]
            const productImageDiv = document.querySelector(".product__image")
            const productImage = document.createElement("img")
            productImage.src = "/public/img/jersey-images/" + firstImage.url_path
            productImageDiv.appendChild(productImage)
        })
}

function setReduction(productId, productPrice, reductionId) {
    const productPriceContainer = document.querySelector('.product__price');
    fetch('http://localhost:3000/api/reductions?id_reduction=' + reductionId)
        .then(response => response.json())
        .then(data => {
            const reduction = data[0];
            const currentTime = new Date().toISOString();

            if (reduction.start_date <= currentTime && reduction.end_date >= currentTime) {

                const oldPrice = productPriceContainer.querySelector('p');
                oldPrice.style.textDecoration = 'line-through';

                const reducedPrice = (productPrice - (productPrice * reduction.pourcentage_reduction / 100)).toFixed(2);

                const reductionPrice = document.createElement('p');
                reductionPrice.textContent = reducedPrice + '€';
                reductionPrice.style.color = 'green';

                productPriceContainer.appendChild(reductionPrice);
            }
        });
}