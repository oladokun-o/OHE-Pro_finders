//preloader
document.onreadystatechange = function() {
    // Animate loader off screen
    setTimeout(
        function() {
            $(".preload").addClass('slide-out-top')
            $('body').removeClass('preloader-active')
        }, 1000);
};