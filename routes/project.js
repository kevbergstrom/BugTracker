const express = require('express')
const router = express.Router()
const { checkAuth } = require('../middleware/auth')

const Project = require('../models/Project')

// Create project
router.post('', checkAuth , async (req, res) => {
    try {
        const { title, desc, private, languages } = req.body
        const owner = req.session.user.userId
        const newProject = new Project({
            title, 
            desc, 
            private,
            owner,
            members: [owner],
            languages: languages && [...languages]
        })
        await newProject.save()

        res.send(newProject)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

module.exports = router