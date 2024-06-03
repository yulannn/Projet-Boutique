const panier = document.querySelector('.panier__popup');
const buttonPanier = document.querySelector('.panier__button');
const productContainer = document.querySelector('.panier__popup__products');
const croix = document.querySelector('.invert__color');


buttonPanier.addEventListener('click', () => {
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

    panierItems.forEach(item => {
        const productDiv = document.createElement('div');
        productDiv.className = 'panier__product';
        productDiv.innerHTML = `
            <img class="panier__img" src="/public/img/jersey-images/${item.url_path}" alt="${item.name}"/>
            <div class="product__details">
                <p class="product__name">${item.name}</p> 
                <p class="product__size">${item.size}</p>
            </div>
            <p class="product__price__info" data-initial-price="${item.price}">${item.price}€</p>
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
            const panierItems = JSON.parse(localStorage.getItem('panier')) || [];
            let currentQuantity = parseInt(quantityNumber.textContent);
            if (currentQuantity <= 1) {
                productContainer.removeChild(productDiv);
                const updatedPanier = panierItems.filter(panierItem =>
                    (panierItem.id_jersey !== item.id_jersey || panierItem.size !== item.size)
                );
                localStorage.setItem('panier', JSON.stringify(updatedPanier));
            } else
                if (currentQuantity > 1) {
                    quantityNumber.textContent = currentQuantity - 1;
                    updatePrice(priceInfo, currentQuantity - 1);
                }
        });

        plusButton.addEventListener('click', () => {
            let currentQuantity = parseInt(quantityNumber.textContent);
            localStorage.setItem('panier', JSON.stringify(panierItems.map(panierItem => {
                if (panierItem.name === item.name) {
                    panierItem.quantity = currentQuantity + 1;
                }
                return panierItem;
            })));
            quantityNumber.textContent = currentQuantity + 1;
            updatePrice(priceInfo, currentQuantity + 1);
        });
    });
}

function updatePrice(priceInfo, quantity) {
    const initialPrice = parseFloat(priceInfo.getAttribute('data-initial-price'));
    const newPrice = initialPrice * quantity;
    priceInfo.textContent = `${newPrice.toFixed(2)}€`;
}

if (panier.style.right === '0px') {
    displayPanierItems();
}
