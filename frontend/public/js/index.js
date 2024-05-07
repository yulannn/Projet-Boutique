document.querySelector('.burger-menu').addEventListener('click', function() {
    var menu = document.querySelector('.navigation-menu');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
});


function openBurger(){
    console.log('open')
    var buttonBurger = document.querySelector('#burger-button');
    buttonBurger.setAttribute('color', 'black');
    buttonBurger.setAttribute('name', 'x');
    buttonBurger.setAttribute('onClick', 'closeBurger()')
}

function closeBurger(){
    console.log('close')
    var buttonBurger = document.querySelector('#burger-button');
    buttonBurger.setAttribute('color', 'white');
    buttonBurger.setAttribute('name', 'menu');
    buttonBurger.setAttribute('onClick', 'openBurger()')
}