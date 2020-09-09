const Project = require('../models/Project')
const Bug = require('../models/Bug')

const getProjectById = async function(projectId){
    let foundProject = await Project.findById(projectId).populate('owner', ['username'])
    if(!foundProject) {
        throw new Error('Cannot find project')
    }
    return foundProject
}

const getBugById = async function(projectId, bugId){
    const foundProject = await getProjectById(projectId)
    let foundBug = await Bug.findById(bugId).populate('author', ['username']).populate('project', ['title'])
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
    if(project.isPrivate && project.members.indexOf(`${userId}`)<0){
        throw new Error('You do not have permission for this project')
    }
}

const checkMembership = function(project, userId){
    return project.members.indexOf(`${userId}`)>=0
}

const checkOwner = function(project, userId){
    if(project.owner.id != userId){
        throw new Error('You do not have permission to edit this project')
    }
}

const paginateList = (list, start, end) => {
    const len = list.length
    if(end > len){
        end = len
    }
    if(start < 0){
        start = 0
    }
    if(start > len || start > end){
         return []
    }

    let output = []
    for(let i = start;i<end;i++){
        output.push(list[i])
    }
    return output
}

module.exports = {
    getProjectById,
    getBugById,
    getCommentById,
    checkUserPermission,
    checkOwner,
    paginateList,
    checkMembership
}