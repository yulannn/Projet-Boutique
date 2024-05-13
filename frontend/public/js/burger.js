function openBurger(){
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
    var buttonBurger = document.querySelector('#burger-button');
    buttonBurger.setAttribute('color', 'white');
    buttonBurger.setAttribute('name', 'menu');
    buttonBurger.setAttribute('onClick', 'openBurger()')
    var menu = document.querySelector('.navigation-menu');
    menu.style.right =  '-45%';

}
