// utils
const makeValidation = require('@withvoid/make-validation')
const bodyParser = require('body-parser');
const router = require('express').Router();

router.use(bodyParser.urlencoded({ extended: true }));

//models
const CHAT_ROOM_TYPES = require('../models/ChatRoom')
const ChatRoomModel = require('../models/ChatRoom')
//const ChatMessageModel = require('../models/ChatMessage')
const UserModel = require('../models/user.js')
module.exports = {
  initiate: async (req, res) => {
    var bodyy = req.body.userIds
        try {
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
            const userIds = [req.body.userIds,req.body.support];
            const chatInitiator = [req.body.userIds,req.body.firstname+' '+req.body.lastname,req.body.email];
            const type = req.body.type
            const chatRoom = await ChatRoomModel.initiateChat(userIds, type, chatInitiator);
          res.status(200).json({ success: true, chatRoom });
        } catch (error) {
          console.log('success')
            return res.status(500).json({ success: false, error: error })
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