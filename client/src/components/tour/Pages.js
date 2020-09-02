import React from 'react'

import ProjectResults from './facades/Projects'

const generatePage = page => {
    switch(page){
        case 'projects':
            return <ProjectResults/>
        default:
            return <></>
    }
}

const Pages = ({ page }) => {
    return generatePage(page)
}

export default Pages