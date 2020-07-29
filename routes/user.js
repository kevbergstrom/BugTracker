const express = require('express')
const router = express.Router()
const { checkAuth, noAuth } = require('../middleware/auth')
const { setSession, destroySession } = require('../session')

const { SESSION_NAME } = require('../config')

const User = require('../models/User')

router.post('', noAuth , async (req, res) => {
    try {
        const { email, username, password } = req.body
        const newUser = new User({ email, username, password })
        await newUser.save()

        const sessionUser = setSession(req, newUser)
        res.send(sessionUser)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

// Logout user
router.delete('', checkAuth , (req, res) => {
    try {
        const user = req.session.user
        destroySession(req)
        res.clearCookie(SESSION_NAME)
        res.send(user)
    } catch (err) {
        res.status(400).send(err.message) 
    }
})

router.delete('/:id', checkAuth, async (req, res) => {
    try {
        const user = req.session.user
        if(user.userId != req.params.id){
            throw new Error('You dont have permission to delete that user')
        }
        // delete user
        const foundUser = await User.findById(req.params.id)
        foundUser.remove()
        // delete session
        destroySession(req)
        res.clearCookie(SESSION_NAME)
        res.send(user)
    } catch (err) {
        res.status(400).send(err.message) 
    }
})

router.post('/login', noAuth , async (req, res) => {
    try {
        const { email, password } = req.body
        const foundUser = await User.findOne({email})

        if(foundUser && foundUser.comparePasswords(password)){
            const sessionUser = setSession(req, foundUser)
            res.send(sessionUser)
        } else {
            throw new Error('Wrong email or password')
        }
    } catch (err) {
        res.status(401).send(err.message) 
    }
})

router.get('', (req, res) => {
    if(req.session.user){
        return res.send(req.session.user)
    }
    res.status(401).send("No session")
})

router.get('/checkAuth', checkAuth, (req, res) => {
    res.send('Authorized')
})

module.exports = router

