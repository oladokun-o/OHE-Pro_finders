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

    $(document).on("click", function(event) {
        var $trigger = $(".chat-search-form");
        if ($trigger !== event.target && !$trigger.has(event.target).length) {
            $('.chat-reply-contn').fadeOut("fast");
        }
    });

var chatQuestion = $('.chat-info'),
    chatType = $('.agent-type'),
    chatAgentNeeded = $('.chat-reply-contn'),
    clearAgentNeeded = $('.agent-type i'),
    startChatBtn = $('.start-chat-btn'),
    clearStartChatForm = $('.clear-start-chat-form');

chatAgentNeeded.on('click', function (e) {
    if (chatQuestion.hasClass('chat-info-filled')) {
        validateStartChatBtn()
    }
    let chatAgentNeededOpt = e.target.textContent;
    chatType.fadeIn('slow').removeClass('fade-out')
    $('.agent-type-opt').val(chatAgentNeededOpt)
    $('.chat-search-form input,.chat-search-form > .filter-icon button').addClass('nullified').attr('disabled',true)
});
clearAgentNeeded.on('click', function () {
    unvalidateStartChatBtn()
    chatType.fadeOut('slow').addClass('fade-out')
    setTimeout(() => {
        $('.agent-type-opt').val('');
    }, 1500);
    $('.chat-search-form input,.chat-search-form > .filter-icon button').removeClass('nullified').removeAttr('disabled')
})
function validateStartChatBox() {
    chatQuestion.addClass('chat-info-filled')
    if (chatType.hasClass('fade-out')) {
        unvalidateStartChatBtn()
    } else (
        validateStartChatBtn()
    )
}
function unvalidateStartChatBox() {
    chatQuestion.removeClass('chat-info-filled')
}
function validateStartChatBtn() {
    startChatBtn.removeClass('nullified').removeAttr('disabled')
}
function unvalidateStartChatBtn() {
    startChatBtn.addClass('nullified').attr('disabled',true)
}
if (Object.keys(chatQuestion.val()).length !== 0) {
        validateStartChatBox()
}
chatQuestion.on('keyup', function () {
     if (Object.keys(chatQuestion.val()).length == 0) {
         unvalidateStartChatBox()
         unvalidateStartChatBtn()
     } else {
        validateStartChatBox()
    } 
})
chatQuestion.on('blur', function () {
   if (Object.keys(chatQuestion.val()).length == 0) {
       unvalidateStartChatBox()
       unvalidateStartChatBtn()
}
})
function clearChatForm() {
    $('.search').val('')
    unvalidateStartChatBox()
    unvalidateStartChatBtn()
    chatType.fadeOut('slow').addClass('fade-out')
    setTimeout(() => {
        $('.agent-type-opt').val('');
        chatQuestion.val('')
    }, 2000);
    $('.chat-search-form input,.chat-search-form > .filter-icon button').removeClass('nullified').removeAttr('disabled')
}
clearStartChatForm.on('click', function () {
    clearChatForm()
})
var chatHeader = $('.chat-header'),
    chatBody = $('.chat-list'),
    chatFooter = $('.chat-footer');
function startChat() {
    chatInitiatorBox.fadeOut('slow')
    setTimeout(() => {
        chatHeader.fadeIn('slow').removeClass('fade-out')
    chatBody.fadeIn('slow').removeClass('fade-out')
    chatFooter.fadeIn('slow').removeClass('fade-out')
    }, 1000);
}
function endChat() {
    chatHeader.fadeOut('slow').addClass('fade-out')
    chatBody.fadeOut('slow').addClass('fade-out')
    chatFooter.fadeOut('slow').addClass('fade-out')
    $('.chat-loader').fadeOut('fast')
    setTimeout(() => {
        chatInitiatorContent.animate({
            opacity: '1'
        })
        chatInitiatorBox.fadeIn('slow')
        chatInitiatorContent.fadeIn('slow')
    }, 1000);
}
var startChatForm = $('.start-chat-form'),
    agentSelected = $('.agent-type-opt'),
    chatInitiatorContent = $('.chat-initiator-content'),
    chatInitiatorBox = $('.chat-initiator');
    //console.log(userId)

startChatForm.on('submit', function (e) {
    e.preventDefault()
    let message = chatQuestion.val(),
        Fname = firstname;
    chatInitiatorContent.animate({
        opacity: '0.5'
    })
    chatInitiatorContent.fadeOut('slow')
    setTimeout(() => {
        clearChatForm()
        chatInitiatorBox.fadeIn('slow').append('<div class="chat-loader"><i class="fa fa-spinner fa-spin"></i></div>')
    }, 1500);
   setTimeout(() => {
        $.ajax({
        //contentType: "application/json",
        method: 'POST',
        url: '/room/initiate',
        data: {
            _id: userId,
            userIds: userId,
            type: 'consumer-to-support',
            firstname: firstname,
            lastname: lastname,
            email: email,
            agentType: agentSelected.val(),
            clientQuestion: chatQuestion.val()
        },
        success: function (response) {
            startChat()
            showMessage(message,Fname)
            //console.log(response)
        },
        error: function (response) {
            $('.alert').removeClass('fade-out')
            $('.alert').fadeIn('slow')
            if (response.responseJSON.errtype == 'roomerr') {
                $('.alert').html(response.responseJSON.message)
                $('.chat-loader').fadeOut('fast')
                $('.chat-session-btns').removeClass('fade-out').fadeIn('fast')
            } else {
                $('.alert').html(response.responseJSON.message)
                endChat()
            setTimeout(() => {
                $('.alert').fadeOut('slow')
            }, 3000);
            }
        }
    })
   }, 3000);
})
var dashAgentNeeded = $('.reply-contn'),
    chatSearchInput = $('.chat-search-form input'),
    searchFormInput = $('.search-form input');
dashAgentNeeded.on('click', function (e) {
    let dashAgentNeededOpt = e.target.textContent,
        searchFormVal = searchFormInput.val();
    goTo(e)
    chatSearchInput.val(searchFormVal);
    chatType.fadeIn('slow').removeClass('fade-out')
    $('.agent-type-opt').val(dashAgentNeededOpt)
    $('.chat-search-form input,.chat-search-form > .filter-icon button').addClass('nullified').attr('disabled',true)
});

//handle chat session 
var resumeChatBtn = $('.-resume-chat'),
    initiateChatBtn = $('.-start-chat');
//get previous oonvos and resume chat if it is still available
resumeChatBtn.on('click', function () {
    if ($('.chat-sessions-btns').hasClass('fade-out')) {
        console.log(20000)
    } else {
        console.log(25000)
    }
})