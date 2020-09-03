import React, { useState } from 'react'
import ProjectPage from '../../projects/ProjectPage'

const fakeProject = 
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
        "members": [
            {
                "username": "user1"
            },
            {
                "username": "user2"
            },
            {
                "username": "user3"
            },
            {
                "username": "user4"
            },
            {
                "username": "user5"
            },
            {
                "username": "user6"
            }
        ],
        "joined":"false",
        "bugs":[
            {
                "stage": 0,
                "favorited": false,
                "_id": "1",
                "author": {
                    "username": "username"
                },
                "title": "Validation test",
                "desc": "I hope this works!\nedit",
                "number": 7,
                "project": "1",
                "created": "2020-08-18T23:12:46.315Z",
                "progress": [],
                "__v": 1
            }
        ],
        "created":"2020-08-09T07:18:08.109Z",
        "__v":7
    }

const options = () => {
    return
}

const membershipOptions = () => {
    return <a id="joinButton" className="btn btn-primary text-white">Join</a>
}

const Project = props => {
    const [project, setProject] = useState(fakeProject)

    return (
        <ProjectPage 
        options={options()}
        membershipOptions={membershipOptions()}
        auth={{user:null}}
        fake={true}
        {...project} /> 
    )
}

export default Project