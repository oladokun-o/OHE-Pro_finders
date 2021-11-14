//signup
$('.form-signup').on('submit', function (e) {
    var signupBtn = $('.primary-btn'),
        signupBtnIcon = $('.primary-btn span'),
        alertContn = $('.alert')
    signupBtnIcon.html('<span><i class="lni lni-spinner-arrow fa-spin"></i></span>')
    signupBtn.attr("disabled", true);
    signupBtn.addClass('nullified');
        e.preventDefault();
      setTimeout(() => {
            $.ajax({
            method: 'POST',
            url: '/register',
            data: {
                firstname: $("#Firstname").val().trim(),
                lastname: $("#Lastname").val().trim(),
                email: $("#EmailAddress").val().trim(),
                password: $("#passwordI").val().trim(),
                password2: $("#passwordII").val().trim(),
                type: 'consumer'
            },
            success: function(response) {
                //console.log(response.responseText)
                signupBtnIcon.html('<i class="lni lni-checkmark green"></i>')
                sessionStorage.setItem('signup', 'true')
                  setTimeout(() => {
                      window.location.href = '/login';
                }, 1000);
            },
            error: function(response) {
                //console.log(response.responseText)
                alertContn.fadeIn('fast')
                setTimeout(() => {
                    alertContn.fadeOut('fast')                   
                }, 3000);
                alertContn.html(response.responseText)
                signupBtnIcon.html('login')
                signupBtn.removeAttr('disabled')
                signupBtn.removeClass('nullified');
            }
        })
      }, 1000);
})

//login
var alertBox = $('.alert');
if (LoginErrorMsg) {
    alertBox.removeClass('fade-out')
    alertBox.html(LoginErrorMsg)
    setTimeout(() => {
            alertBox.addClass('fade-out')
    }, 3000);
}
