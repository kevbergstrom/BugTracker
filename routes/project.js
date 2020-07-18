const express = require('express')
const router = express.Router()
const { checkAuth } = require('../middleware/auth')
const { 
    getProjectById, 
    getBugById,
    getCommentById,
    checkUserPermission,
    checkOwner } = require('../database/utils')

const Project = require('../models/Project')
const User = require('../models/User')

const PROJECTS_PER_PAGE = 5
const BUGS_PER_PAGE = 5
const COMMENTS_PER_PAGE = 5

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

// Get project without the bugs or members array
router.get('/:id', async (req, res) => {
    try {
        // Find the project
        let foundProject = await getProjectById(req.params.id)
        checkUserPermission(foundProject, req.session.user && req.session.user.userId)
        // remove arrays
        foundProject.bugs = []
        foundProject.members = []

        res.send(foundProject)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

// Get paginated project previews
router.get('/projects/:page', async (req, res) => {
    try {
        const indexStart = (req.params.page-1)*PROJECTS_PER_PAGE
        // get projects
        let projects = await Project.find({private: false}).skip(indexStart).limit(PROJECTS_PER_PAGE).select('-bugs -members')
        
        res.send(projects)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

// Update project
router.put('/:id', checkAuth , async (req, res) => {
    try {
        // Find the project
        let foundProject = await getProjectById(req.params.id)
        checkOwner(foundProject, req.session.user && req.session.user.userId)
        // Get variables
        const { title, desc, private, languages } = req.body
        // Update the project
        const update = { title, desc, private, languages }
        await Project.findByIdAndUpdate(req.params.id, update)

        res.send(update)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

// Delete project
router.delete('/:id', checkAuth, async(req, res) => {
    try {
         // Find the project
         let foundProject = await getProjectById(req.params.id)
         checkOwner(foundProject, req.session.user && req.session.user.userId)
         foundProject.remove()
         res.status(200).send('Removed project')
    } catch (err) {
        res.status(400).send(err.message)
    }
})

// Post bug to project with :id
router.post('/:id', checkAuth, async (req, res) => {
    try {
        // Find the project
        let foundProject = await getProjectById(req.params.id)
        checkUserPermission(foundProject, req.session.user && req.session.user.userId)
        // Get varibles
        const { title, desc, severity} = req.body
        const author = req.session.user.userId
        const name = req.session.user.username
        const bugCount = foundProject.bugCount += 1
        // Create bug
        const newBug = {
            author: req.session.user.userId,
            title: title,
            desc: desc,
            number: bugCount,
            severity: severity ? severity : 1,
            name
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

// Get bug from project
router.get('/:projectId/bug/:bugId', async (req, res) => {
    try {
        // Find the Bug
        let { foundBug, foundProject } = await getBugById(req.params.projectId, req.params.bugId)
        checkUserPermission(foundProject, req.session.user && req.session.user.userId)
        // Remove comments
        foundBug.comments = []

        res.send(foundBug)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

// Update bug from project
router.put('/:projectId/bug/:bugId', checkAuth , async (req, res) => {
    try {
        let { foundBug, foundProject } = await getBugById(req.params.projectId, req.params.bugId)
        checkUserPermission(foundProject, req.session.user && req.session.user.userId)
        // check user permission
        if(foundBug.author != req.session.user.userId){
            throw new Error('You dont have permission to edit this post')
        }
        // get variables
        const { title, desc, severity, complete } = req.body
        // Update the bug
        foundBug.title = title
        foundBug.desc = desc
        foundBug.severity = severity
        if(!foundBug.complete){
            foundBug.completedOn = Date.now()
        }
        await foundProject.save()
        res.send(foundBug)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

// Remove bug from project
router.delete('/:projectId/bug/:bugId', checkAuth, async (req, res) => {
    try {
        let { foundBug, foundProject } = await getBugById(req.params.projectId, req.params.bugId)
        checkUserPermission(foundProject, req.session.user && req.session.user.userId)
        // check user permission
        if(foundBug.author != req.session.user.userId){
            throw new Error('You dont have permission to edit this post')
        }
        foundProject.bugs = foundProject.bugs.filter(bug => bug.id != req.params.bugId)
        await foundProject.save()
        res.status(200).send('OK')
    } catch (err) {
        res.status(400).send(err.message)
    }
})

// Get paginated bug previews from project
router.get('/:id/bugs/:page', async (req, res) => {
    try {
        // Find the project
        let foundProject = await getProjectById(req.params.id)
        checkUserPermission(foundProject, req.session.user && req.session.user.userId)
        // get variables
        const page = req.params.page
        // remove comments
        let bugPreviews = foundProject.bugs.slice((page-1)*BUGS_PER_PAGE, page*BUGS_PER_PAGE)
            .map(prev => {
                prev.comments = []
                return prev
            })

        res.send(bugPreviews)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

// Post a comment on a bug 
router.post('/:projectId/bug/:bugId', checkAuth, async (req, res) => {
    try {
        // Find the Bug and Project
        let { foundBug, foundProject } = await getBugById(req.params.projectId, req.params.bugId)
        checkUserPermission(foundProject, req.session.user && req.session.user.userId)
        // Get variables
        const { desc } = req.body
        const author = req.session.user.userId
        const name = req.session.user.username
        // Create comment
        const newComment = {
            author,
            desc,
            name
        }
        // Add comment to bug
        foundBug.comments.push(newComment)
        await foundProject.save()
        
        res.send(newComment)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

// Get paginated comments on a bug
router.get('/:projectId/bug/:bugId/comments/:page', async (req, res) => {
    try {
        // Find the Bug
        let { foundBug, foundProject } = await getBugById(req.params.projectId, req.params.bugId)
        checkUserPermission(foundProject, req.session.user && req.session.user.userId)
        // get variables
        const page = req.params.page
        // get comments
        let comments = foundBug.comments.slice((page-1)*COMMENTS_PER_PAGE, page*COMMENTS_PER_PAGE)

        res.send(comments)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

// Remove comment from a bug
router.delete('/:projectId/bug/:bugId/comment/:commentId', checkAuth, async (req, res) => {
    try {
        let { foundComment, foundBug, foundProject } = await getCommentById(req.params.projectId, req.params.bugId, req.params.commentId)
        checkUserPermission(foundProject, req.session.user && req.session.user.userId)
        // check user permission
        if(foundComment.author != req.session.user.userId){
            throw new Error('You dont have permission to delete this comment')
        }
        foundBug.comments = foundBug.comments.filter(com => com.id != req.params.commentId)
        await foundProject.save()
        res.status(200).send('OK')
    } catch (err) {
        res.status(400).send(err.message)
    }
})

module.exports = router