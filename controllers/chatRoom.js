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
      const chatRoom = await ChatRoomModel.initiateChat(userIds, type, chatInitiator, chatInitiatorId);
      //set chatroomid
      const chatRoomId = chatRoom.chatRoomId;
      //send request as mail to agent
      if (chatRoom.isNew == true) {
        console.log('yuess')
        Support.findOne({ _id: '60eef3f7f5177f28600f277e' }, (err, user) => {
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
      }
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