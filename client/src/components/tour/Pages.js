import React from 'react'

import ProjectResults from './facades/Projects'
import Project from './facades/Project'
import Bugs from './facades/Bugs'
import Bug from './facades/Bug'
import Profile from './facades/Profile'
import Dashboard from './facades/Dashboard'
import CreateProject from './facades/CreateProject'

const pages = {
    'projects': <ProjectResults/>,
    'project': <Project/>,
    'bugs': <Bugs/>,
    'bug': <Bug/>,
    'profile': <Profile/>,
    'dashboard': <Dashboard/>,
    'createProject': <CreateProject/>
}

const generatePage = page => {
    return pages[page] || null
}

const Pages = ({ page, ...props }) => {
    let newPage = generatePage(page)
    if(newPage){
        // Insert the props into the new cloned element
        return React.cloneElement(newPage, {...props})
    }
    return newPage
}

export default Pages