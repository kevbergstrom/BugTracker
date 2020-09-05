import React from 'react'
import ProjectPage from '../../projects/ProjectPage'
import projects from './Projects.json'
import bugs from './Bugs.json'

const project = projects[0]
project.bugs = bugs.slice(0,3)

const membershipOptions = () => {
    return <a href="#!" id="joinButton" className="btn btn-primary text-white">Join</a>
}

const Project = props => {
    return (
        <ProjectPage 
        options={()=>{}}
        membershipOptions={membershipOptions()}
        auth={{user:null}}
        fake={true}
        {...project} /> 
    )
}

export default Project