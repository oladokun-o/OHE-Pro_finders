/*
var notice = ['hello there oladokun','welcome to ohe','you have a new message'],
    notification = $('.notifications'),
    noticeDate = '1 day ago',
    ringer = $('.ringer'),
    noticeChildren = $('.msgs');
var noticeMsgs = $.map(notice,function (value) {
    //value.toUpperCase
    return('<div class="notice msgs unread container-fluid"><div class="row"><div class="col-12 text-left pl-2 pr-2 pt-0 pb-0">'+value+'</div><div class="col-12 pl-2 pr-2 pt-0 pb-0 text-muted notice-date text-left">'+noticeDate+'<a class="mark-read" title="mark read"><i class="lni lni-checkmark marker"></i></a></div></div></div>');
})
function noticeState(){
$('.notifications .notice').on("click", function(event) {
    //console.log(event)
    console.log(event.target.nextSibling.lastChild.insertBefore)
    //event.target.classList.remove('unread')
    //event.target.classList.add('read')
    if(event.target.classList.contains('notice-date')){
       // console.log('yes')
        event.currentTarget.classList.remove('unread')
        event.currentTarget.classList.add('read')
    } else{
        event.currentTarget.classList.remove('unread')
        event.currentTarget.classList.add('read')
    }
    event.target.nextSibling.lastChild.classList.add('read');
    event.target.nextSibling.lastChild.childNodes.classList.remove('lni-checkmark')
    event.target.nextSibling.lastChild.childNodes.classList.add('lni-checkmark-circle')
    //mark.addClass('read')
}
)}
function bellState(){
    if (notification.children) {
        console.log('yass')
    }
}
//notification.html(jobshtml.join(''))
    if (notice == '' || undefined) {    
        let notice = 'No new notifications'
        notification.html('<div class="notice">'+notice+'</div>')
    } else {
        ringer.addClass('bell')
        notification.html(noticeMsgs.join(''))
        noticeState()
       // bellState()
    }
*/