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
                            return ('<br><a href="' + value + '">' + value + '</a><br>');
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