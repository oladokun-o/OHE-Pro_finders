$(document).ready(function(e) {
    //e.preventDefault()
    var select = $('.select-list')
    $.ajax({
        method: 'POST',
        url: '/jobs',
        data: {
            subject: 'A',
            type: 'default'
        },
        success: function(response) {                              
                var joblist = response.map((o) => (
                    o.job
                ))
                const jobCollection = [].concat(...joblist)
                //console.log(jobCollection)
                var jobshtml = $.map(jobCollection, function (value) {
                    return ('<option value="' + value + '">' + value + '</option>');
                })
            select.append(jobshtml.join(''))
            //console.log(response)
        },
        error: function(response) {
                select.append('<option></option>')
        }
    })
})

var jobLists = $('.job-li li')
jobLists.on('click', (e) => {
    if (e.target.classList.contains('show')) {
        //console.log('yeass')
        //console.log(e.target)
        var chev = e.target.lastChild,
            i = document.createElement('i')
        i.classList.add('lni')
        i.classList.add('lni-chevron-right')
        chev.replaceWith(i)
        e.target.classList.remove('active-job-li')
        e.target.classList.remove('show')
        e.target.nextSibling.remove()
    } else {
        let req = e.target.innerText;
        //console.log(req)
        if (req !== '') {
            e.target.classList.add('active-job-li')
            var chev = e.target.lastChild,
                i = document.createElement('i')
            i.classList.add('lni')
            i.classList.add('lni-chevron-down')
            chev.replaceWith(i)
            //console.log(chev)
            $.ajax({
                method: 'POST',
                url: '/jobs',
                data: {
                    subject: req,
                    type: 'undefault'
                },
                success: function(response) {                              
                        var joblist = response.map((o) => (
                            o.job
                        ))
                        const jobCollection = [].concat(...joblist)
                        //console.log(jobCollection)
                        var jobshtml = $.map(jobCollection, function (value) {
                            return ('<button onClick="jobAnchor(this)">' + value + '</button><br>');
                        })
                    var list = jobshtml.join('');
                    var listSpan = $('<span class="job-span-list show">' + list + '</span>');
                    e.target.classList.add('show')
                    listSpan.insertAfter(e.target).fadeIn('slow')
                    //console.log(response)
                },
                error: function(response) {
                        $('span').insertAfter(e.target)
                }
            })
        }
    }
})


function jobAnchor(event) {
    var e = event,
        eDescriptionContn = $('<p class="p-2"></p>'),
        req = e.innerText,
        eDescriptionBtn = $('<br><button class="primary-btn desc-btn mt-2 text-center">Chat</button>');
        //localStorage.setItem('descriptionId', req)
    if (e.classList.contains('show')) {
        //console.log('event still showing, now removing class "show"')
        e.classList.remove('show')
        e.nextSibling.remove()
    } else {
        //closeDesc(e)
        //console.log('now showing event')
        e.classList.add('show')
        $.ajax({
                method: 'POST',
                url: '/jobs',
                data: {
                    subject: req,
                    type: 'description'
                },
            success: function (response) {
                    //console.log(response)
                    var jobDescriptionResponse = response.map((o) => (
                            o.description
                        ))
                        const jobDescription = [].concat(...jobDescriptionResponse)
                        //console.log(jobCollection)
                        var jobDescHtml = $.map(jobDescription, function (value) {
                            return (value);
                        })
                    var description = jobDescHtml.join('');
                eDescriptionContn.append(description)
                eDescriptionContn.append(eDescriptionBtn)
                    eDescriptionContn.insertAfter(e).slideDown('slow')          
                },
                error: function(response) {
                    eDescriptionContn.append('No result')
                    eDescriptionContn.insertAfter(e).slideDown('slow')  
                }
            })
        //console.log(eDescriptionContn)
    }
}

/*
function closeDesc(e) {
    var eve = localStorage.getItem('descriptionId')
    $(document).on('click', (event) => {
        if (eve !== event.target.innerText) {
            e.nextSibling.remove()
        } else {
            console.log('hell yeah')
        }
    })
}*/