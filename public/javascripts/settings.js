var editProfileBtn = $('.edit-profile-btn'),
    saveProfileBtn = $('.save-btn'),
    emailAddress = $('#email'),
    phoneNumber = $('#phone'),
    addressI = $('#addressI'),
    addressII = $('#addressII'),
    profileForm = $('.profile-form');

function lockInputs() {
//emailAddress.removeAttr('disabled').addClass('edit-active')
    phoneNumber.attr('disabled', true).removeClass('edit-active')
    addressI.attr('disabled', true).removeClass('edit-active')
    addressII.attr('disabled', true).removeClass('edit-active')
}

function unlockInputs() {
//emailAddress.removeAttr('disabled').addClass('edit-active')
    phoneNumber.removeAttr('disabled').addClass('edit-active')
    addressI.removeAttr('disabled').addClass('edit-active')
    addressII.removeAttr('disabled').addClass('edit-active')
}
editProfileBtn.on('click', (event) => {
    unlockInputs()
})
function unlockForm() {
    saveProfileBtn.removeClass('nullified').removeAttr('disabled')
}

function lockForm() {
    saveProfileBtn.addClass('nullified').attr('disabled', true)
}

if (Object.keys(/*emailAddress.val()&&*/phoneNumber.val()&&addressI.val()&&addressII.val()).length > 0) {
    unlockForm()
}
/*
emailAddress.on('keyup', function () {
     if (Object.keys(emailAddress.val()).length == 0) {
        lockForm()
     } else {
        unlockForm()
    } 
})
*/
phoneNumber.on('keyup', function () {
     if (Object.keys(phoneNumber.val()).length == 0) {
        lockForm()
     } else {
        unlockForm()
    } 
})


addressI.on('keyup', function () {
     if (Object.keys(addressI.val()).length == 0) {
        lockForm()
     } else {
        unlockForm()
    } 
})


addressII.on('keyup', function () {
     if (Object.keys(addressII.val()).length == 0) {
        lockForm()
     } else {
        unlockForm()
    } 
})


phoneNumber.on('blur',() => {lockInputs() })


addressI.on('blur',() => {lockInputs() })


addressII.on('blur',() => {lockInputs() })

profileForm.on('submit', (event) => {
    //emailAddress.removeClass('edit-active').attr('disabled', true)
    phoneNumber.removeClass('edit-active').attr('disabled', true)
    addressI.removeClass('edit-active').attr('disabled', true)
    addressII.removeClass('edit-active').attr('disabled', true)
    event.preventDefault()
    saveProfileBtn.addClass('nullified').attr('disabled', true).html('Saving..')
    setTimeout(() => {
        $.ajax({
        method: 'POST',
        url: '/profile-update',
        data: {
            email: email,
            newemail: emailAddress.val(),
            phone: phoneNumber.val(),
            addressI: addressI.val(),
            addressII: addressII.val(),
        },
        success: (response) => {
            saveProfileBtn.html('Save')
            $('.alert').fadeIn('slow').addClass('greenlight').html('Your profile details have been updated successfully')
           // console.log(response)
            setTimeout(() => {
                $('.alert').fadeOut('fast').removeClass('greenlight')
                setTimeout(() => {
                    $('.alert').removeClass('greenlight')
                }, 1000);
            }, 3000);
        },
        error: (response) => {
            saveProfileBtn.html('Save')
            $('.alert').fadeIn('fast').html(response.responseText)
            //console.log(response)
            setTimeout(() => {
                $('.alert').fadeOut('fast')
            }, 3000);
            }
        })
    }, 3000);
})
var editEmail = $('.change-email'),
    submitEmail = $('.submit-email'),
    emailModal = $('.email-update-modal'),
    closeModal = $('.close-email-modal'),
    newEmail = $('.newemail'),
    emailUpdateForm = $('.email-update-form'),
    editPwd = $('.change-password');

function openEmailModal() {
    emailModal.removeClass('force-fade-out').fadeIn('fast')
    $('body').css('overflow', 'hidden')
    $('.main-dashboard, .main-dashboard div').css('overflow', 'hidden')
}

function closeEmailModal() {
    emailModal.fadeOut('fast').addClass('force-fade-out')
    newEmail.val('')
}

editEmail.on('click', () => {
    openEmailModal()
    lockInputs()
    emailModal.find('span').html(' email address?')
})

closeModal.on('click', () => {
    closeEmailModal()
})

editPwd.on('click', () => {
    openEmailModal()
    lockInputs()
    emailModal.find('span').html(' password')
})

var proceedEmailUpdate = $('.proceed-email-update'),
    cancelEmailUpdate = $('.cancel-email-update');

cancelEmailUpdate.on('click', () => {
    closeEmailModal()
})

//const loading;
var loading,
    changeType = emailModal.find('span')
proceedEmailUpdate.on('click', () => {
    proceedEmailUpdate.addClass('nullified').attr('disabled', true)
    loading = true;
    cancelEmailUpdate.addClass('nullified').attr('disabled', true)
    closeModal.addClass('nullified').attr('disabled', true)
    setTimeout(() => {
        if (changeType.text() == ' password') {
            window.location.href = '/change-password'   
        } else {
            window.location.href = '/email-update'
        }
        closeEmailModal()
    }, 2000);
})

//close modal on outside event click
function checkIfFormIsLoading() {
    if (loading !== true) {
        closeEmailModal()
    }
}
