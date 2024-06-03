const panier = document.querySelector('.panier__popup');
const buttonPanier = document.querySelector('.panier__button');
const productContainer = document.querySelector('.panier__popup__products');

// Event listener to open and close the panier
buttonPanier.addEventListener('click', () => {
    if (panier.style.right === '0px') {
        closePanier();
    } else {
        openPanier();
    }
});

// Function to open the panier
function openPanier() {
    panier.style.right = '0';
    panier.style.transition = 'right 0.5s';
    setTimeout(() => {
        buttonPanier.style.color = 'black';
        buttonPanier.innerText = 'x';
    }, 200);
    displayPanierItems(); // Call function to display items when opening the panier
}

// Function to close the panier
function closePanier() {
    panier.style.right = '-45%';
    buttonPanier.style.color = 'white';
    buttonPanier.innerText = 'menu';
}

function displayPanierItems() {
    const panierItems = JSON.parse(localStorage.getItem('panier')) || [];
    productContainer.innerHTML = '';
    panierItems.forEach(item => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <p class="product__info">${item.name} - ${item.size} - ${item.price}€</p> 
            <img class="panier__img" src="/public/img/jersey-images/${item.url_path}" alt="${item.name}"/>
        `;
        productContainer.appendChild(productDiv);
    });
}

if (panier.style.right === '0px') {
    displayPanierItems();
}
