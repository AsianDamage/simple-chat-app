const users = []

// Join user to chat

function userJoin(id, username) {
    const user = {id, username}
    users.push(user)
    return user
}

// Get current user
function getCurUser(id) {
    return users.find(user => user.id === id)
}
// User leaves chat
function userLeave(id) {
    const index = users.findIndex(user => user.id === id)

    if (index !== -1) {
        return users.splice(index,1)[0]
    }
}

// Get all users
function getUsers() {
    return users
}
module.exports = {
    userJoin,
    userLeave,
    getUsers,
    getCurUser,

}