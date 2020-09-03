import React from 'react'

import ProjectResults from './facades/Projects'
import Project from './facades/Project'
import Bugs from './facades/Bugs'
import Bug from './facades/Bug'

const pages = {
    'projects': <ProjectResults/>,
    'project': <Project/>,
    'bugs': <Bugs/>,
    'bug': <Bug/>
    
}

const generatePage = page => {
    return pages[page] || null
}

const Pages = ({ page, ...props }) => {
    let newPage = generatePage(page)
    if(newPage){
        return React.cloneElement(newPage, {...props})
    }
    return newPage
}

export default Pages