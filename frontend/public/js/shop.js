let allProducts = [];
let allImages = [];
const articlePerPage = 6;
const urlParams = new URLSearchParams(window.location.search);
const page = parseInt(urlParams.get('page')) || 1;

document.addEventListener('DOMContentLoaded', () => {
    loadSession();
    displayProducts();
    displayImages();
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

function displayProducts() {
    fetch('http://localhost:3000/api/jerseys')
        .then(response => response.json())
        .then(data => {
            allProducts = data;
            updateProductDisplay(data, page);
            setupPagination(data.length, page);
        });
}

function setReduction(productId, productPrice, reductionId) {
    const productElement = document.getElementById('jersey__' + productId);
    fetch('http://localhost:3000/api/reductions?id_reduction=' + reductionId)
        .then(response => response.json())
        .then(data => {
            const reduction = data[0];
            const currentTime = new Date().toISOString();

            if (reduction.start_date <= currentTime && reduction.end_date >= currentTime) {

                const oldPrice = productElement.querySelector('p');
                oldPrice.style.textDecoration = 'line-through';

                const reducedPrice = (productPrice - (productPrice * reduction.pourcentage_reduction / 100)).toFixed(2);
                const reductionPrice = document.createElement('p');
                reductionPrice.textContent = reducedPrice + '€';
                reductionPrice.style.color = 'green';
                reductionPrice.classList.add('reduction__price');



                productElement.appendChild(reductionPrice);
            }
        });
}

function updateProductDisplay(products, page) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';

    const startIndex = (page - 1) * articlePerPage;
    const endIndex = startIndex + articlePerPage;
    const productsToDisplay = products.slice(startIndex, endIndex);

    productsToDisplay.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.id = 'jersey__' + product.id_jersey;

        productElement.innerHTML = `
               <h3>${product.name}</h3>
                <p class="product__price">${product.price} €</p>
            `;


        productElement.onclick = function () {
            window.location.href = `/jersey/${product.id_jersey}`;
        };

        const image = allImages.find(img => img.id_jersey === product.id_jersey);
        if (image) {
            const productImage = document.createElement('img');
            productImage.src = "public/img/jersey-images/" + image.url_path;
            productElement.appendChild(productImage);
        }

        productsContainer.appendChild(productElement);
        if (product.id_reduction !== null) {
            setReduction(product.id_jersey, product.price, product.id_reduction);
        }
    });
}

function displayImages() {
    fetch('http://localhost:3000/api/jersey_images')
        .then(response => response.json())
        .then(data => {
            allImages = data;
            data.forEach(function (image) {
                const productDiv = document.getElementById('jersey__' + image.id_jersey)
                const productImage = document.createElement('img')
                productImage.src = "public/img/jersey-images/" + image.url_path
                if (productDiv) {
                    productDiv.appendChild(productImage);
                }
            })
        })
}

function filterProducts(query) {
    const filteredProducts = allProducts.filter(product => {
        return product.name.toLowerCase().includes(query.toLowerCase());
    });
    updateProductDisplay(filteredProducts, 1);


    setupPagination(filteredProducts.length, 1, query);
}

document.getElementById('search__input').addEventListener('input', (event) => {
    const query = event.target.value;

    filterProducts(query);
});

function setupPagination(totalProducts, currentPage, query = '') {
    const totalPages = Math.ceil(totalProducts / articlePerPage);
    const pageNumbers = document.getElementById('page__number');


    const previousButton = document.getElementById('previous__page__button');
    const nextButton = document.getElementById('next__page__button');

    previousButton.style.display = 'None';
    nextButton.style.display = 'None';

    let onQuery = false;
    onQuery = query !== '';

    if (!onQuery) {
        pageNumbers.textContent = `${currentPage} / ${totalPages}`;
    } else {
        pageNumbers.textContent = '';
    }

    if (currentPage === 1) {
        previousButton.style.display = 'None';
    } else {
        if (!onQuery) {
            previousButton.style.display = 'inline-block';
            previousButton.onclick = function () {
                window.location.href = `?page=${currentPage - 1}`;
            };
        }
    }

    if (currentPage === totalPages) {
        nextButton.style.display = 'None';
    } else {
        if (!onQuery) {
            nextButton.style.display = 'inline-block';
            nextButton.onclick = function () {
                window.location.href = `?page=${currentPage + 1}`;
            };
        }
    }
}
