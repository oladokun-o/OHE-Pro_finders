var Tawk_API=Tawk_API||{},
    exp = localStorage.getItem('expert_job'),
    alertBox = $('.alert'),
    alertContn = $('.alert-contn'),
    closeSelectBtn = $('.close-select'),
    alertSession = sessionStorage.getItem('alert');
$(document).ready(function () {
    Tawk_API.onLoad = function(){
        Tawk_API.setAttributes({
            'name': firstname + ' ' + lastname,
            'email': email,
            'expert': exp
            }, function(error){});
            var voidBox = $('.void-box');
            if (exp) {
                voidBox.fadeIn('fast');
                $('.loader').fadeIn('fast')
                setTimeout(() => {
                    $('.loader').fadeOut('slow')
                }, 1300);
                setTimeout(() => {
                    Tawk_API.maximize()
                    localStorage.setItem('chatWidget', 'maximized')
                }, 1500);
                localStorage.removeItem('expert_job')
            }
    };
});
  var Tawk_LoadStart=new Date();
  var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
  (function(){
  var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
  s1.async=true;
  s1.src='https://embed.tawk.to/61282971649e0a0a5cd3278b/1fe2e3q23';
  s1.charset='UTF-8';
  s1.setAttribute('crossorigin','*');
  s0.parentNode.insertBefore(s1,s0);
  })();
var exp = localStorage.getItem('expert_job'),
voidBox = $('.void-box');

Tawk_API.onChatMinimized  = function(){
    voidBox.fadeOut('fast');
    localStorage.setItem('chatWidget', 'minimized')
}; 

Tawk_API.onChatMaximized = function(){
    voidBox.fadeIn('fast');
    localStorage.setItem('chatWidget', 'maximized')
    localStorage.removeItem('expert_job')
    Closemypanel()
};

function minimizeChat() {
    var chatWidget = localStorage.getItem('chatWidget');
    if (chatWidget == 'maximized') {
        Tawk_API.minimize()
        voidBox.fadeOut('fast');
        localStorage.setItem('chatWidget', 'minimized')
    }
}


function maximizeChat() {
    voidBox.fadeIn('fast');
    $('.loader').fadeIn('fast')
    setTimeout(() => {
        $('.loader').fadeOut('slow')
    }, 1300);
    setTimeout(() => {
        Tawk_API.maximize()
        localStorage.setItem('chatWidget', 'maximized')
    }, 1500);
    localStorage.removeItem('expert_job')
}

function openSelect() {
    $('.search-form').fadeIn('fast').addClass('select-exp').find('label').hide()
    alertBox.fadeOut('fast')
    alertContn.removeClass('overflowed')
    closeSelectBtn.removeClass('fade-out')
}


function closeSelect() {
    $('.search-form').removeClass('select-exp').find('label').show()
    closeSelectBtn.addClass('fade-out')
}

function closeAlert (parameters) {
    closeExpAlert()
}

jQuery(function() {
    var chatWidget = localStorage.getItem('chatWidget');
    if (chatWidget == 'maximized') {
        voidBox.fadeIn('fast');
    } else {
        voidBox.fadeOut('fast');
    }
})
//alertBox.fadeIn('slow').html('<i class="fa fa-bell"></i> Please <a onclick="openSelect(this)">select</a> your desired expert to speak with <i onclick="closeAlert()" class="fa fa-times"></i>')
//alertContn.addClass('overflowed')
//sessionStorage.setItem('alert', true)