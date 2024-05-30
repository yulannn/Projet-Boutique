document.addEventListener('DOMContentLoaded', () => {
    loadSession();
    displayImage();
    displayJersey();
});

document.querySelectorAll(".size__button").forEach(button => {
    button.addEventListener("click", (event) => {
        document.querySelectorAll(".size__button").forEach(button => {
            button.classList.remove("size__button--selected");
        });
        event.target.classList.add("size__button--selected");
        const id = parseInt(event.target.id);
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
                        if (stock.stock === 0) {
                            stockDiv.textContent = "Out of stock";
                            stockDiv.style.color = "red";
                        } else {
                            stockDiv.textContent = "In stock : " + stock.stock;
                            stockDiv.style.color = "green";
                        }
                    }
                });
        })
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
            if (data.first_name) {
                loginButton.textContent = data.first_name;
                loginButton.href = "/profile";
            } else {
                loginButton.textContent = "Login";
                loginButton.href = "/login";
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