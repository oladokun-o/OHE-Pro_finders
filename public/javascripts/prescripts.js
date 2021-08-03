
var loginText = $('.login-anchor span'),
    loginAnchor = $('.login-anchor'),
    Cookie = document.cookie

    if (Cookie) {
        loginText.html('Logout')
        loginAnchor.attr('href', '/logout')
    } else {
        loginText.html('Login')
        loginAnchor.attr('href', '/login')
}

var userId = $('.data-saver').data('val');
//console.log(userId)
//email update 
$('.email-form').on('submit', function (e) {
    e.preventDefault();
    var oldEmail = $("#oldemail").val(),
        data;
    if (oldEmail) {
        data = {
        id: userId,
        oldemail: $("#oldemail").val(),
        newemail: $("#newemail").val()
    }
    } else {
        data =  {
            email: $("#email").val(),
            subject: 'Update your Email Address',
            fullname: $('#user-name').val(),
            userid: $('#user-id').val()
        }
    }
    
    $('.update-email').html('<span>sending <i class="fa fa-spinner fa-spin"></i></span>')
    $('.update-email').attr("disabled", true);
    $('.update-email').addClass('nullified');
    setTimeout(() => {
        $.ajax({
        method: 'POST',
        url: '/update-email',
        data: data,
        success: function(res) {
            $('.error').addClass('greenlight');
            $('.error').fadeIn('fast', function() { $('.error').html(res) });
            /*setTimeout(
                function() {
                    $('.error').fadeOut('fast');
                    $('.error').fadeOut('slow', function() {
                        $('.error').removeClass('greenlight');
                        $('.error').html('')
                    })
                }, 5000)*/
            $('.update-email').html('<span>confirmation link sent <i class="lni lni-checkmark"></i></span>')
            $('.update-email').attr("disabled", true);
            $('.email-form').each(function() {
                this.reset();
            });
        },
        error: function(response) {
            const secondrequest = JSON.stringify(response.responseText);
            $('.error').fadeIn('fast', function() { $('.error').html(secondrequest) });
            setTimeout(
                function() {
                    $('.error').fadeOut('fast');
                    $('.error').html('')
                }, 5000)
            $('.update-email').html('<span> failed <i class="lni lni-close red"></i></span>')
            $('.update-email').attr("disabled", true);
            $('.email-form').each(function() {
                this.reset();
                setTimeout(
                    function () {
                        if (oldEmail) {
                            $('.update-email').html('submit')    
                        } else{
                            $('.update-email').html('<span>update email</span>')
                        }
                        $('.update-email').attr("disabled", false);
                        $('.update-email').removeClass('nullified');

                    }, 3000)
            });
        }
    })
    }, 3000);
})


var cancelPwdChange = $('.cancel-change-password')

cancelPwdChange.on('click', () => {
    window.history.back()
})

/*
var chatBtn = $('.-chatsbtn'),
    chatContn = $('.-chats');

chatBtn.on('click', (e) => {
    e.preventDefault()
    $.ajax({
        method: 'GET',
        url: '/',
        success: (res) => {
            console.log(res.file)
            //var msg = JSON.stringify(res);
            //chatContn.removeClass('hide').fadeIn('fast').html(res);
        },
        error: (res) => {
            console.log(res)
        }
    })
})*/