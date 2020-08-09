const express = require('express')
const router = express.Router()
const { checkAuth } = require('../middleware/auth')
const { 
    getProjectById, 
    checkUserPermission,
    checkOwner } = require('../database/utils')

const Project = require('../models/Project')
const User = require('../models/User')
const Bug = require('../models/Bug')

const PROJECTS_PER_PAGE = 5
const MEMBERS_PER_PAGE = 20
const PROJECT_MEMBER_PREVIEWS = 6
const PROJECT_BUG_PREVIEWS = 3

// Create project
router.post('', checkAuth , async (req, res) => {
    try {
        // Get variables
        const { title, desc, link , isPrivate, languages} = req.body
        const owner = req.session.user.userId

        // Construct the model
        const newProject = new Project({
            title, 
            desc, 
            isPrivate,
            owner,
            link,
            members: [owner],
            languages: languages && [...languages]
        })
        // Add project to user
        let foundUser = await User.findById(owner)
        foundUser.projects.push(`${newProject.id}`)
        // Save changes to the database
        await newProject.save()
        await User.updateOne(
            {_id: owner}, 
            { projects: foundUser.projects}
        )

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
            .populate({
                path : 'bugs',
                select: '-comments',
                populate : {
                  path : 'author',
                  select: 'username'
                }
              })

        // Check if favorited by the user
        let foundUser = await User.findById(req.session.user.userId)
        query.bugs = query.bugs.map(bug => {
            bug.favorited = foundUser.hasFavorite(bug._id)
            return bug
        })

        foundProject.memberCount = foundProject.members.length
        foundProject.bugs = query.bugs
        foundProject.members = query.members

        //console.log(foundProject)
        res.send(foundProject)
    } catch (err) {
        console.log(err.message)
        res.status(400).send(err.message)
    }
})

// Get paginated project previews
router.get('/projects/:page', async (req, res) => {
    try {
        const indexStart = (req.params.page-1)*PROJECTS_PER_PAGE
        // get projects
        const totalProjects = await Project.find({isPrivate: false}).countDocuments()//estimatedDocumentCount()?
        const totalPages = Math.ceil(totalProjects/PROJECTS_PER_PAGE)
        let projects = await Project.find({isPrivate: false}).skip(indexStart).limit(PROJECTS_PER_PAGE).populate('owner','username _id').select('-bugs -members')
        
        const package={
            totalPages,
            projects: projects
        }

        res.send(package)
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
        
        const totalPages = Math.ceil(foundProject.members.length/MEMBERS_PER_PAGE)
        const indexStart = (req.params.page-1)*MEMBERS_PER_PAGE
        let project = await Project.findById(req.params.id).slice('members',[indexStart,indexStart+MEMBERS_PER_PAGE]).populate('members','username')

        const package={
            totalPages,
            title: foundProject.title,
            users: project.members
        }

        res.send(package)
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
        // Add project to member
        let foundUser = await User.findById(id)
        foundUser.projects.push(`${foundProject.id}`)
        // Save changes to the database
        await foundProject.save()
        await User.updateOne(
            {_id: owner}, 
            { projects: foundUser.projects}
        )
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
        // Remove project from member
        let foundUser = await User.findById(id)
        const projIndex = foundUser.projects.indexOf(`${req.params.projectId}`)
        foundUser.projects.splice(projIndex,1)
        // Save changes to the database
        await foundProject.save()
        await User.updateOne(
            {_id: owner}, 
            { projects: foundUser.projects}
        )

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
        const { title, desc, isPrivate, link, languages } = req.body
        // Update the project
        const update = { title, desc, isPrivate, link, languages }
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
        // Update the database
         foundProject.remove()

         res.status(200).send('Removed project')
    } catch (err) {
        res.status(400).send(err.message)
    }
})

module.exports = router