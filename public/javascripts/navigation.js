// this should be the Ajax Method.
// and load the url content
var setCurrentPage = function(url) {
    $('h2 span').html(url || "/");
};
function showsearchicon(){
    //$('#search-formII').fadeIn('fast')
    //$('#reply-contnII').removeClass('hide')
}
function removesearchicon() {
    //$('#search-formII').fadeOut('fast')
    //$('#reply-contnII').addClass('hide')
}
const dashboard = $('.-dashboard'),    
    chats = $('.-chats'),
    settings = $('.-settings'),
    helpcenter = $('.-help-center'),
    dashboardbtn = $('.-dashboardbtn'),
    chatsbtn = $('.-chatsbtn'),
    settingsbtn = $('.-settingsbtn'),
    helpcenterbtn = $('.-help-centerbtn')
function Dashboard() {
    //dashboard button
    dashboardbtn.addClass('active')
    chatsbtn.removeClass('active')
    settingsbtn.removeClass('active')
    helpcenterbtn.removeClass('active')
//dashboard contn
if(dashboard.hasClass('hide')){
    dashboard.removeClass('hide')
    chats.addClass('hide')
    settings.addClass('hide')
    helpcenter.addClass('hide')
}
removesearchicon()
}
function setting() {
        //settings button
    dashboardbtn.removeClass('active')
    chatsbtn.removeClass('active')
    settingsbtn.addClass('active')
    helpcenterbtn.removeClass('active')
    //settings contn
    if(settings.hasClass('hide')){
        dashboard.addClass('hide')

        chats.addClass('hide')
        settings.removeClass('hide')
        helpcenter.addClass('hide')
    }
    showsearchicon()
}
function Chats(){
    //chats button
    dashboardbtn.removeClass('active')
    chatsbtn.addClass('active')
    settingsbtn.removeClass('active')
    helpcenterbtn.removeClass('active')
    //chats contn
    if(chats.hasClass('hide')){
        dashboard.addClass('hide')

        chats.removeClass('hide')
        settings.addClass('hide')
        helpcenter.addClass('hide')
    }
}
function help(){
     //help button
     dashboardbtn.removeClass('active')

     settingsbtn.removeClass('active')
     chatsbtn.removeClass('active')
     helpcenterbtn.addClass('active')
 //help contn
 if(helpcenter.hasClass('hide')){
     dashboard.addClass('hide')

     chats.addClass('hide')
     settings.addClass('hide')
     helpcenter.removeClass('hide')
 }
}
$('.menu-item a').click(function(e) {
    e.preventDefault();
    var targetUrl = $(this).attr('href'),
        targetTitle = $(this).attr('title'),
        target = $(this).children('li')
    window.history.pushState({ url: "" + targetUrl + "" }, targetTitle, targetUrl);
    //setCurrentPage(targetUrl);
    sessionStorage.setItem('currentpage', targetUrl);
    //console.log(targetUrl)
    target.addClass('active')
    remvoveActiveclass(target)
    var body = $('.body-theme')
    if(body.hasClass('panel-open')){
       Closemypanel()
    }
});
$('.-edit-profile').click(function(e) {
    e.preventDefault();
    var targetUrl = $(this).attr('href'),
        targetTitle = $(this).attr('title')
        //target = $(this).children('li')
    window.history.pushState({ url: "" + targetUrl + "" }, targetTitle, targetUrl);
    sessionStorage.setItem('currentpage', targetUrl);
    setting()
})
$('.-chat').click(function(e) {
    e.preventDefault();
    var targetUrl = $(this).attr('href'),
        targetTitle = $(this).attr('title')
        //target = $(this).children('li')
    window.history.pushState({ url: "" + targetUrl + "" }, targetTitle, targetUrl);
    sessionStorage.setItem('currentpage', targetUrl);
    Chats()
})
$('.logout').on('click', function(){
    window.location = '/logout'
})
window.onpopstate = function(e) {
    setCurrentPage(e.state ? e.state.url : null);
};
function remvoveActiveclass(target){
    if (target.hasClass('-dashboardbtn')) {
        Dashboard()
    }  else if (target.hasClass('-chatsbtn')) {
        Chats()
        }else if (target.hasClass('-settingsbtn')) {
            setting()
        }else if (target.hasClass('-help-centerbtn')) {
           help()
        }
}
    $(document).ready(function(event) {
        const Currentpage = sessionStorage.getItem('currentpage');
        if (Currentpage == '/-dashboard') {
           Dashboard()
        } else if (Currentpage == '/-chats') {
           Chats()
            }else if (Currentpage == '/-account') {
                setting()
            }else if (Currentpage == '/-help') {
               help()
            }
    })