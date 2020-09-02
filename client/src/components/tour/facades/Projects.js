import React, { useState, useEffect } from 'react'

import Results from '../../layout/Results'
import ProjectPreview from '../../projects/ProjectPreview'
import SearchBar from '../../search/SearchBar'

const PAGE_OPTIONS = 5

const fakeProjects = [
    {
        "bugCount":7,
        "joined":false,
        "isPrivate":false,
        "languages":["MongoDB","Express","React","Nodejs"],
        "_id":"0",
        "title":"BugTracker",
        "desc":"A tool to help developers keep track of the bugs in their projects.",
        "owner":{
            "username":"username"
        },
        "created":"2020-08-09T07:18:08.109Z",
        "__v":7
    },
    {
        "bugCount":3,
        "joined":false,
        "isPrivate":false,
        "languages":["Python","Flask"],
        "_id":"1",
        "title":"Mountain Search Engine",
        "desc":"A search engine for finding mountains and other large constructs of the world.",
        "owner":{
            "username":"username"
        },
        "created":"2020-08-09T07:18:13.031Z",
        "__v":3
    },
    {
        "bugCount":0,
        "joined":false,
        "isPrivate":false,
        "languages":["Python","TensorFlow","React Native"],
        "_id":"2",
        "title":"Energy Forecast App",
        "desc":"An app that predicts electricity demand in the Pacific Northwest on an hourly basis using machine learning.",
        "owner":{
            "username":"username"
        },
        "created":"2020-08-11T23:25:43.056Z",
        "__v":11
    },
    {
        "bugCount":1,
        "joined":false,
        "isPrivate":false,
        "languages":["c++"],
        "_id":"3",
        "title":"2D Game Engine",
        "desc":"A 2D game engine written in c++ with physics nd shader support.",
        "owner":{
            "username":"username"
        },
        "created":"2020-08-12T06:01:07.041Z",
        "__v":2
    }
]

const ProjectResults = props => {
    const [projects, setProjects] = useState(fakeProjects)
    const [totalPages, setTotalPages] = useState(10)

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