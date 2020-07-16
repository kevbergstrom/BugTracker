// check if user is logged in
const checkAuth = function(req, res, next) {
    if (req.session.user) {
        next()
    } else {
        return res.status(401).send('Not authorized')
    }
}

// check if user is not logged in
const noAuth = function(req, res, next) {
    if (!req.session.user) {
        next()
    } else {
        return res.status(401).send('Not authorized while logged in')
    }
}

module.exports = {
    checkAuth,
    noAuth
}