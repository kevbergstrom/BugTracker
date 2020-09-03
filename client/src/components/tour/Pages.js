import React from 'react'

import ProjectResults from './facades/Projects'
import Project from './facades/Project'

const pages = {
    'projects': <ProjectResults/>,
    'project': <Project/>
}

const generatePage = page => {
    return pages[page] || null
}

const Pages = ({ page }) => {
    return generatePage(page)
}

export default Pages