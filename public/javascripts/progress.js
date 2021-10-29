const load = $('.load'),
        loader = $('.loader-'),
        sess = sessionStorage.getItem('_user_sess');
setTimeout(() => {
    loader.removeClass('force-fade-out').fadeIn('fast')
}, 3000);
jQuery(function() {
    if (sess == 0) {
        loadingPage()
    } else {
        loadOnce()
        sessionStorage.setItem('_user_sess', '0')
    }
})
const loadOnce = function () {
    alertContn.addClass('overflowed')
    setTimeout(() => {
        load.addClass('slide-out-top')
        $('body').removeClass('loader-active')
        alertContn.removeClass('overflowed')
    }, 5000);
}, loadingPage = function () {
    alertContn.addClass('overflowed')
    load.addClass('slide-out-top')
    $('body').removeClass('loader-active')
    setTimeout(() => {
        alertContn.removeClass('overflowed')
    }, 1000);
}