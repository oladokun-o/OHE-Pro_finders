/**
 The WebSockets class has three major things here:
 - users array
 - connection method
 - subscribing members of a chat room to it i.e subscribeOtherUser
 **/
 class WebSockets {
    //users array
    users = [];
    //connection method
    connection(client) {
            //event is fired when the chat room is disconnected
            client.on('disconnect', () => {
                    this.users = this.users.filter((user) => user.socketId !== client.id)
                })
                //adding identity of user mapped to the socketid
            client.on('identity', (userId) => {
                    this.users.push({
                        socketId: client.id,
                        userId: userId,
                    })
                })
                //subscribe user to chat and other users as well
            client.on('subscribe', (room, otherUserId = '') => {
                    this.subscribeOtherUser(room, otherUserId);
                    client.join(room);
                })
                //exit or mute a chat room
            client.on('unsubscribe', (room) => {
                client.leave(room);
            })
        }
        //subscribing
    subscribeOtherUser(room, otherUserId) {
        /**
         * how can one user have multiple presences in the user array? Well, think of a scenario where the same user is logged in from both their web application and mobile phone.
         * It will create multiple socket connections for the same user.
         * so we filter!
         */
        const userSockets = this.users.filter(
            (user) => user.userId === otherUserId
        )
        userSockets.map((userInfo) => {
            const socketConn = global.io.sockets.connected(userInfo.socketId)
            if (socketConn) {
                socketConn.join(room)
            }
        })
    }
}
module.exports = new WebSockets()