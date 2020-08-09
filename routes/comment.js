const express = require('express')
const router = express.Router({mergeParams: true})
const { checkAuth } = require('../middleware/auth')
const { 
    getBugById,
    getCommentById,
    checkUserPermission} = require('../database/utils')

const COMMENTS_PER_PAGE = 5

// Get paginated comments on a bug
router.get('/results/:page', async (req, res) => {
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

// Post a comment on a bug 
router.post('', checkAuth, async (req, res) => {
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
        await foundBug.save()
        
        res.send(newComment)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

// Remove comment from a bug
router.delete('/:commentId', checkAuth, async (req, res) => {
    try {
        let { foundComment, foundBug, foundProject } = await getCommentById(req.params.projectId, req.params.bugId, req.params.commentId)
        checkUserPermission(foundProject, req.session.user && req.session.user.userId)
        // check user permission
        if(foundComment.author != req.session.user.userId){
            throw new Error('You dont have permission to delete this comment')
        }
        foundBug.comments = foundBug.comments.filter(com => com.id != req.params.commentId)
        await foundBug.save()
        res.status(200).send('OK')
    } catch (err) {
        res.status(400).send(err.message)
    }
})

module.exports = router