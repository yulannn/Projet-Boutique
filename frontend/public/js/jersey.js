document.addEventListener('DOMContentLoaded', () => {
    loadSession();
    displayJersey();
    displayReviews();
    addToCart();
    addToRecommanded();
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
    displayImage();
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
    loadStock(3);
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

function displayReviews() {
    const jerseyId = window.location.pathname.split('/')[2];
    fetch('http://localhost:3000/api/reviews?id_jersey=' + jerseyId)
        .then(response => response.json())
        .then(data => {
            const reviewsDiv = document.querySelector(".reviews__container");

            console.log(data)
            if (data.message === "No reviews found") {
                const noReviewDiv = document.createElement("div");
                noReviewDiv.innerHTML = `
                    <h5 class="no__reviews"">No reviews yet</h5>      
                `;
                reviewsDiv.appendChild(noReviewDiv);
                return;
            }

            data.forEach(review => {
                const reviewDate = new Date(review.created_at);
                const starsText = "⭐".repeat(review.note);

                const reviewDiv = document.createElement("div");
                reviewDiv.className = "review";
                reviewDiv.innerHTML = `
                    <h5>${review.first_name} ${review.last_name[0]}. | ${starsText}</h5>
                    <p>${reviewDate.toLocaleDateString()}</p>
                    <p>${review.review_content}</p>       
                `;
                reviewsDiv.appendChild(reviewDiv);
            });


        });
}

function getSelectedSize() {
    const selectedSizeButton = document.querySelector('.size__button--selected');
    return selectedSizeButton ? selectedSizeButton.textContent : null;
}

function getBasketInfo() {
    const jerseyId = window.location.pathname.split('/')[2];
    const selectedSize = getSelectedSize();

    if (!selectedSize) {
        console.error('No size selected');
        return;
    }

    fetch('http://localhost:3000/api/basket?id_jersey=' + jerseyId)
        .then(response => response.json())
        .then(data => {
            data.size = selectedSize;
            data.id_jersey = jerseyId;

            let panier = JSON.parse(localStorage.getItem('panier')) || [];

            const existingProductIndex = panier.findIndex(item => item.id_jersey === data.id_jersey && item.size === data.size);

            if (existingProductIndex !== -1) {
                panier[existingProductIndex].quantity += 1;
            } else {
                data.quantity = 1;
                panier.push(data);
            }

            localStorage.setItem('panier', JSON.stringify(panier));
        })
        .catch(error => {
            console.error('Error fetching jersey data:', error);
        });
}


function addToCart() {
    const addToCartButton = document.getElementById('add__button');
    addToCartButton.addEventListener('click', () => {
        getBasketInfo();
    });
}


function addToRecommanded() {
    const recommandedContainer = document.querySelector('.recommanded__container');
    fetch('http://localhost:3000/api/randomJerseys?limit=5')
        .then(response => response.json())
        .then(data => {
            data.forEach(jersey => {
                const jerseyDiv = document.createElement('div');
                jerseyDiv.className = 'recommanded__product';
                jerseyDiv.innerHTML = `
                    <a href="/jersey/${jersey.id_jersey}">
                        <img class="recommanded__img" src="/public/img/jersey-images/${jersey.url_path}" alt="${jersey.name}">
                        <h5>${jersey.name}</h5>
                        <p>${jersey.price}€</p>
                    </a>
                `;
                recommandedContainer.appendChild(jerseyDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching random jerseys:', error);
        });



}
