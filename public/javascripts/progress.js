const load = $('.load'),
        loader = $('.loader'),
        sess = sessionStorage.getItem('_user_sess');
setTimeout(() => {
    loader.removeClass('fade-out').animate({
        opacity: "show"
        }, "slow", "easein")
}, 3000);
jQuery(function() {
    if (sess == 0) {
        loading()
    } else {
        loadOnce()
        sessionStorage.setItem('_user_sess', '0')
    }
})
const loadOnce = function () {
    setTimeout(() => {
        load.addClass('slide-out-top')
        $('body').removeClass('loader-active')
    }, 5000);
}, loading = function () {
    load.addClass('slide-out-top')
    $('body').removeClass('loader-active')
}
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })