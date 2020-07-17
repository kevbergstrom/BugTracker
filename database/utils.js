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

module.exports = {
    getProjectById,
    getBugById
}