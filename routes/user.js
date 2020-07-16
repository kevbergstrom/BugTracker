const express = require('express')

const router = express.Router()

const User = require('../models/User')

router.post('', async (req,res) => {
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

router.get('', (req, res) => {
    if(req.session.user){
        return res.send(req.session.user)
    }
    res.send(null)
})

module.exports = router

