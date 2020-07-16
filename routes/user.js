const express = require('express')
const router = express.Router()
const { SESSION_NAME } = require('../config')
const checkAuth = require('../middleware/auth')

const User = require('../models/User')

router.post('', async (req, res) => {
    try {
        const { email, username, password } = req.body
        const newUser = new User({ email, username, password })
        await newUser.save()

        const sessionUser = { 
            userId: newUser.id, 
            username: newUser.username 
        }
        req.session.user = sessionUser
        res.send(sessionUser)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.delete('', async (req, res) => {
    try {
        const user = req.session.user
        if (user) {
            req.session.destroy(err => {
                if (err) throw (err)

                res.clearCookie(SESSION_NAME)
                res.send(user)
            })
        } else {
            throw new Error('You are already logged out')
        }
    } catch (err) {
        res.status(400).send(err.message) 
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = req.session.user
        if(user){
            throw new Error('Already logged in')
        }

        const { email, password } = req.body
        const foundUser = await User.findOne({email})

        if(foundUser && foundUser.comparePasswords(password)){
            const sessionUser = { 
                userId: foundUser.id, 
                username: foundUser.username 
            }
            req.session.user = sessionUser
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
    res.send("No session")
})

router.get('/checkAuth', checkAuth, (req, res) => {
    res.send('Authorized')
})

module.exports = router

