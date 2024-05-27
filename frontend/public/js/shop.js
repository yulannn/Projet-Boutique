let allProducts = [];
let allImages = [];

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
            if (data.first_name) {
                loginButton.textContent = data.first_name;
                loginButton.href = "/profile";
            } else {
                loginButton.textContent = "Login";
                loginButton.href = "/login";
            }
        })
}

function displayProducts() {
    fetch('http://localhost:3000/api/jerseys')
        .then(response => response.json())
        .then(data => {
            allProducts = data; // Stocker les produits globalement
            updateProductDisplay(data);
        });
}

function updateProductDisplay(products) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = ''; // Clear previous products

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.id = 'jersey__' + product.id_jersey;
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.price} €</p>
        `;
        productElement.onclick = function () {
            window.location.href = `/jersey/${product.id_jersey}`;
        };

        // Find the image associated with this product
        const image = allImages.find(img => img.id_jersey === product.id_jersey);
        if (image) {
            const productImage = document.createElement('img');
            productImage.src = "public/img/jersey-images/" + image.url_path;
            productElement.appendChild(productImage);
        }

        productsContainer.appendChild(productElement);
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
                productDiv.appendChild(productImage);
            })
        })
}

function filterProducts(query) {
    const filteredProducts = allProducts.filter(product => {
        return product.name.toLowerCase().includes(query.toLowerCase());
    });
    updateProductDisplay(filteredProducts);
}

document.getElementById('search__input').addEventListener('input', (event) => {
    const query = event.target.value;
    filterProducts(query);
});
