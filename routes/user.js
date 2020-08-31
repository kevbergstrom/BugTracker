const express = require('express')
const router = express.Router()
const { checkAuth, noAuth } = require('../middleware/auth')
const { setSession, destroySession } = require('../session')
const { validateUser } = require('../validation/account')
const { paginateList } = require('../database/utils')

const { SESSION_NAME } = require('../config')

const User = require('../models/User')
const Bug = require('../models/Bug')

const USERS_PER_PAGE = 20
const INVITES_PER_PAGE = 20
const BUGS_PER_PAGE = 5
const PROJECTS_PER_PAGE = 5
const PREVIEWS_PER_PAGE = 3

// Signup User
router.post('', noAuth , async (req, res) => {
    try {
        // Validate user input
        const { email, username, password } = req.body
        validateUser(email, username, password)
        // Validate user model
        const newUser = new User({ email, username, password })
        // Save user to db
        await newUser.save()
        // Create and send session info
        const sessionUser = setSession(req, newUser)
        res.send(sessionUser)
    } catch (err) {
        if(err.errors){
            // Mongoose validation errors
            if(err.errors.username){
                res.status(400).send(err.errors.username.message)
                return
            }
            if(err.errors.email){
                res.status(400).send(err.errors.email.message)
                return
            }
        }
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

// Delete user
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

// Login User
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

router.get('/checkAuth', checkAuth, (req, res) => {
    res.send('Authorized')
})

// Get all projects user owns
router.get('/projects', checkAuth, async (req, res) => {
    try {
        const query = await User.findById(req.session.user.userId)
            .populate({
                path: 'projects',
                select: 'title owner'
            })
        let ownedProjects = query.projects.filter(proj => proj.owner == req.session.user.userId)

        res.send(ownedProjects)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

// Get dashboard items
router.get('/dashboard', async (req, res) => {
    try {
        if(!req.session.user){
            throw new Error('You aren\'t logged in')
        }
        const userId = req.session.user.userId
        // Get bugs
        let favQuery = await User.findById(userId, {"favorites":{$slice:[0, PREVIEWS_PER_PAGE]}})
        .populate({
            path: 'favorites',
            populate: {
                path: 'author',
                select: 'username'
            },
            select: '-comments'
        })

        // Set favorited
        favQuery.favorites = favQuery.favorites.map(bug => {
            bug.favorited = true
            return bug
        })

        // Get projects
        let projQuery = await User.findById(userId, {"projects":{$slice:[0, PREVIEWS_PER_PAGE]}})
        .populate({
            path: 'projects',
            populate: {
                path: 'owner',
                select: 'username'
            },
            select: '-bugs -members'
        })

        const package = {
            bugs: favQuery.favorites,
            projects: projQuery.projects
        }
        res.send(package)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.get('', (req, res) => {
    if(req.session.user){
        return res.send(req.session.user)
    }
    res.status(401).send("No session")
})

// Get user profile
router.get('/:id', async (req, res) => {
    try {
        const foundUser = await User.findById(req.params.id)
            .populate('profile')
            .select('profile username created')
            
        res.send(foundUser)
    } catch (err) {
        res.status(400)
    }
})

// Search users
router.get('/users/search', async (req, res) => {
    try {
        // Get query params
        let { q, page } = req.query
        page = page || 1
        q = q || ''
        // Do the query
        const userSearch = await User.find({
            $text: {
                $search: q
            }
        })
        .select('username _id')
        // Paginate query results
        const totalPages = Math.ceil(userSearch.length/USERS_PER_PAGE)
        const indexStart = (page-1)*USERS_PER_PAGE
        const users = paginateList(userSearch, indexStart, indexStart+USERS_PER_PAGE)
        // Send package
        const package={
            totalPages,
            users
        }
        res.send(package)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.get('/users/:page', async (req, res) => {
    try {
        const indexStart = (req.params.page-1)*USERS_PER_PAGE
        const totalUsers = await User.find().countDocuments()
        const totalPages = Math.ceil(totalUsers/USERS_PER_PAGE)
        const users = await User.find().skip(indexStart).limit(USERS_PER_PAGE).select('username _id')
        const package = {
            totalPages: totalPages,
            users
        }
        res.send(package)
    } catch (err) {
        res.status(404).send("No users here")
    }
})

// Get paginated user invites
router.get('/invites/:page', checkAuth, async (req, res) => {
    try {
        const foundUser = await User.findById(req.session.user.userId)

        const totalPages = Math.ceil(foundUser.invites.length/INVITES_PER_PAGE)
        const page = req.params.page
        if(page <=0 || page > totalPages){
            throw new Error("Out of bounds")
        }
        const indexStart = (page-1)*INVITES_PER_PAGE

        let query = await User.findById(req.session.user.userId, {"invites":{$slice:[indexStart, INVITES_PER_PAGE]}})
        .populate({
            path: 'invites',
            populate: {
                path: 'owner',
                select: 'username'
            },
            select: 'title created'
        })

        const package = {
            totalPages,
            invites: query.invites
        }

        res.send(package)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

// Remove invite
router.delete('/invites/:projectId', checkAuth, async (req, res) => {
    try {
        const foundUser = await User.findById(req.session.user.userId)

        let updatedInvites = foundUser.invites.filter(inv => inv._id != req.params.projectId)

        await User.updateOne(
            {_id: req.session.user.userId}, 
            { invites: updatedInvites}
        )

        res.send(false)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

// Get paginated user favorites
router.get('/favorites/:page', checkAuth, async (req, res) => {
    try {
        const foundUser = await User.findById(req.session.user.userId)

        const totalPages = Math.ceil(foundUser.favorites.length/BUGS_PER_PAGE)
        const page = req.params.page
        if(page <=0 || page > totalPages){
            throw new Error("Out of bounds")
        }
        const indexStart = (page-1)*BUGS_PER_PAGE

        let query = await User.findById(req.session.user.userId, {"favorites":{$slice:[indexStart, BUGS_PER_PAGE]}})
            .populate({
                path: 'favorites',
                populate: {
                    path: 'author',
                    select: 'username'
                },
                select: '-comments'
            })

        // Set favorited
        query.favorites = query.favorites.map(bug => {
            bug.favorited = true
            return bug
        })

        const package = {
            totalPages,
            bugs: query.favorites
        }

        res.send(package)
    } catch (err) {
        console.log(err.message)
        res.status(400).send(err.message)
    }
})

router.get('/projects/:page', async (req, res) => {
    try {
        if(!req.session.user){
            throw new Error('You aren\'t logged in')
        }

        const foundUser = await User.findById(req.session.user.userId)


        const totalPages = Math.ceil(foundUser.projects.length/PROJECTS_PER_PAGE)
        const page = req.params.page
        if(page <=0 || page > totalPages){
            throw new Error("Out of bounds")
        }
        const indexStart = (page-1)*PROJECTS_PER_PAGE
        let query = await User.findById(req.session.user.userId, {"projects":{$slice:[indexStart, PROJECTS_PER_PAGE]}})
            .populate({
                path: 'projects',
                populate: {
                    path: 'owner',
                    select: 'username'
                },
                select: '-bugs -members'
            })
        const package = {
            totalPages,
            projects: query.projects
        }

        res.send(package)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

module.exports = router

