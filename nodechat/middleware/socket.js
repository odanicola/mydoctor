const { createRoom } = require('../api/v1/room')
const { timer, countDown } = require('../helpers/index')
const uuid = require('uuid')
module.exports = (app,io) => {
    io.on("connection", function (socket) {
        socket.on("join", async ({name,room,description,users}, callback) => {
            
            const user = {
                id: socket.id,
                name: name,
                room: room
            }
            console.log('user: ', user)
            socket.join(user.room)
            
            const payload = {
                name: user.room,
                description: description,
                users: users
            }

            console.log('room', socket.rooms)

            // var timeLeft = 10;
            // var Room = function() {
            //     this.id = String(Date.now());
            //     this.running = false;
            //     console.log(user.room)
            //     console.log(socket.adapter.rooms[user.room])
            //     console.log('is running init: ',this.running)
            //     if (!this.running) {
            //         this.timer = setInterval(this.timerFunction.bind(this), 1000);
            //     }
            // }
            
            // Room.prototype.timerFunction = function() {
            //     // Example
            //     if (timeLeft == 0) {
            //         clearInterval(this.timer)
            //         this.running = false
            //         console.log('is running init: ',this.running)
            //     } else {
            //         this.running = true;
            //         console.log(`${timeLeft} seconds remaining`)
            //         console.log('is running init: ',this.running)
            //         socket.broadcast.to(user.room).emit('timer', {timeLeft: `${timeLeft} seconds remaining`})
            //         timeLeft--;
            //     }
            // }
            
            // Create one
            // new Room();

            // const createroom = await createRoom(payload)

            // if (createroom.error) {
            //     console.log('createroom error', createroom.error)
            //     return createroom.error
            // }

            // const createmessage = await createMessage({
            //     room_id : createroom.data.id,
            //     user_id: createroom.data.users[0],
            //     message: `${createroom.data.users[0]}, has joined the room ${user.room}`
            // });

            // if (createmessage.error) {
            //     console.log('createmessage error', createmessage.error)
            //     return
            // }
            
            socket.emit('message', {
                _id: uuid.v4(),
                text: `${user.name}, welcome to the room`,
                createdAt: new Date(),
                system: true,
            });

            socket.broadcast.to(user.room).emit('message', {
                _id: uuid.v4(),
                text: `${user.name} has joined the room`,
                createdAt: new Date(),
                system: true,
            });

            callback()
        }) // on join

        socket.on("send", (data, callback) => {
            console.log(data, data[0].room)
            socket.emit('message', data[0]);
            socket.broadcast.to(data[0].room).emit('message', data[0]);
            callback(data[0])
        });

        socket.on('leaveroom', ({room,name}, callback) => {
            // socket.rooms === {}
            console.log('disconnect', typeof room, socket.id)
            socket.leave(room.toString())
            socket.broadcast.to(room.toString()).emit('message', {
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