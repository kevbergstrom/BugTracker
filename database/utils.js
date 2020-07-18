const Project = require('../models/Project')

const getProjectById = async function(projectId){
    let foundProject = await Project.findById(projectId).populate('owner', ['username'])
    if(!foundProject) {
        throw new Error('Cannot find project')
    }
    return foundProject
}

const getBugById = async function(projectId, bugId){
    const foundProject = await getProjectById(projectId)
    let foundBug = await foundProject.bugs.find(bug => bug.id === bugId)
    if(!foundBug) {
        throw new Error('Cannot find bug')
    }
    return { foundBug, foundProject }
}

const getCommentById = async function(projectId, bugId, commentId){
    const { foundBug, foundProject } = await getBugById(projectId, bugId)
    let foundComment = await foundBug.comments.find(com => com.id === commentId)
    if(!foundComment) {
        throw new Error('Cannot find comment')
    }
    return { foundComment, foundBug, foundProject }
}

const checkUserPermission = function(project, userId){
    if(project.private && project.members.indexOf(`${userId}`)<0){
        throw new Error('You do not have permission for this project')
    }
}

const checkOwner = function(project, userId){
    if(project.owner.id != userId){
        throw new Error('You do not have permission to edit this project')
    }
}

module.exports = {
    getProjectById,
    getBugById,
    getCommentById,
    checkUserPermission,
    checkOwner
}