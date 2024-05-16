document.addEventListener('DOMContentLoaded', () => {

    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    changeLanguage(savedLanguage);
    loadSession();
});



const translations = {
    en: {
        teams: "Teams",
        shop: "Shop",
        login: "Login",
    },
    fr: {
        teams: "Équipes",
        shop: "Magasin",
        login: "Connexion",
    }
};

function changeLanguage(lang) {
    selectLanguage = document.querySelector('#language-select');
    selectLanguage.value = lang;
    document.querySelector('.mid__header__content').children[0].textContent = translations[lang].teams;
    document.querySelector('.mid__header__content').children[1].textContent = translations[lang].shop;
    document.querySelector('.right__header__content').children[0].textContent = translations[lang].login;
    localStorage.setItem('selectedLanguage', lang);
}


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