(function ($) {

    document.addEventListener("turbolinks:load", function () {

        var heroSlider = $('.hero-slider');
        if (heroSlider.length === 1 && !heroSlider.hasClass('slick-initialized')) {

            var sliderOptions = {
                dots: true,
                infinite: true,
                speed: 1000,
                fade: true,
                cssEase: 'linear',
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 4000,
                arrows: false,
                pauseOnHover: false
            };
            heroSlider.slick(sliderOptions);
        }

        var companiesSlider = $('.company-slider');
        if (companiesSlider.length === 1 && !companiesSlider.hasClass('slick-initialized')) {
            companiesSlider.slick({
                dots: true,
                infinite: true,
                speed: 600,
                slidesToShow: 1,
                autoplay: true,
                autoplaySpeed: 3000
            });
        }

        var clubsSlider = $('.clubs-slider');
        if (clubsSlider.length === 1 && !clubsSlider.hasClass('slick-initialized')) {
            clubsSlider.slick({
                dots: true,
                infinite: true,
                speed: 600,
                autoplay: true,
                autoplaySpeed: 3000,
                variableWidth: true
            });
        }
    });

})(jQuery);