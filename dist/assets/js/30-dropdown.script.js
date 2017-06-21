(function ($) {

    $(window).on('load', function () {
        $(document).on('click', '#nav-toggle', function (e) {
            e.preventDefault();
            $('.nav-list').slideToggle();
        });
    });
    /*
     document.addEventListener("turbolinks:load", function() {
     //$(document).ready(function () {
     var dropDown = ({
     cacheDom: function () {
     dropDown.navToggle = $('#nav-toggle');
     dropDown.navList = $('.nav-list');
     },
     attachEvent: function () {
     dropDown.navToggle.on('click', function (e) {
     e.preventDefault();
     dropDown.navList.slideToggle();
     });
     }
     });

     dropDown.cacheDom();
     dropDown.attachEvent();
     });*/

})(jQuery);
//# sourceMappingURL=30-dropdown.script.js.map
