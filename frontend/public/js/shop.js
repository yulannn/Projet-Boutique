document.addEventListener('DOMContentLoaded', () => {
    loadSession();
    displayProducts();
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
            const products = document.querySelector('.products');
            data.forEach(product => {
                const productElement = document.createElement('div');
                productElement.className = 'product';
                productElement.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>${product.price} €</p>
                `;
                products.appendChild(productElement);
            });
        });
}