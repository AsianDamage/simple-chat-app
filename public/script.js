const form = document.getElementById('form')
const messageInput =document.getElementById('message-text')
const msgcon = document.getElementById("message-container")
const userslist = document.getElementById("users-online")
const {username} = Qs.parse(location.search, {
    ignoreQueryPrefix: true

})

const socket = io();

socket.emit('joinChat', username)

        socket.on('roomUsers', ({users}) => {
      outputUsers(users)
})

socket.on('message', msg => {
    displayMessage(msg)
})


form.addEventListener('submit', (e) => {
    e.preventDefault()
    const message = messageInput.value 
    if(message === "") {
        alert("enter a value to send")
        return;
    }
    if (message.length >= 81) {
        alert("Message too long, Maximum 80 characters")
        return;
    }
    socket.emit('chatMessage', message)
})

function displayMessage(message) {
    const div = document.createElement('div')
    div.classList.add("chat-msg")
    div.innerHTML = `<b><span style = "color:orange">${message.username}</span> , ${message.time} | <b style = "color:white;"> ${message.text}</b></b>`
    msgcon.append(div)
    messageInput.value = ""
    msgcon.scrollTop = msgcon.scrollHeight;
    messageInput.focus()
    
}
function outputUsers(users) {
    userslist.innerHTML = `${users.map(user => `<li> ${user.username} </li>`).join('')}`
}