document.addEventListener('DOMContentLoaded', () => {
    loadSession();
    displayImage();
    displayJersey();
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
                    <p id="jersey__price">${jersey.price}€</p>
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