jQuery(function() { 
    $.ajax({
        method: "POST",
        url: "/expatriates-list",
        data: {
            job: 'all'
        }
    })
    .done(function( response ) {
        let expList = response.map((o) => (
            o.job
        ))
        const expCollection = [].concat(...expList)
        //console.log(expCollection)
        let expHtml = $.map(expCollection, function (value) {
            return ('<li onclick="getDescription(this)"><a title="get job description">' + value + '</a><div class="content true d-block d-md-none"></div></li>');
        })
        let list = expHtml.join('');
        $('.exp-list').append(list)
    });
})

const getDescription = function(elem) {
    let jobReq = $(elem).find('a').html().trim(),
        jobRes = localStorage.getItem('expert_job'),
        smExp = $(elem).find('.content');
        //console.log(jobRes, jobReq)
    function request() {
        $.ajax({
            method: "POST",
            url: "/expatriates-description",
            data: {
                job: jobReq,
            }
        })
        .done(function( response ) {
            let description = response;        
            $('.exp-content').fadeIn('slow').addClass('scale-up-center').removeClass('scale-out-center').fadeIn('slow').html('<div class="exp-type">'+jobReq+' :</div>'+description[0].description+'<div class="text-right"><button class="primary-btn" onclick="chatExp(this)">chat</button></div>')
            $('.exp-content').append('<button class="close-exp-btn" onclick="closeExpLg()"><i class="fa fa-times"></i></button>')
            $(elem).addClass('active-li')
            $(elem).find('.content').fadeIn('slow').append(description[0].description+'<div class="text-right"><button class="primary-btn" onclick="chatExp(this)">chat</button></div>')
            setTimeout(() => {
                $(elem).find('button').fadeIn('slow').addClass('move')
                $('.exp-content').find('button').fadeIn('slow').addClass('move')
            }, 120);
            smExp.removeClass('true')
        });
        localStorage.setItem('expert_job', jobReq)
        $(elem).addClass('active-exp')
    }

    if ($('.exp-content').hasClass('true')) {        
        openExpLg()
        //console.log(1)
        request() 
    } else if (!$('.exp-content').hasClass('true') && jobRes == jobReq) {
        closeExpLg()
        $('.content').fadeOut('fast').html('')
        //console.log(2)
    } else if (jobRes !== jobReq){
        $('.content').fadeOut('fast').html('')
        $('body').find('li').removeClass('active-exp active-li')
        request()
        //console.log(3)
    } 
},
chatExp = function(elem) {
    getExpert()
},
closeExpLg= function() {
    $('.exp-content').addClass('true scale-out-center')
    $('body').find('li').removeClass('active-exp active-li')
},
openExpLg = function() {
    $('.exp-content').removeClass('true scale-out-center')
}