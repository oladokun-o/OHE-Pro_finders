//get updates mailer
$('.get-update-form').on('submit', function(e) {
        $('.send-updates').html('<span> sending <i class="lni lni-hourglass fa-spin"></i></span>')
        $('.getUpdates').attr("disabled", true);
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/get-updates',
            data: {
                email: $("#updateEmail").val(),
                subject: 'Welcome to OHE!',
                message: 'You suscribed to get notified anytime there is a new update!'
            },
            success: function() {
                $('.send-updates').html('<span> done <i class="lni lni-checkmark"></i></span>')
                $('.send-updates').attr("disabled", true);
                $('.getUpdates').attr("disabled", true);
                $('.get-update-form').each(function() {
                    this.reset();
                    setTimeout(
                        function() {
                            $('.updates-form-child').fadeOut('slow');
                            $('.proceed-updates').html('<i class="lni lni-chevron-right"></i>')
                            $('.send-updates').html('<span>send</span>')
                            $('.send-updates').attr("disabled", false);
                            $('.getUpdates').removeAttr("disabled");
                        }, 3000)
                })
            },
            error: function(ajaxContext) {
                $('.error').fadeIn('fast', function() { $('.error').html(ajaxContext.responseText) });
                setTimeout(
                    function() {
                        $('.error').fadeOut('fast', function() {
                            $('.error').html('')

                        });
                    }, 5000)
                $('.send-updates').html('<span> failed <i class="lni lni-close red"></i></span>');
                $('.send-updates').addClass('nullified');
                $('.send-updates').attr("disabled", true)
                setTimeout(
                    function() {
                        $('.updates-form-child').fadeOut('slow');
                        $('.proceed-updates').html('<i class="lni lni-chevron-right"></i>')
                        $('.send-updates').html('<span>send</span>')
                        $('.send-updates').attr("disabled", false);
                        $('.send-updates').removeClass('nullified');
                        $('.getUpdates').removeAttr("disabled");
                    }, 3000)
            }
        })
    })
    //reset password
$('.forgot-form').on('submit', function(e) {
        if ($('#forgotEmail').html = ('')) {
            $('.proceed-forgot-mail').focus()
        } else {
            $('.proceed-forgot-mail').html('<span>sending <i class="fa fa-spinner fa-spin"></i></span>')
            $('.proceed-forgot-mail').attr("disabled", true);
            $('.proceed-forgot-mail').addClass('nullified');
            e.preventDefault();
            $.ajax({
                method: 'POST',
                url: '/reset-password',
                data: {
                    email: $("#forgotEmail").val(),
                    subject: 'Your OHE Password Reset',
                },
                success: function() {
                    $('.error').addClass('greenlight');
                    $('.error').fadeIn('fast', function() { $('.error').html('Check your mail inbox for recovery link') });
                    /*setTimeout(
                        function() {
                            $('.error').fadeOut('fast');
                            $('.error').fadeOut('slow', function() {
                                $('.error').removeClass('greenlight');
                                $('.error').html('')
                            })
                        }, 5000)*/
                    $('.proceed-forgot-mail').html('<span>recovery link sent <i class="lni lni-checkmark"></i></span>')
                    $('.proceed-forgot-mail').attr("disabled", true);
                    $('.forgot-form').each(function() {
                        this.reset();
                        setTimeout(
                            function() {
                                $('.forgot-input-title').fadeOut('slow')
                                $('.forgot-group').fadeOut('slow')
                                $('.forgot-form-lock').removeClass('lni-unlock')
                                $('.forgot-form-lock').addClass('lni-lock')
                            }, 1000)
                    });
                },
                error: function(response) {
                    const secondrequest = JSON.stringify(response.responseText);
                    $('.error').fadeIn('fast', function() { $('.error').html(secondrequest) });
                    setTimeout(
                        function() {
                            $('.error').fadeOut('fast');
                            //$('.error').html('')
                        }, 3000)
                    $('.proceed-forgot-mail').html('<span> failed <i class="lni lni-close red"></i></span>')
                    $('.proceed-forgot-mail').attr("disabled", true);
                    $('.forgot-form').each(function() {
                        this.reset();
                        setTimeout(
                            function() {
                                $('.proceed-forgot-mail').html('<span>reset password</span>')
                                $('.proceed-forgot-mail').attr("disabled", false);
                                $('.proceed-forgot-mail').removeClass('nullified');

                            }, 3000)
                    });
                }
            })
        }
    })
    //reset password
$('.reset-form').on('submit', function(e) {

    $('.update-pwd').html('<span>sending <i class="fa fa-spinner fa-spin"></i></span>')
    $('.update-pwd').attr("disabled", true);
    $('.update-pwd').addClass('nullified');
    e.preventDefault();
    $.ajax({
        method: 'POST',
        data: {
            subject: 'Password Changed',
            password: $('#pass').val(),
        },
        success: function(response) {
            const request = JSON.stringify(response.responseText);
            $('.error').fadeIn('fast', function() { $('.error').html(request) });
            $('.error').addClass('greenlight');
            $('.error').fadeIn('fast', function() { $('.error').html('Password Updated') });
            /*setTimeout(
                function() {
                    $('.error').fadeOut('fast');
                    $('.error').fadeOut('slow', function() {
                        $('.error').removeClass('greenlight');
                        $('.error').html('')
                    })
                }, 5000)*/
            $('.update-pwd').html('<span> done <i class="lni lni-checkmark"></i></span>')
            $('.update-pwd').attr("disabled", true);
            $('.update-pwd').addClass('nullified')
            $('.reset-form').each(function() {
                this.reset();
            });
            setTimeout(
                function() {
                    $('#pass').attr("disabled", true);
                    $('#pass2').attr("disabled", true);
                    $('#pass').addClass('nullified');
                    $('#pass2').addClass('nullified');
                    $('#message').fadeOut('slow')
                }, 1000)
        },
        error: function(response) {
            const request = JSON.stringify(response.responseText);
            $('.error').fadeIn('fast', function() { $('.error').html(request) });
            /*setTimeout(
                function() {
                    $('.error').fadeOut('fast');
                    $('.error').html('')
                }, 5000)*/
            $('.update-pwd').html('<span> failed <i class="lni lni-close red"></i></span>')
            $('.update-pwd').attr("disabled", true);
            $('.update-pwd').addClass('nullified')
            $('.reset-form').each(function() {
                this.reset();
            });
            setTimeout(
                function() {
                    $('#pass').attr("disabled", true);
                    $('#pass2').attr("disabled", true);
                    $('#pass').addClass('nullified');
                    $('#pass2').addClass('nullified');
                }, 1000)
        }
    })

})

var mailer = '/utils/emails/reset-password.html';
$('.-pwd').on('click', function(e) {
    e.preventDefault()
    $.ajax({
        method: 'POST',
        url: '/file-test',
        data: {
            email: 'mail@fake.com',
            subject: 'testing reset mailer',
            password: $('#pass').val()
        },
        error: console.log('something went wrong'),
        success: console.log('ok')
    })
})

$('.contactForm').on('submit', function(e) {
    e.preventDefault()
    $('.contact-btn').html('<span>sending <i class="fa fa-spinner fa-spin"></i></span>')
    $('.contact-btn').attr("disabled", true);
    $('.contact-btn').addClass('nullified');
    $.ajax({
        method: 'POST',
        url: '/contact-us',
        data: {
            email: $('#email').val(),
            name: $('#name').val(),
            subject: $('#subject').val(),
            message: $('#msg').val()
        },
        error: function() {
            $('.error').fadeIn('fast', function() { $('.error').html('Something went wrong, try again') });
            setTimeout(
                function() {
                    $('.error').fadeOut('fast');
                    $('.error').html('')
                }, 5000)

            $('.contact-btn').html('<span> failed <i class="lni lni-checkmark"></i></span>')
            $('.contact-btn').attr("disabled", true);
            $('.contact-btn').addClass('nullified')

            setTimeout(
                function() {
                    $('.contact-btn').html('<span> send message</span>')
                    $('.contact-btn').removeClass('nullified');
                    $('.contact-btn').removeAttr("disabled");
                }, 1000)
        },
        success: function() {
            $('.contact-btn').html('<span> sent <i class="lni lni-checkmark"></i></span>')
            $('.contact-btn').attr("disabled", true);
            $('.contact-btn').addClass('nullified')
            $('.contactForm').each(function() {
                this.reset();
            });
            setTimeout(
                function() {
                    $('#pass').attr("disabled", true);
                    $('#pass2').attr("disabled", true);
                    $('#pass').addClass('nullified');
                    $('#pass2').addClass('nullified');
                }, 1000)
        }
    })
})
if ($('#emailstat').hasClass('hide')) {
    setTimeout(function() {
        // after 5 seconds
        var url = '/dashboard'//"/facebook/callback/dashboard?email=" + $('#emailstat').val()
        window.location = url;
    }, 5000)
}
//search jobs array
$(document).on('ready', function(e) {
    e.preventDefault()
    $('#selector').fadeOut('fast')
    $('.search').attr("disabled", true);
    $('.reply-contn,.search-loader').fadeIn('fast', function() {
        $('.reply-contn').html('<div class="search-loader"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></div>')
    })
    $('.reply-contn').html('')
    $.ajax({
        method: 'POST',
        url: '/jobs',
        data: {
            subject: $('#search').val()
        },
        success: function(response) {
            setTimeout(() => {
                //const firstreq = JSON.stringify(response.responseText)
                //$('.reply-contn').fadeIn('fast', function() { $('.reply-contn').html('<div class="reply">' + response + '<div/>') });
                $('.search').removeAttr('disabled')
                $('.search-loader').fadeOut('fast')
                var jobsArray = response;
                var jobshtml = $.map(jobsArray,function (value) {
                    return('<div class="reply">'+ value + '</div>');
                })
                $(".reply-contn").html(jobshtml.join(''))
               /* setTimeout(() => {
                    $.each(jobsArray, function(index, value) {
                        $('.reply-contn').fadeIn('fast', function() {
                            $(".reply-contn").append('<div class="reply">'+ index + value + '</div>');
                        })
                    });
                }, 200);
                console.log(response)*/
            }, 700);
        },
        error: function(response) {
            const secondreq = JSON.stringify(response.responseText);
                var wordOptions = ['Car Mechanic', 'Generator Mechanic', 'Electrician', 'Event Planners', 'Sound Engineer', 'Sport Analyst']
            setTimeout(() => {
                $('.search').removeAttr('disabled')
                $('.search-loader').fadeOut('fast')                
            }, 700);
            setTimeout(() => {
                $('.reply-contn').fadeIn('fast', function() {
                    $('.reply-contn').append('<div class="error-reply">' + secondreq + '<br>' + 'Try something else:</div><div class="word-options"></div>')
                    $.each(wordOptions, function(index, value) {
                        $(".word-options").append('<a href="#">' + value + '</a>');
                    });
                });
            }, 900);
        }

    })

})
$('.chat-search-form').on('submit', function(e) {
    e.preventDefault()
  
    $.ajax({
        method: 'POST',
        url: '/jobs',
        data: {
            subject: $('.chat-search-form input').val()
        },
        success: function(response) {
                //const firstreq = JSON.stringify(response.responseText)
                //$('.reply-contn').fadeIn('fast', function() { $('.reply-contn').html('<div class="reply">' + response + '<div/>') });
                $('.search').removeAttr('disabled')
                $('.search-loader').fadeOut('fast')
                var jobsArray = response;
                var jobshtml = $.map(jobsArray,function (value) {
                    return('<li class="reply">'+ value + '</li>');
                })
                $(".chat-reply-contn").fadeIn('fast').html(jobshtml.join(''))
               /* setTimeout(() => {
                    $.each(jobsArray, function(index, value) {
                        $('.chat-reply-contn').fadeIn('fast', function() {
                            $(".chat-reply-contn").append('<div class="reply">'+ index + value + '</div>');
                        })
                    });
                }, 200);
                console.log(response)*/
        },
        //error: function(response) {
            //$('.chat-reply-contn').fadeIn('fast').html('<div class="reply">Not Found</div>')
        //}

    })

})


var changePwdForm = $('.change-password'),
    currentPwd = $('#current_password'),
    newPwd = $('#new_password'),
    changePwdBtn = $('.proceed-change-password'),
    alertBx = $('.alert')

changePwdForm.on('submit', (e) => {
    e.preventDefault()
    changePwdBtn.html('changing...')
    changePwdForm.find('input').attr('disabled', true).toggleClass('nullified')
    changePwdForm.find('button').attr('disabled', true).toggleClass('nullified')
    setTimeout(() => {
        $.ajax({
            method: 'POST',
            url: '/change-password',
            data: {
                oldPwd: currentPwd.val(),
                newPwd: newPwd.val(),
                id: id,
            },
            success: (res) => {
                changePwdBtn.html('done')
                alertBx.removeClass('fade-out').addClass('greenlight').html(res)
                setTimeout(() => {
                    window.history.back()
                }, 3000);
            },
            error: (res) => {                
                changePwdBtn.html('change')
                alertBx.removeClass('fade-out').html(res.responseText)
                setTimeout(() => {
                    alertBx.fadeOut('slow')
                }, 3000);
                changePwdForm.find('input').val('').removeAttr('disabled').removeClass('nullified')
                changePwdForm.find('button').removeAttr('disabled').removeClass('nullified')
            }
        })
    }, 2000);
})
var jobss = '!{jobs}'
//$(".categories-list").html(jobss)