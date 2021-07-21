// utils
const makeValidation = require('@withvoid/make-validation')
const bodyParser = require('body-parser');
const router = require('express').Router();
const db = require('../config/index').get(process.env.NODE_ENV);
var fs = require('fs');
var handlebars = require('handlebars');
const transporter = require('../utils/mailer')
router.use(bodyParser.urlencoded({ extended: true }));
const Support = require('../models/support')
//models
const CHAT_ROOM_TYPES = require('../models/ChatRoom')
const ChatRoomModel = require('../models/ChatRoom')
//const ChatMessageModel = require('../models/ChatMessage')
const UserModel = require('../models/user.js')
module.exports = {
  initiate: async (req, res) => {
    try {
      const userIds = [req.body.userIds, req.body.support],
        chatInitiatorId = req.body.userIds,
        chatInitiator = [req.body.firstname + ' ' + req.body.lastname, req.body.email],
        type = req.body.type,
        agentType = req.body.agentType,
        clientMessage = req.body.clientQuestion,
        clientName = req.body.firstname + ' ' + req.body.lastname;
      var IsNew;
      ChatRoomModel.findOne({ chatInitiatorId: chatInitiatorId }, (err, user) => {
        //check if a chatroom initiated by user is in db
        if (user) {
        //set IsNew as false, initiate resume chat function
          IsNew = false;
          console.log('chatroom: '+IsNew)
        //send result back to frontend for error handling
          return res.status(500).json({stat: false,errtype:'roomerr', message:'A chatroom initiated by you is still in session. <br> Do you want to resume chat session or start a new one?'})
        }

        //if there is no chatroom initiated already by user
        //set IsNew as true, initiate start new chat function
        IsNew = true;
        console.log('chatroom: '+IsNew)
        //check for support user acct, (for now there will only an OHE support acct for a Mr Lanre)
        //if something goes wrong or the account doesn't exist do not initiate
        //find acct by id, generate token for authentication, send chat new request as email to Mr Lanre
        Support.findOne({ _id: '60f754e8a1399525406a8852' }, (err, user) => {
          console.log('Finding support user')
        if (user) {
          user.generateChatRoomToken();
          user.save();
          let link = "http://" + req.headers.host + "/reply-client/" + user.setChatRoomToken,
            supportEmail = user.email,
            sendSupportEmailStatCode = '200',
            msg = "OK";
          //pass support email as parameter to sendEmail function
          sendEmail(link, supportEmail)
          console.log('Support user found!, passing as param to email function')
        } else if (err) {
          let link = '500',
            supportEmail = 'An error occured, please try again later';
          //use link and supportemail as error
          sendEmail(link, supportEmail)
          console.log('Stage: Find Support user Error: '+err)
          }
          else if (!user) {
          let link = '404',
            supportEmail = 'No support user found';
          //use link and supportemail as error
          sendEmail(link, supportEmail)
          console.log('Stage: Find Support Error type: support user not found')
          }
        })
        //send new chat request as email to Support User
        function sendEmail(link, supportEmail) {
        console.log('Creating mail doc')
        fs.readFile('./utils/emails/start-chat.html', { encoding: 'utf-8' }, function(err, html) {
        if (err) {
          //console.log(err);
          console.log('Stage: Send mail to support. Error: '+err)
        } else {
          console.log('Compiling email info')
          var template = handlebars.compile(html);
          //console.log(link,supportEmail)
            var replacements = {
              username: clientName,
              message: clientMessage,
              agent: agentType,
              //room: chatRoomId,
              link: link// + '/' + chatRoomId
            };
            var htmlToSend = template(replacements);
            const userData = {
                from: db.SMTP_USER,
                to: supportEmail,
                subject: 'Chat Session Request',
                html: htmlToSend
          }
          let supportStatCode = link;
          
          //pass mail info and stat code as parameters
          console.log('Passing email info as param')
          getUserData(userData,supportStatCode)
        }
        })
      }
      //get mail info and stat code and send mail
      function getUserData(userData,supportStatCode) {
        console.log('Checking email info')
        if (supportStatCode == 404) {
          let statCode = 500,
                msg = 'No support user found';
          startChat(statCode, msg)
          console.log('Error sending mail. No support user found')
        } else {
          console.log('Sending mail')
          transporter.sendMail(userData, function (err, info) {
            if (err) {
              console.log('Stage: Sending mail. Error: '+err);
              let statCode = 500,
                msg = 'Could not send email to support';
              startChat(statCode,msg)
            } else {
              console.log("Successfully sent request as mail to start chat.");
              let statCode = 200,
                msg = "email sent to support";
              startChat(statCode,msg)
            }
          })
        }
        }        
        // create chatroom after all conditions have been passed
        function startChat(statCode, msg) {
          console.log('Creating chatroom')
          if (IsNew == true && statCode == 200) {
            //if it does not exist
            console.log('no chatroom initiated by user found')
            const chatRoom = ChatRoomModel.initiateChat(userIds, type, chatInitiator, chatInitiatorId);
            console.log('new chatroom created')
            return res.status(200).send('Creating A New Chatroom')
          } else if (statCode == 500) {
            console.log(msg)
            return res.status(500).json({ stat: false, errtype: 'mailerr', message: 'An error occured, please try again later' })
          }
        }
      })

      
     
        //console.log(agentType,clientMessage)
      /*const validation = makeValidation(types => ({
        payload: req.body,
        checks: {
          userIds: { 
            type: types.array, 
            options: { unique: true, empty: false, stringOnly: true } 
          },
          type: { type: types.enum, options: { enum: CHAT_ROOM_TYPES } },
        }
      }));
      if (!validation.success) return res.status(400).json({ ...validation, bodyy });
  */  //console.log(req.body)
      //set chatroomid
      /*const chatRoomId = chatRoom.chatRoomId;
      //send request as mail to agent
      if (chatRoom.isNew == true) {
        console.log('yuess')
        Support.findOne({ _id: '60f754e8a1399525406a8852' }, (err, user) => {
        if (user) {
          user.generateChatRoomToken();
          user.save();
          let link = "http://" + req.headers.host + "/reply-client/" + user.resetChatRoomToken,
            supportEmail = user.email,
            sendSupportEmailStatCode = '200',
            msg = "OK";
          sendEmail(link, supportEmail)
        } else {
          let link = '500',
            supportEmail = 'An error occured, please try again later';
          //use link and supportemail as error
          sendEmail(link, supportEmail)
        }
          
      })
      
      function sendEmail(link,supportEmail) {
        fs.readFile('./utils/emails/start-chat.html', { encoding: 'utf-8' }, function(err, html) {
        if (err) {
            console.log(err);
        } else {
          var template = handlebars.compile(html);
          //console.log(link,supportEmail)
            var replacements = {
              username: clientName,
              message: clientMessage,
              agent: agentType,
              room: chatRoomId,
              link: link// + '/' + chatRoomId
            };
            var htmlToSend = template(replacements);
            const userData = {
                from: db.SMTP_USER,
                to: supportEmail,
                subject: 'Chat Session Request',
                html: htmlToSend
          }
          let supportStatCode = link;
          getUserData(userData,supportStatCode)
        }
        })
      }
      function getUserData(userData,supportStatCode) {
        //console.log(supportStatCode)
        if (supportStatCode == 500) {
          let statCode = 500,
                msg = 'No support user found';
              startChat(statCode,msg)
        } else {
          transporter.sendMail(userData, function (err, info) {
            if (err) {
              //console.log(err);
              let statCode = 500,
                msg = 'Could not send email to support';
              startChat(statCode,msg)
            } else {
              //console.log("Successfully sent request to start chat.");
              let statCode = 200,
                msg = "email sent to support";
              startChat(statCode,msg)
            }
          })
        }
        }
      } else {
        let statCode = 301,
          msg = 'roomerr';
        startChat(statCode,msg)
      }
      //console.log(chatRoomId)
      //check if chatroom exists
      function startChat(statCode,msg) {
        if (chatRoom.isNew == true && statCode == 200) {
        //if it does not exist
        return res.status(200).send(chatRoom.message)
        } else if (statCode == 500) {
          console.log(msg)
          return res.status(500).json({stat: false,errtype: 'mailerr', message:'An error occured, please try again later'})
        } else if (msg == 'roomerr' || statCode == 301){
        //if it does
      return res.status(500).json({stat: false,errtype:'roomerr', message:'A chatroom initiated by you is still in session. <br> Do you want to resume chat session or start a new one?'})
    }
      }*/
    } catch (error) {
      console.log(error)
      return res.status(500).json({stat: false,errtype:'mailerr',message:'An error occured, please try again'})
    }
    },
    /*postMessage: async(req, res) => {
      try {
        const { roomId } = req.params;
        const validation = makeValidation(types => ({
          payload: req.body,
          checks: {
            messageText: { type: types.string },
          }
        }));
        if (!validation.success) return res.status(400).json({ ...validation });
    
        const messagePayload = {
          messageText: req.body.messageText,
        };
        const currentLoggedUser = req.userId;
        const post = await ChatMessageModel.createPostInChatRoom(roomId, messagePayload, currentLoggedUser);
        global.io.sockets.in(roomId).emit('new message', { message: post });
        return res.status(200).json({ success: true, post });
      } catch (error) {
        return res.status(500).json({ success: false, error: error })
      }
    },
    getRecentConversation: async(req, res) => {},
    getConversationByRoomId: async(req, res) => {
      try {
        const { roomId } = req.params;
        const room = await ChatRoomModel.getChatRoomByRoomId(roomId)
        if (!room) {
          return res.status(400).json({
            success: false,
            message: 'No room exists for this id',
          })
        }
        const users = await UserModel.getUserByIds(room.userIds);
        const options = {
          page: parseInt(req.query.page) || 0,
          limit: parseInt(req.query.limit) || 10,
        };
        const conversation = await ChatMessageModel.getConversationByRoomId(roomId, options);
        return res.status(200).json({
          success: true,
          conversation,
          users,
        });
      } catch (error) {
        return res.status(500).json({ success: false, error });
      }
    },
    markConversationReadByRoomId: async(req, res) => {
      try {
        const { roomId } = req.params;
        const room = await ChatRoomModel.getChatRoomByRoomId(roomId)
        if (!room) {
          return res.status(400).json({
            success: false,
            message: 'No room exists for this id',
          })
        }
    
        const currentLoggedUser = req.userId;
        const result = await ChatMessageModel.markMessageRead(roomId, currentLoggedUser);
        return res.status(200).json({ success: true, data: result });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error });
      }
    },*/
}