function openBurger(){
    var menu = document.querySelector('.navigation-menu');
    menu.style.right = '0';
    menu.style.transition = 'right 0.5s'
}

function closeBurger(){
    var menu = document.querySelector('.navigation-menu');
    menu.style.right =  '-45%';
}
