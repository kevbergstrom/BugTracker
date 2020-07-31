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
const MEMBERS_PER_PAGE = 20
const PROJECT_MEMBER_PREVIEWS = 6
const PROJECT_BUG_PREVIEWS = 3

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

// Get project with recent bug and members array previews
router.get('/:id', async (req, res) => {
    try {
        // Find the project
        let foundProject = await getProjectById(req.params.id)
        checkUserPermission(foundProject, req.session.user && req.session.user.userId)

        query = await Project.findById(req.params.id)
            .slice('members', [0, PROJECT_MEMBER_PREVIEWS])
            .slice('bugs', [0, PROJECT_BUG_PREVIEWS])
            .populate('members','username')
            .select('-bugs.comments')

        foundProject.memberCount = foundProject.members.length
        foundProject.bugs = query.bugs
        foundProject.members = query.members

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

// Get paginated member previews
router.get('/:id/members/:page', async (req, res) => {
    try {
        // Find the project
        let foundProject = await getProjectById(req.params.id)
        checkUserPermission(foundProject, req.session.user && req.session.user.userId)
        
        const indexStart = (req.params.page-1)*MEMBERS_PER_PAGE
        let project = await Project.findById(req.params.id).slice('members',[indexStart,indexStart+MEMBERS_PER_PAGE]).populate('members','username')

        res.send(project.members)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

// Add member to project
router.post('/:id/member', checkAuth, async (req, res) => {
    try {
        // Find the project
        let foundProject = await getProjectById(req.params.id)
        checkUserPermission(foundProject, req.session.user && req.session.user.userId)
        const { id } = req.body
        //check if user is already in the members list
        if(foundProject.members.indexOf(id)>=0){
            throw new Error('User is already a member')
        }
        // Add user to the members list
        foundProject.members.push(`${id}`)
        await foundProject.save()
        res.send(id)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

// Remove member from the project
router.delete('/:projectId/member/:userId', checkAuth, async (req, res) => {
    try {
         // Find the project
         let foundProject = await getProjectById(req.params.projectId)
         // Check permissions
        if(req.session.user.userId != req.params.userId){
            checkOwner(foundProject, req.session.user.userId)
        }
        // Remove member
        const userIndex = foundProject.members.indexOf(`${req.params.userId}`)
        if(userIndex<0){
            throw new Error('User is not a member')
        }
        foundProject.members.splice(userIndex, 1)
        await foundProject.save()
        res.send(req.params.userId)
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
        // let foundProject = await getProjectById(req.params.id).slice('bugs', [(page-1)*BUGS_PER_PAGE, page*BUGS_PER_PAGE]).select('-bugs.comments')
        checkUserPermission(foundProject, req.session.user && req.session.user.userId)
        // get variables
        const totalPages = Math.ceil(foundProject.bugs.length/BUGS_PER_PAGE)
        const page = req.params.page
        if(page <=0 || page > totalPages){
            throw new Error("Out of bounds")
        }
        // remove comments
        let bugPreviews = foundProject.bugs.slice((page-1)*BUGS_PER_PAGE, page*BUGS_PER_PAGE)
            .map(prev => {
                prev.comments = []
                return prev
            })
        const package = {
            title: foundProject.title,
            totalPages,
            bugs: bugPreviews
        }

        res.send(package)
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
        const totalPages = Math.ceil(foundBug.comments.length/COMMENTS_PER_PAGE)
        const page = req.params.page
        if(page <=0 || page > totalPages){
            throw new Error("Out of bounds")
        }
        // get comments
        let comments = foundBug.comments.slice((page-1)*COMMENTS_PER_PAGE, page*COMMENTS_PER_PAGE)

        const package = {
            totalPages,
            comments,
        }

        res.send(package)
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