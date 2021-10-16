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
        jobRes = localStorage.getItem('expatriate'),
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
            $('.exp-content').fadeIn('slow').html(description[0].description+'<div class="text-right"><button class="primary-btn" onclick="chatExp(this)">chat</button></div>')
            $(elem).find('.content').fadeIn('slow').append(description[0].description+'<div class="text-right"><button class="primary-btn" onclick="chatExp(this)">chat</button></div>')
            setTimeout(() => {
                $(elem).find('button').fadeIn('slow').addClass('move')
                $('.exp-content').find('button').fadeIn('slow').addClass('move')
            }, 120);
            smExp.removeClass('true')
        });
        localStorage.setItem('expatriate', jobReq)
        $(elem).addClass('active-exp')
    }

    if ($('.exp-content').hasClass('true')) {        
        $('.exp-content').removeClass('true')
        console.log(1)
        request() 
    } else if (!$('.exp-content').hasClass('true') && jobRes == jobReq) {
        $('.exp-content').html('').addClass('true')
        $('.content').fadeOut('fast').html('')
        $('body').find('li').removeClass('active-exp')
        console.log(2)
    } else if (jobRes !== jobReq){
        $('.content').fadeOut('fast').html('')
        $('body').find('li').removeClass('active-exp')
        request()
        console.log(3)
    } 
},
chatExp = function(elem) {
    alert(localStorage.getItem('expatriate'))
}