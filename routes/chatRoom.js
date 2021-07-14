// controllers
const chatRoom = require('../controllers/chatRoom')
const router = require('express').Router();
const jwt = require('../middlewares/jwt')

router
    //.get('/', chatRoom.getRecentConversation)
    //.get('/:roomId', chatRoom.getConversationByRoomId)
    .post('/initiate', jwt.decode, chatRoom.initiate)
    //.post('/:roomId/message', chatRoom.postMessage)
    //.put('/:roomId/mark-read', chatRoom.markConversationReadByRoomId)

module.exports = router;