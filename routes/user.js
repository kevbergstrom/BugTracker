const express = require('express')

const router = express.Router()

const User = require('../models/User')

router.post('', async (req,res) => {
    try {
        const { email, username, password } = req.body
        const newUser = new User({ email, username, password })
        await newUser.save()

        res.send(username)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.get('', (req, res) => {
    res.send('Hello World')
})

module.exports = router

