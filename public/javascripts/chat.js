
//chat ui
var muterBtn = $('.muter'),
    muterIcon = $('.muter-icon'),
    //unmuterIcon = $('.unmuter-icon'),
    muterText = $('.muter-text'),
    chatOption = $('.chat-options'),
    chatOptionBtn = $('.dot-menu button'),
    sendEmoji = $('.send-emoji'),
    emojiBox = $('.emoji-box'),
    closeEmojiBox = $('.close-emoji-box'),
    chatForm = $('.chat-form'),
    sendChat = $('.send-chat'),
    chatBox = $('.chat-box'),
    chatList = $('.chat-list')
muterBtn.on('click',function () {
    if (muterIcon.hasClass('lni-volume-mute')) {
        muterIcon.removeClass('lni-volume-mute')
        muterIcon.addClass('lni-volume-medium')
        muterText.html('Unmute chat')
    } else{
        muterIcon.addClass('lni-volume-mute')
        muterIcon.removeClass('lni-volume-medium')
        muterText.html('Mute chat')
    }
})
chatOptionBtn.on('click', function () {
    if (chatOption.hasClass('fade-out')) {
        //chatOption.fadeIn('fast')
        chatOption.removeClass('fade-out')
    } else {
        //chatOption.fadeOut('fast')
        chatOption.addClass('fade-out')
    }
})
$(document).on("click", function(event) {
    var $trigger = chatOptionBtn;
    if ($trigger !== event.target && !$trigger.has(event.target).length) {
        chatOption.addClass('fade-out')
    }
});
$(".bubbleWrapper").hover(function() {
    let hoverText = $(this).find('span').text();
    $(this).css('cursor','default').attr('title', hoverText);
}, function() {
    $(this).css('cursor','auto');
});
function closeEmojiContn(){
    emojiBox.addClass('closed')
    emojiBox.animate({
        height: '0'
    })
    //closeEmojiBox.addClass('fade-out')
        closeEmojiBox.hide('fast')
}
closeEmojiBox.hide()
sendEmoji.on('click', function(){
    if (emojiBox.hasClass('closed')) {
        emojiBox.removeClass('closed')
        emojiBox.animate({
            height: '300'
        })
        setTimeout(() => {
            closeEmojiBox.show('slow')  
        }, 200);
    } else{
        closeEmojiContn()
    }
})
closeEmojiBox.on('click', function(){
    closeEmojiContn()
})

var sendAttachment = $(".send-attachment"),
    attachmentBox = $('.attachment-opt'),
    attachments = $('.attachments')

sendAttachment.on('click', function(){
    closeEmojiContn()
    if (attachments.hasClass('attachments-slide-right')) {
        //attacchments.addClass('slide-in-right')
        sendAttachment.addClass('active-send-btn')
        attachmentBox.removeClass('attachments-slide-right')
       // attachments.removeClass('slide-out-right')
        setTimeout(() => {
            $('.attachment-one').toggleClass('slide-in-right')
            $('.attachment-one').removeClass('slide-out-right')
            //$('.attachment-one').removeClass('attachments-slide-right')
        }, 100);
        setTimeout(() => {
            $('.attachment-two').toggleClass('slide-in-right')
            $('.attachment-two').removeClass('slide-out-right')
        }, 200);
        setTimeout(() => {
            $('.attachment-three').toggleClass('slide-in-right')
            $('.attachment-three').removeClass('slide-out-right')
        }, 300);
    } else {
       closeattachmentbox()
    }       
})  
function closeattachmentbox() {
    attachmentBox.addClass('attachments-slide-right')
    sendAttachment.removeClass('active-send-btn')
    //attachments.addClass('slide-out-right')
    setTimeout(() => {
        $('.attachment-one').addClass('slide-out-right')
        $('.attachment-one').removeClass('slide-in-right')
        //$('.attachment-one').removeClass('attachments-slide-right')
    }, 100);
    setTimeout(() => {
        $('.attachment-two').addClass('slide-out-right')
        $('.attachment-two').removeClass('slide-in-right')
    }, 200);
    setTimeout(() => {
        $('.attachment-three').addClass('slide-out-right')
        $('.attachment-three').removeClass('slide-in-right')
    }, 300);
} 
$(document).on("click", function(event) {
    var $trigger = sendAttachment;
    if ($trigger !== event.target && !$trigger.has(event.target).length) {
        closeattachmentbox()
    }
});

var chatDay = new Date(),
    msgStat = $('.msg-stat');

chatForm.on('submit',function(e){
    e.preventDefault()
    let message = chatBox.val(),
        Fname = firstname;
    showMessage(message,Fname)
    if (chatBox.val().length > 1) {
        $.ajax({
            method: 'POST',
            url: '/client-message',
            data: {
                subject: message
            },
            success: function(res){
                console.log(res)
                msgStat.addClass('sent')
            },
            error: function(res){
                console.log(res)
            }
        })
    }
})

function showMessage(message,Fname){
    chatList.append(
        '<li class="bubbleWrapper"><div class="inlineContainer client"><div class="clientBubble chat-bubble">'+' '+ message +' '+'</div></div><div class="client-chat-name">'+Fname+'<span class="client-chat-time">'+chatDay.getHours()+':'+chatDay.getMinutes()+'</span></div></li>'
        )
}
