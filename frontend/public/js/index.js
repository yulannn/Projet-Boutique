var TrandingSlider = new Swiper('.tranding-slider', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    slidesPerView: 2,
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 150,
        modifier: 2.5,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    }
});