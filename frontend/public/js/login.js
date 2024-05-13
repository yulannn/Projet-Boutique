document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async function (event) {
        const errorMessage = document.querySelector('#error__message');
        errorMessage.innerHTML = '';

        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;


        const formData = {
            email: email,
            password: password
        };

        try {
            await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            }).then(response => {
                if (response.ok) {
                    console.log("Connexion réussie")
                    response.headers.forEach(function (val, key) { console.log(key + ' -> ' + val); });
                    window.location.href = '/'
                } else {
                    errorMessage.innerHTML = 'Adresse e-mail ou mot de passe incorrect.';
                }
            });
        } catch (error) {
            console.error('Erreur lors de la requête:', error);
            alert('Une erreur s\'est produite lors de l\'inscription.');
        }
    });
});
