//login
$('.form-signin').on('submit', function (e) {
    var loginBtn = $('.primary-btn'),
        loginBtnIcon = $('.primary-btn span'),
        alertContn = $('.alert')
    loginBtnIcon.html('<span><i class="lni lni-spinner-arrow fa-spin"></i></span>')
    loginBtn.attr("disabled", true);
    loginBtn.addClass('nullified');
        e.preventDefault();
      setTimeout(() => {
            $.ajax({
            method: 'POST',
            url: '/dashboard',
            data: {
                email: $("#Username").val().trim(),
                password: $("#password").val().trim()
            },
            success: function(response) {
                console.log(response)
                loginBtnIcon.html('<i class="lni lni-checkmark green"></i>')
            },
            error: function(response) {
                //console.log(response.responseText)
                alertContn.fadeIn('fast')
                setTimeout(() => {
                    alertContn.fadeOut('fast')                   
                }, 3000);
                alertContn.html(response.responseText)
                loginBtnIcon.html('login')
                loginBtn.removeAttr('disabled')
                loginBtn.removeClass('nullified');
            }
        })
      }, 1000);
})
//signup
$('.form-signup').on('submit', function (e) {
    var singupBtn = $('.primary-btn'),
        singupBtnIcon = $('.primary-btn span'),
        alertContn = $('.alert')
    singupBtnIcon.html('<span><i class="lni lni-spinner-arrow fa-spin"></i></span>')
    singupBtn.attr("disabled", true);
    singupBtn.addClass('nullified');
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
                password2: $("#passwordII").val().trim()
            },
            success: function(response) {
                //console.log(response.responseText)
                singupBtnIcon.html('<i class="lni lni-checkmark green"></i>')
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
                singupBtnIcon.html('login')
                singupBtn.removeAttr('disabled')
                singupBtn.removeClass('nullified');
            }
        })
      }, 1000);
})