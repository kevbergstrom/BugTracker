import React from 'react'

import Results from '../../layout/Results'
import ProjectPreview from '../../projects/ProjectPreview'
import SearchBar from '../../search/SearchBar'
import projects from './Projects.json'

const PAGE_OPTIONS = 5

const totalPages = 10

const ProjectResults = props => {
    return (
            <Results        
                generateURL={()=>{}}        
                currentPage={1}
                pageOptions={PAGE_OPTIONS}
                totalPages={totalPages}
                header={                
                    <div className="d-flex justify-content-between">
                        <h4>Projects</h4>
                        <SearchBar onSearch={()=>{}}/>
                    </div>
                }>
                {projects.map((proj, i) => 
                    <ProjectPreview key={i} fake={true} {...proj}/>
                )}
            </Results>
    )
}

export default ProjectResults