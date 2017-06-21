(function ($) {
    window.randomize = function (value) {
        $('.ko-progress-circle').attr('data-progress', value);
    };

    var check_if_in_view = function () {

        var $animation_elements = $('.stats');
        var $window = $(window);
        var window_height = $window.height();
        var window_top_position = $window.scrollTop();
        var window_bottom_position = (window_top_position + window_height);

        $.each($animation_elements, function () {
            var $element = $(this);
            var element_height = $element.outerHeight();
            var element_top_position = $element.offset().top;
            var element_bottom_position = (element_top_position + element_height);
            if ((element_bottom_position >= window_top_position) &&
                (element_top_position <= window_bottom_position)) {
                $element.addClass('in-view');
                setTimeout(window.randomize(100), 400);
            } else {
                $element.removeClass('in-view');
                setTimeout(window.randomize(0), 400);
            }
        });
    };

    var generalScript = function () {
        $('.cs-loader').remove();
        //dropDown.cacheDom();
        //dropDown.attachEvent();
    };
    var homePageScript = function () {
        /*var sliderOptions = {
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
        $('.hero-slider').slick(sliderOptions);*/
        $(window).on('scroll resize', check_if_in_view);
        var websiteUrl = window.location.origin;
        //console.log(websiteUrl);
        $.ajax({
            url: websiteUrl + "/api/v1/visitors",
            async: true,
            success: function (result) {
                //console.log(result);
                $('#visitors-number').html(result['visitors']);
            }
        });
        $.ajax({
            url: websiteUrl + "/api/v1/stats",
            async: true,
            success: function (result) {
                $('#collabs-number').html(result[1].current_value);
                $('#customers-number').html(result[0].current_value);
            }
        });
    };
    var companyPageScript = function () {
        /*$('.company-slider').slick({
            dots: true,
            infinite: true,
            speed: 600,
            slidesToShow: 1,
            autoplay: true,
            autoplaySpeed: 3000
        });*/
    };
    var historyPageScript = function () {
        /*$('.clubs-slider').slick({
            dots: true,
            infinite: true,
            speed: 600,
            autoplay: true,
            autoplaySpeed: 3000,
            variableWidth: true
        });*/
    };

    var joinUsPageScript = function () {
        $('#file-upload').change(function () {
            var filepath = this.value;
            var m = filepath.match(/([^\/\\]+)$/);
            var filename = m[1];
            $('#filename').html(filename);
        });
    };

    var mainScript = (function () {
        var pathname = window.location.pathname;
        //console.log(pathname);
        //generalScript();
        if (pathname === '/') {
            homePageScript();
        } else if (pathname === '/history') {
            historyPageScript();
        } else if (pathname === '/gbs' ||
            pathname === '/ens' ||
            pathname === '/hrs' ||
            pathname === '/ems') {
            companyPageScript();
        } else if (pathname === '/join-us') {
            joinUsPageScript();
        }
    });

    var oneScript = function () {
        generalScript();
    };

    $(document).ready(function () {
        //mainScript();
        // oneScript();
    });

    document.addEventListener("turbolinks:load", function() {
        $('.cs-loader').remove();
        mainScript();
    });

    /*
    pageAccelerator({
        afterLoading: function () {
            mainScript();
        }
    });
    */
})(jQuery);
