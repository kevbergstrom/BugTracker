const express = require('express')
const router = express.Router()
const { checkAuth, noAuth } = require('../middleware/auth')
const { setSession, destroySession } = require('../session')

const { SESSION_NAME } = require('../config')

const User = require('../models/User')
const Bug = require('../models/Bug')

const USERS_PER_PAGE = 20
const BUGS_PER_PAGE = 5

router.post('', noAuth , async (req, res) => {
    try {
        const { email, username, password } = req.body
        const newUser = new User({ email, username, password })
        await newUser.save()

        const sessionUser = setSession(req, newUser)
        res.send(sessionUser)
    } catch (err) {
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

router.get('', (req, res) => {
    if(req.session.user){
        return res.send(req.session.user)
    }
    res.status(401).send("No session")
})

router.get('/checkAuth', checkAuth, (req, res) => {
    res.send('Authorized')
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

// Get paginated user favorites
router.get('/favorites/:page', async (req, res) => {
    try {
        if(!req.session.user){
            throw new Error('You aren\'t logged in')
        }

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

module.exports = router

