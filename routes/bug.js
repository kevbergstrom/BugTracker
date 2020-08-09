const express = require('express')
const router = express.Router({mergeParams: true})
const { checkAuth } = require('../middleware/auth')
const { 
    getProjectById, 
    getBugById,
    checkUserPermission} = require('../database/utils')

const Project = require('../models/Project')
const User = require('../models/User')
const Bug = require('../models/Bug')

const BUGS_PER_PAGE = 5

// Get paginated bug previews from project
router.get('/results/:page', async (req, res) => {
    try {
        // Find the project
        let foundProject = await getProjectById(req.params.projectId)
        // let foundProject = await getProjectById(req.params.id).slice('bugs', [(page-1)*BUGS_PER_PAGE, page*BUGS_PER_PAGE]).select('-bugs.comments')
        checkUserPermission(foundProject, req.session.user && req.session.user.userId)
        // get variables
        const totalPages = Math.ceil(foundProject.bugs.length/BUGS_PER_PAGE)
        const page = req.params.page
        if(page <=0 || page > totalPages){
            throw new Error("Out of bounds")
        }
        const indexStart = (page-1)*BUGS_PER_PAGE

        let query = await Project.findById(req.params.projectId, {"bugs":{$slice:[indexStart, BUGS_PER_PAGE]}})
            .populate({
                path: 'bugs',
                select: '-comments',
                populate: {
                    path: 'author',
                    select: 'username'
                }
            })

        // Check if favorited by the user
        let foundUser = await User.findById(req.session.user.userId)
        query.bugs = query.bugs.map(bug => {
            bug.favorited = foundUser.hasFavorite(bug._id)
            return bug
        })

        const package = {
            title: foundProject.title,
            totalPages,
            bugs: query.bugs
        }
 
        res.send(package)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

// Post bug to project with :id
router.post('', checkAuth, async (req, res) => {
    try {
        // Find the project
        let foundProject = await getProjectById(req.params.projectId)
        checkUserPermission(foundProject, req.session.user && req.session.user.userId)
        // Get varibles
        const { title, desc} = req.body
        const author = req.session.user.userId
        const bugCount = foundProject.bugCount += 1
        // Create bug
        const newBug = new Bug({
            author,
            title: title,
            desc: desc,
            number: bugCount,
            project: req.params.projectId
        })
        // Add bug to project
        foundProject.bugs.unshift(newBug.id)
        foundProject.bugCount = bugCount
        // Add bug to user's favorites
        let foundUser = await User.findById(author)
        foundUser.favorites.push(`${newBug.id}`)
        // Save changes to the database
        await newBug.save()
        await foundProject.save()
        await User.updateOne(
            {_id: author}, 
            { favorites: foundUser.favorites}
        )

        res.send(newBug)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

// Get bug from project
router.get('/:bugId', async (req, res) => {
    try {
        // Find the Bug
        let { foundBug, foundProject } = await getBugById(req.params.projectId, req.params.bugId)
        checkUserPermission(foundProject, req.session.user && req.session.user.userId)
        // Remove comments
        foundBug.comments = []

        //check if the bug is favorited
        let foundUser = await User.findById(req.session.user.userId)
        foundBug.favorited = foundUser.hasFavorite(req.params.bugId)

        res.send(foundBug)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

// Favorite a bug
router.post('/:bugId/favorite', async (req, res) => {
    try {
        // Find the Bug
        let { foundProject } = await getBugById(req.params.projectId, req.params.bugId)
        checkUserPermission(foundProject, req.session.user && req.session.user.userId)
        // Find the user
        let foundUser = await User.findById(req.session.user.userId)
        // Check if favorite exists
        if(foundUser.hasFavorite(req.params.bugId)){
            throw new Error('You already favorited this bug')
        }
        // Add favorite to user
        foundUser.favorites.push(`${req.params.bugId}`)
        await User.updateOne(
            {_id: req.session.user.userId}, 
            { favorites: foundUser.favorites}
        )

        res.send(true)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

// Unfavorite a bug
router.delete('/:bugId/favorite', async (req, res) => {
    try {
        // Find the user
        let foundUser = await User.findById(req.session.user.userId)
        // Remove the favorite
        let updatedFavorites = foundUser.favorites.filter(fav => fav != req.params.bugId)
        // Save to database
        await User.updateOne(
            {_id: req.session.user.userId}, 
            { favorites: updatedFavorites}
        )

        res.send(false)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

// Update bug from project
router.put('/:bugId', checkAuth , async (req, res) => {
    try {
        let { foundBug, foundProject } = await getBugById(req.params.projectId, req.params.bugId)
        checkUserPermission(foundProject, req.session.user && req.session.user.userId)
        // check user permission
        if(foundBug.author.id != req.session.user.userId){
            throw new Error('You dont have permission to edit this post')
        }
        // get variables
        const { title, desc } = req.body
        // Update the bug
        foundBug.title = title
        foundBug.desc = desc

        await foundBug.save()
        res.send(foundBug)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

// Remove bug from project
router.delete('/:bugId', checkAuth, async (req, res) => {
    try {
        let { foundBug, foundProject } = await getBugById(req.params.projectId, req.params.bugId)
        checkUserPermission(foundProject, req.session.user && req.session.user.userId)
        // check user permission
        if(foundBug.author.id != req.session.user.userId){
            throw new Error('You dont have permission to edit this post')
        }
        foundProject.bugs = foundProject.bugs.filter(bug => bug != req.params.bugId)
        // Update thr database
        foundBug.remove()
        await foundProject.save()

        res.status(200).send('OK')
    } catch (err) {
        res.status(400).send(err.message)
    }
})

module.exports = router