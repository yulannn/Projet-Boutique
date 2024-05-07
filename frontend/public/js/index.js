

function openBurger(){
    console.log('open')
    var menu = document.querySelector('.navigation-menu');
    menu.style.right = '0';
    menu.style.transition = 'right 0.5s'
    var buttonBurger = document.querySelector('#burger-button');

    setTimeout(() => {
        buttonBurger.setAttribute('color', 'black');
    buttonBurger.setAttribute('name', 'x');
    buttonBurger.setAttribute('onClick', 'closeBurger()')
    }, 200);
}

function closeBurger(){
    console.log('close')
    var buttonBurger = document.querySelector('#burger-button');
    buttonBurger.setAttribute('color', 'white');
    buttonBurger.setAttribute('name', 'menu');
    buttonBurger.setAttribute('onClick', 'openBurger()')
    var menu = document.querySelector('.navigation-menu');
    menu.style.right =  '-45%';
    
}

// Contient les traductions pour l'anglais et le français
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

document.addEventListener('DOMContentLoaded', () => {

    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    changeLanguage(savedLanguage);
});
