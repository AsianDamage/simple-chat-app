const express = require("express")
const http = require("http")
const socketio = require('socket.io')
const formatMessage = require("./utils/messages")
const {userJoin , getCurUser, userLeave, getUsers} = require("./utils/users")

const bot = "ChatBot"
const app  = express()
const server = http.createServer(app)
const io = socketio(server)
const port = process.env.PORT || 5050

app.use(express.static('public'))

// Run when client connects
io.on('connection', socket => {
    // Join chat
    socket.on('joinChat', (username) => {

        const user = userJoin(socket.id, username)

         // Welcome user
    socket.emit('message', formatMessage(bot,'Welcome to MyChatApp'))

    // Broadcast when new client joins
    socket.broadcast.emit('message', formatMessage(bot,`${user.username} joined`))

    // Send users info
    io.emit('roomUsers', {
        users : getUsers()
     })

    })

   
    // Runs when client disconnects
    socket.on('disconnect', () =>{
        const user = userLeave(socket.id)
        if (user) {
        io.emit('message', formatMessage(bot,`${user.username} left`))
        io.emit('roomUsers', {
            users : getUsers()
         })
    }
    })

    // Listen for chatMessage
    socket.on('chatMessage', (message) => {
        const user = getCurUser(socket.id)
        io.emit('message',formatMessage(user.username,message))
    })
    
})
server.listen(port, () => {console.log(`listening on port ${port}`)})
