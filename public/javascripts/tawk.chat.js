var Tawk_API=Tawk_API||{},
    exp = localStorage.getItem('expert_job')
$(document).ready(function () {
    Tawk_API.onLoad = function(){
        Tawk_API.setAttributes({
            'name': firstname + ' ' + lastname,
            'email': email,
            'expert': exp
            }, function(error){});
    };
    var exp = localStorage.getItem('expert_job'),
        voidBox = $('.void-box');
    if (exp) {
        voidBox.fadeIn('fast');
        Tawk_API.onLoad = function(){
            $('.loader').fadeOut('fast')
            setTimeout(() => {
                Tawk_API.maximize()
            }, 1500);
        }
    }   
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
    console.log('hi')
}; 

Tawk_API.onChatMaximized = function(){
    voidBox.fadeIn('fast');
};

function openChat() {
    Tawk_API.minimize()
    voidBox.fadeOut('fast');
}