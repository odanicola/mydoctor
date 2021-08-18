const { createRoom } = require('../api/v1/room')
const { createMessage, loadMessages } = require('../api/v1/message')
const { timer, countDown } = require('../helpers/index')
const uuid = require('uuid')

module.exports = (app,io) => {
    io.on("connection", function (socket) {
        socket.on("join", async ({id,name}, callback) => {
            const user = {
                id: id,
                name: name
            }
            socket.join(user.id)
            
            socket.emit('message', {
                _id: uuid.v4(),
                text: `${user.name}, welcome to the room`,
                createdAt: new Date(),
                system: true,
                room_id: id
            });

            socket.broadcast.to(user.id).emit('message', {
                _id: uuid.v4(),
                text: `${user.name} has joined the room`,
                createdAt: new Date(),
                system: true,
                room_id: id
            });

            callback()
        }) // on join

        // Load message 
        socket.on("loadmessages", async (data, callback) => {
            let room = data.id 
            console.log('room', room)
            const loadmessages = await loadMessages(room)

            // console.log('loadmessages', loadmessages)
            if (loadmessages.error) return callback({
                status: false,
                message: loadmessages.error
            })

            var result = [];
            var messages = loadmessages.data
            if (messages.length > 0) {
                for (let index = 0; index < messages.length; index++) {
                    const element = messages[index];
                    var setmessage = {
                        _id: element._id,
                        room: element.room,
                        user: element.user,
                        text: element.text,
                        createdAt: element.created_at
                    }

                    result.push(setmessage)
                }
            }

            callback({
                status: true,
                message: result
            })
        })

        // Send message
        socket.on("send", async (data, callback) => {
            console.log(data, data.room)

            const createmessage = await createMessage(data)

            if (createmessage.error) return callback({
                status: false,
                message: createmessage.error
            })

            // socket.emit('message', data);
            socket.broadcast.to(data.room).emit('message', data);
            callback({
                status: true,
                message: data
            })
        });

        socket.on('leaveroom', ({id,name}, callback) => {
            // socket.rooms === {}
            console.log('disconnect', typeof id, socket.id)
            socket.leave(id)
            socket.broadcast.to(id).emit('message', {
                _id: uuid.v4(),
                text: `${name} has left the room`,
                createdAt: new Date(),
                system: true,
            })
            // socket.disconnect(true)
            callback('disconnected')
            console.log('room', socket.rooms)
        });
        
    }) 
}