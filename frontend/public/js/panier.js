const panier = document.querySelector('.panier__popup');
const buttonPanier = document.getElementById('panier__button');
const productContainer = document.querySelector('.panier__popup__products');
const croix = document.querySelector('.invert__color');
const totalElement = document.getElementById('panier__popup__total');
const paymentDirection = document.getElementById('redirect__payment')

paymentDirection.addEventListener('click', () => {
    const panierItems = JSON.parse(localStorage.getItem('panier')) || [];
    if (panierItems.length === 0) {
        return;
    }
    window.location.href = '/paiement';
});

buttonPanier.addEventListener('click', () => {
    console.log("cliqué")
    if (panier.style.right === '0px') {
        closePanier();
    } else {
        openPanier();
    }
});

croix.addEventListener('click', () => {
    closePanier();
});

function openPanier() {
    panier.style.right = '0';
    panier.style.transition = 'right 0.5s';
    setTimeout(() => {
        buttonPanier.style.color = 'black';
        buttonPanier.innerText = 'x';
    }, 200);

    displayPanierItems();
}


function closePanier() {
    panier.style.right = '-45%';
    buttonPanier.style.color = 'white';
    buttonPanier.innerText = 'menu';
}

function displayPanierItems() {
    const panierItems = JSON.parse(localStorage.getItem('panier')) || [];
    productContainer.innerHTML = '';

    if (panierItems.length === 0) {
        paymentDirection.classList.remove('valid__payment')
        paymentDirection.classList.add('invalid__payment')
    } else {
        paymentDirection.classList.remove('invalid__payment')
        paymentDirection.classList.add('valid__payment')
    }

    let total = 0;

    panierItems.forEach(item => {
        const productDiv = document.createElement('div');
        productDiv.className = 'panier__product';
        const itemTotalPrice = (item.price * item.quantity).toFixed(2);
        total += parseFloat(itemTotalPrice);

        productDiv.innerHTML = `
            <img class="panier__img" src="/public/img/jersey-images/${item.url_path}" alt="${item.name}"/>
            <div class="product__details">
                <p class="product__name">${item.name}</p> 
                <p class="product__size">${item.size}</p>
            </div>
            <p class="product__price__info" data-initial-price="${item.price}">${itemTotalPrice}€</p>
            <div class="product__quantity">
                <button class="quantity__minus">-</button>
                <span class="quantity__number">${item.quantity}</span>
                <button class="quantity__plus">+</button>
            </div>
        `;
        productContainer.appendChild(productDiv);

        const minusButton = productDiv.querySelector('.quantity__minus');
        const plusButton = productDiv.querySelector('.quantity__plus');
        const quantityNumber = productDiv.querySelector('.quantity__number');
        const priceInfo = productDiv.querySelector('.product__price__info');

        minusButton.addEventListener('click', () => {
            let currentQuantity = parseInt(quantityNumber.textContent);
            if (currentQuantity <= 1) {
                productContainer.removeChild(productDiv);
                const updatedPanier = panierItems.filter(panierItem =>
                    (panierItem.id_jersey !== item.id_jersey || panierItem.size !== item.size)
                );
                localStorage.setItem('panier', JSON.stringify(updatedPanier));
                displayPanierItems(); // Recalculate the total
            } else {
                quantityNumber.textContent = currentQuantity - 1;
                updatePrice(priceInfo, currentQuantity - 1);
                updatePanierItemQuantity(item.id_jersey, item.size, currentQuantity - 1);
                displayPanierItems(); // Recalculate the total
            }
        });

        plusButton.addEventListener('click', () => {
            let currentQuantity = parseInt(quantityNumber.textContent);
            quantityNumber.textContent = currentQuantity + 1;
            updatePrice(priceInfo, currentQuantity + 1);
            updatePanierItemQuantity(item.id_jersey, item.size, currentQuantity + 1);
            displayPanierItems(); // Recalculate the total
        });
    });

    totalElement.textContent = total.toFixed(2); // Update the total price in the UI
}

function updatePrice(priceInfo, quantity) {
    const initialPrice = parseFloat(priceInfo.getAttribute('data-initial-price'));
    const newPrice = initialPrice * quantity;
    priceInfo.textContent = `${newPrice.toFixed(2)}€`;
}

function updatePanierItemQuantity(id_jersey, size, quantity) {
    let panierItems = JSON.parse(localStorage.getItem('panier')) || [];
    panierItems = panierItems.map(panierItem => {
        if (panierItem.id_jersey === id_jersey && panierItem.size === size) {
            panierItem.quantity = quantity;
        }
        return panierItem;
    });
    localStorage.setItem('panier', JSON.stringify(panierItems));
}

if (panier.style.right === '0px') {
    displayPanierItems();
}
