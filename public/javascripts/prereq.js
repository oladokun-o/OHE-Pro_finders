$(document).ready(function() {
    let url = location.search;
    if (url.includes('tsmb')) {
        sessionStorage.setItem('tsmb', 'true')
    } else {
        sessionStorage.setItem('tsmb', 'false')
    }
    
let signStat = sessionStorage.getItem('signup');
var msg1 = '<br> You can go ahead to make payment for <b>TSMB</b> via the dashboard after <a href="/signup">signing up</a>.',
    msg2 = '',
    stat = sessionStorage.getItem('tsmb');
if (stat == 'true') {
    statmsg = msg1;
    console.log('a')
} else {
    statmsg = msg2;
    console.log('b')
}
if (signStat == 'false') {
    setTimeout(()=>{
        alertBox.fadeIn('fast').html('<i class="fa fa-bell"></i> <span class="font-bold text-uppercase">GENERAL NOTICE</span> <i class="fa fa-bell"></i><br>Oprofinder will be launching on the 10th of Janauary, 2022.'+statmsg+' <i onclick="closeExpAlert()" class="fa close-alert fa-times"></i>')    
        alertContn.addClass('overflowed')
    }, 2000)    
    console.log('1')
} else if (signStat == undefined) {
    sessionStorage.setItem('signup', 'false')
    setTimeout(()=>{
        alertBox.fadeIn('fast').html('<i class="fa fa-bell"></i> <span class="font-bold text-uppercase">GENERAL NOTICE</span> <i class="fa fa-bell"></i><br>Oprofinder will be launching on the 10th of Janauary, 2022.'+statmsg+' <i onclick="closeExpAlert()" class="fa close-alert fa-times"></i>')    
        alertContn.addClass('overflowed')
    }, 2000)
    console.log('2')
} else {
    setTimeout(()=>{
        alertBox.fadeIn('fast').html('<i class="fa fa-bell"></i> <span class="font-bold text-uppercase">GENERAL NOTICE</span> <i class="fa fa-bell"></i><br>Oprofinder will be launching on the 10th of Janauary, 2022. <i onclick="closeExpAlert()" class="fa close-alert fa-times"></i>')    
        alertContn.addClass('overflowed')
    }, 2000)
    console.log('3')
}
    function dateTime() {
        var format = "";
        var ndate = new Date();
        var hr = ndate.getHours();
        var h = hr % 12;

        if (hr < 12) {
            greet = 'Good Morning';
            format = 'AM';
            stat = '<i class="fa fa-sun sunny"></i>';
        } else if (hr >= 12 && hr <= 17) {
            greet = 'Good Afternoon';
            format = 'PM';
            stat = '<i class="fa fa-sun sunny"></i>';
        } else if (hr >= 17 && hr <= 24) {
            greet = 'Good evening';
            format = 'PM';
            stat = '<i class="fa fa-moon dark"></i>';
        }

        var m = ndate.getMinutes().toString();
        var s = ndate.getSeconds().toString();

        if (h < 12) {
            h = h;
            $("h3.day-message").html(greet);
        } else if (h < 18) {
            $("h3.day-message").html(greet);
        } else {
            $("h3.day-message").html(greet);
        }

        if (s < 10) {
            s = "0" + s;
        }

        if (m < 10) {
            m = "0" + m;
        }

        $('.clock').html(h + ' ' + ":" + ' ' + m + ' ' + ":" + ' ' + s + ' ' + format);
        $('.sub-welcome-text').html(greet + ' ' + stat + ' ')
        $('.sub-sub-welcome-text').html('Welcome back.')
    }
    setInterval(dateTime, 1000);
});
var burger = $('.hamburger');
var menuToggle = document.querySelector('[data-js="menu-toggle"]');
var HiddenPanel = document.getElementById("HiddenPanel");
var alertContn = $('.alert-contn'),
    exp = localStorage.getItem('expert_job') || exp;
menuToggle.addEventListener('click', function() {
    alertContn.removeClass('overflowed')
    document.body.classList.toggle('panel-open');
    menuToggle.classList.toggle('open');
    CloseMenu.classList.remove('hide');
    HiddenPanel.classList.add('slide-in-right');
    HiddenPanel.classList.remove('slide-out-right');
    burger.toggleClass("is-active");
    closeEmailModal()
});

var closePanel = document.querySelector('[data-js="hidden-panel-close"]');
var CloseMenu = document.getElementById("CloseMenu");

closePanel.addEventListener('click', function() {
    if (!exp) {
        alertContn.addClass('overflowed')
    }
    document.body.classList.remove('panel-open');
    menuToggle.classList.remove('open');
    CloseMenu.classList.add('hide');
    HiddenPanel.classList.remove('slide-in-right');
    HiddenPanel.classList.add('slide-out-right');
    burger.toggleClass("is-active");

});

function Closemypanel() {
    if (!exp) {
        alertContn.addClass('overflowed')
    }
    menuToggle.classList.remove('open');
    CloseMenu.classList.add('hide');
    HiddenPanel.classList.remove('slide-in-right');
    HiddenPanel.classList.add('slide-out-right');

    document.body.classList.remove('panel-open');
    burger.toggleClass("is-active");

}

function Closepanelfornav() {
    menuToggle.classList.remove('open');
    CloseMenu.classList.add('hide');
    HiddenPanel.classList.remove('slide-in-right');
    HiddenPanel.classList.add('slide-out-right');

    document.body.classList.remove('panel-open');
    burger.removeClass("is-active");

}
/*
var $loginForm = $(".form-signin"),
    $login_text_fields = $loginForm.find("input[type='text']");

$(".form-container").removeClass("off-canvas");

$loginForm.validate({
    errorElement: "span",
    success: function(label) {
        _form_success_aria(label);
    },
    invalidHandler: function(event, validator) {
        _form_error_aria(event);
    }
});

function _form_success_aria(label) {
    var target = label.parent().find("input");
    target.attr("aria-invalid", "false");
}

function _form_error_aria(validator) {
    console.log(validator.target.elements[0]);
}
*/
function showPassword() {
    var x = document.getElementById("password");
    var openEye = document.getElementById("Eye");
    if (x.type === "password") {
        x.type = "text";
        openEye.classList.add("fa-eye-slash");
    } else {
        x.type = "password";
        openEye.classList.remove("fa-eye-slash");
        openEye.classList.add("fa-eye");
    }
}
/*
document.getElementById('formsigin').onsubmit = () => {
    var name = document.getElementById('Email').value;
    localStorage.setItem('Email', name);

    var email = document.getElementById('Email').value;
    var password = document.getElementById('password').value;

    if (password == 'dashboard') {
        alert('Welcome ' + email);
        location.href = "dashboard";
    } else if (password !== 'dashboard') {
        alert('wrong password');
    }
    return false;

}*/

let date_ob = new Date();

// current date
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var day = days[date_ob.getDay()];
// current month
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var month = months[date_ob.getMonth()];

// current year
let year = date_ob.getFullYear();

// prints date in YYYY-MM-DD format
$('.date').html(day + ", " + month + ' ' + year);


var innerBurger = $('.hamburger-inner');

(function() {
    if (localStorage.getItem('theme') === 'theme-dark') {
        innerBurger.addClass('nightburger');
        innerBurger.removeClass('dayburger');
        innerBurger.html(
            '<style>.hamburger-inner::after,.hamburger-inner::before{background:white !important;}</style>'
        )
    } else {
        innerBurger.removeClass('nightburger');
        innerBurger.addClass('dayburger');
        innerBurger.html(
            '<style>.hamburger-inner::after,.hamburger-inner::before{background:white !important;}</style>'
        )
    }
})();
//
//search animation: 
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 1000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};
$('#search').on('focus', function() {
    $('.typewrite').fadeOut('fast')
    closeFilterlist()
    $('#selector').fadeIn('fast')
})
var SearchDb = $('#search')

SearchDb.on('blur', function() {
    $('#selector').fadeOut('fast')
    if (!$(this).val()) {
        $('.typewrite').fadeIn('slow')
    }
})

var db = {
    "01": ["electrician", "Electrician engineering Engineering repair Repair"],
    "02": ["plumber", "Plumber engineering Engineering repair Repair"],
    "03": ["carpenter", "Carpenter engineering Engineering repair Repair Construction construction"],
    '04': ['doctor', 'Doctor Medic medic Medical Health'],
    '05': ['lawyer', 'Lawyer court Court Law law']
}

function searchDB(elem) {
    let selector = document.getElementById("selector");

    // Check if input is empty
    if (elem.value.trim() !== "") {
        elem.classList.add("dropdown");
        // Add dropdown class (for the CSS border-radius)
        // If the selector div element does not exist, create it
        if (selector == null) {
            selector = document.createElement("div");
            selector.id = "selector";
            elem.parentNode.appendChild(selector);
            // Position it below the input element
            selector.style.left = elem.getBoundingClientRect().left + "px";
            selector.style.top = elem.getBoundingClientRect().bottom + "px";
            selector.style.width = elem.getBoundingClientRect().width + "px";
        }
        // Clear everything before new search
        selector.innerHTML = "";
        // Variable if result is empty
        let empty = true;
        for (let item in db) {
            // Join the db elements in one string
            let str = [item, db[item][0], db[item][1]].join();
            // If exists, create an item (button)

            if (str.indexOf(elem.value) !== -1) {
                let opt = document.createElement("button");
                opt.setAttribute("onclick", "insertValue(this);")
                opt.innerHTML = db[item][0];
                selector.appendChild(opt);
                empty = false;
            }
        }
        // If result is empty, display a disabled button with text
    }
    // Remove selector element if input is empty
    else {
        if (selector !== null) {
            selector.parentNode.removeChild(selector);
            elem.classList.remove("dropdown");
        }
    }

}

function insertValue(elem) {
    window.search.classList.remove("dropdown");
    window.search.value = elem.innerHTML;
    elem.parentNode.parentNode.removeChild(elem.parentNode);
    let searchUrl = $("#search").val();
    $('#selector > button').click(window.location.href = '/' + searchUrl);
}

$('.proceed-updates').on('click', function() {
    $('.proceed-updates').html('<i class="lni lni-chevron-up"></i>')
    $('.updates-form-child').fadeIn('slow');
})
$('#close-updates-form-child').on('click', function closeUpdatesForm() {
    $('.updates-form-child').fadeOut('slow');
    $('.proceed-updates').html('<i class="lni lni-chevron-right"></i>')
    $('.get-update-form').each(function() {
        this.reset();
    })
    $('.send-updates').removeAttr("disabled")
    $('.send-updates').removeClass('nullified')
})

function checkUpdatesBtnStat() {
    if ($('.getUpdates').prop('checked') == false) {
        nullifygetupdatesbtn()
    } else if ($('.getUpdates:checked')) {
        Unnullifygetupdatesbtn()
    }
}

function nullifygetupdatesbtn() {
    $('.send-updates').attr("disabled", true)
    $('.send-updates').addClass('nullified')
}

function Unnullifygetupdatesbtn() {
    $('.send-updates').removeAttr("disabled")
    $('.send-updates').removeClass('nullified')
}
    // check passwords

$('#pass2').on('keyup', function() {
    var pass = $('#pass').val();
    var pass2 = $('#pass2').val();
    if (pass != pass2) {
        $('.wrong-login').html('The passwords didn\'t match!');
    } else if (pass = pass2) {
        $('.wrong-login').fadeOut('slow', function() {
            $('.wrong-login').html('');
        })
    }

});

//reset password validator
var pass = $('#pass'),
    letter = $('#letter'),
    capital = $('#capital'),
    number = $('#number'),
    length = $('#length'),
    creativity = $('#creativity');



pass.on('focus', function() {
    $('#message').fadeIn('slow')
})
pass.on('keyup', function() {
    lowercaseconstrc = RegExp(/[a-z]/g);
    var passVal = pass.val();
    if (passVal.match(lowercaseconstrc)) {
        letter.addClass('valid');
        letter.removeClass('invalid');
        $('.letterstat').html('<i class="lni lni-checkmark"></i>')
    } else {
        letter.addClass('invalid');
        letter.removeClass('valid');
        $('.letterstat').html('<i class="lni lni-close"></i>')
    }

    uppercaseconstrc = RegExp(/[A-Z]/g);
    var passVal = pass.val();
    if (passVal.match(uppercaseconstrc)) {
        capital.addClass('valid');
        capital.removeClass('invalid');
        $('.capitalstat').html('<i class="lni lni-checkmark"></i>')
    } else {
        capital.addClass('invalid');
        capital.removeClass('valid');
        $('.capitalstat').html('<i class="lni lni-close"></i>')
    }

    numbersconstr = RegExp(/[0-9]/g);
    var passVal = pass.val();
    if (passVal.match(numbersconstr)) {
        number.addClass('valid');
        number.removeClass('invalid');
        $('.numberstat').html('<i class="lni lni-checkmark"></i>')
    } else {
        number.addClass('invalid');
        number.removeClass('valid');
        $('.numberstat').html('<i class="lni lni-close"></i>')
    }

    if (passVal.length >= 8) {
        length.addClass('valid');
        length.removeClass('invalid');
        $('.lengthstat').html('<i class="lni lni-checkmark"></i>')
    } else {
        length.addClass('invalid');
        length.removeClass('valid');
        $('.lengthstat').html('<i class="lni lni-close"></i>')
    }
    if (passVal.match(lowercaseconstrc) && passVal.match(uppercaseconstrc) && passVal.match(numbersconstr) && passVal.length >= 8) {
        creativity.addClass('valid');
        creativity.removeClass('invalid');
        $('.creativitystat').html('<i class="lni lni-checkmark"></i>')
        $('#message').fadeOut('slow')
    } else {
        creativity.addClass('invalid');
        creativity.removeClass('valid');
        $('.creativitystat').html('<i class="lni lni-close"></i>')
        $('#message').fadeIn('fast')
    }
})

//faqq
var generalBtn = $('.general-btn')
var paymentBtn = $('.payments-btn')
var acctBtn = $('.account-btn')

var general = $('.general')
var payment = $('.payments')
var acct = $('.account')

generalBtn.on('click', function() {
    generalBtn.addClass('active-category-btn')
    paymentBtn.removeClass('active-category-btn')
    acctBtn.removeClass('active-category-btn')
    acct.addClass('hide')
    general.removeClass('hide')
    payment.addClass('hide')
})
paymentBtn.on('click', function() {
    generalBtn.removeClass('active-category-btn')
    paymentBtn.addClass('active-category-btn')
    acctBtn.removeClass('active-category-btn')
    acct.addClass('hide')
    general.addClass('hide')
    payment.removeClass('hide')
})

acctBtn.on('click', function() {
        generalBtn.removeClass('active-category-btn')
        paymentBtn.removeClass('active-category-btn')
        acctBtn.addClass('active-category-btn')
        general.addClass('hide')
        payment.addClass('hide')
        acct.removeClass('hide')
    })
    // faq accordion
function toggleIconplus(e) {
    $(e.target)
        .prev('.panel-heading')
        .find(".more-less")
        .addClass('lni-circle-minus')
        .removeClass('lni-circle-plus')
}

function toggleIconminus(e) {
    $(e.target)
        .prev('.panel-heading')
        .find(".more-less")
        .removeClass('lni-circle-minus')
        .addClass('lni-circle-plus')
}
$('.panel-group').on('hidden.bs.collapse', toggleIconminus);
$('.panel-group').on('shown.bs.collapse', toggleIconplus);

// filter list
$('.filter-icon').on('click', function() {
    if ($('.sm-work').hasClass('fade-out')) {
        openFilterlist()
    } else {
        closeFilterlist()
    }
})
$('.close-icon').on('click', function() {
    closeFilterlist()
})

function closeFilterlist() {
    $('.sm-work').fadeOut('fast')
    $('.sm-work').addClass('fade-out')
    $('.caret').addClass('fa-caret-down')
    $('.caret').removeClass('fa-caret-up')
    $('.reply-contn').removeClass('nullified')
}

function openFilterlist() {
    $('.sm-work').fadeIn('fast')
    $('.sm-work').removeClass('fade-out')
    $('.caret').removeClass('fa-caret-down')
    $('.caret').addClass('fa-caret-up')
    $('.reply-contn').addClass('nullified')
}
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
$(document).ready(function() {
    // Show hide popover
    $(".dropdown-contn").click(function() {
        $(this).find(".dropdown-content").fadeToggle("fast");
    });
});
$(document).on("click", function(event) {
    var $trigger = $(".dropdown-contn");
    if ($trigger !== event.target && !$trigger.has(event.target).length) {
        $(".dropdown-content").fadeOut("fast");
    }
});
//fullscreen
function toggleFullscreen(elem) {
    elem = elem || document.documentElement;
    if (!document.fullscreenElement && !document.mozFullScreenElement &&
        !document.webkitFullscreenElement && !document.msFullscreenElement) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

$('#btnFullscreen').on('click', function() {
    toggleFullscreen();
});

    $('.search-btn2').on('click',function(){
        if ($('.search2').hasClass('dope')) {
            $('.search2').removeClass('dope')
            $('.search2').addClass('search-after')
            $('.search2').focus()
            $('#search-btn-close').removeClass('search-btn2')            
        $('.search-btn2').addClass('search-btn-after')
        setTimeout(() => {
            $('.search-btn-after').attr('type', function(){
                return 'submit'
            })
            $('.search-btn-after').attr('role', function(){
                return 'button'
            })
            
        }, 1000)
        }
            })
    $('#search-btn-close').on('click',function(){
     if (!$('.search2').hasClass('search-w')) {
        $('.search2').removeClass('search-after')
    $('.search-btn2').removeClass('search-btn-after')
    $('.search2').addClass('dope')
    $('#search-btn-close').addClass('search-btn2')
    $('.search-btn2').attr('type', function(){
        return 'button'
    })
    $(".reply-contn").fadeOut("fast");
     }
})

$(document).on("click", function(event) {
    var $trigger = $(".search-form2");
    if ($trigger !== event.target && !$trigger.has(event.target).length) {
       $(".reply-contn").fadeOut("fast");
    }
});

var notification = $('.notifications'),
    noticeBtn = $('.-notice');
    noticeBtn.on('click',function(){
        notification.removeClass('fade-out')
        notification.fadeToggle('fast')
    })

    $(document).on("click", function(event) {
        var $trigger = $(".nav-buttons");
        if ($trigger !== event.target && !$trigger.has(event.target).length) {
            notification.fadeOut("fast");
        }
    });
