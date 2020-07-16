const setSession = (req, user) => {
    const sessionUser = { 
        userId: user.id, 
        username: user.username 
    }
    req.session.user = sessionUser
    return sessionUser
}

const destroySession = (req) => {
    req.session.destroy(err => {
        if (err) throw (err)
    })
}

module.exports = {
    setSession,
    destroySession
}