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

// Post bug to project with :id
router.post('/:id', checkAuth, async (req, res) => {
    try {
        // Find the project
        let foundProject = await Project.findById(req.params.id)
        if(!foundProject) {
            throw new Error('Cannot find project')
        }
        // Get varibles
        const { title, desc, severity} = req.body
        const author = req.session.user.userId
        const bugCount = foundProject.bugCount += 1
        // Create bug
        const newBug = {
            author: req.session.user.userId,
            title: title,
            desc: desc,
            number: bugCount,
            severity: severity ? severity : 1
        }
        // Add bug to project
        foundProject.bugs.unshift(newBug)
        foundProject.bugCount = bugCount
        // Update project in database
        await foundProject.save()

        res.send(newBug)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

// Post a comment on a bug 
router.post('/:projectId/bug/:bugId', checkAuth, async (req, res) => {
    try {
        // Find the project
        let foundProject = await Project.findById(req.params.projectId)
        if(!foundProject) {
            throw new Error('Cannot find project')
        }
        // Find the bug
        let foundBug = await foundProject.bugs.find(bug => bug.id === req.params.bugId)
        if(!foundBug) {
            throw new Error('Cannot find bug')
        }
        // Get variables
        const { desc } = req.body
        const author = req.session.user.userId
        // Create comment
        const newComment = {
            author,
            desc
        }
        // Add comment to bug
        foundBug.comments.push(newComment)
        await foundProject.save()
        
        res.send(newComment)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

module.exports = router