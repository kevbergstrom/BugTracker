import React from 'react'

import Header from '../../dashboard/Header'
import BugPreview from '../../bugs/BugPreview'
import ProjectPreview from '../../projects/ProjectPreview'
import bugsData from './Bugs.json'
import projectsData from './Projects.json'

const favorites = bugsData.slice(0,3)
const projects = projectsData.slice(0,3)
const user = {username:'username'}

const Dashboard = props => {
    return(
        <>
            <Header>Welcome back {user.username}!</Header>
                <div className="container-fluid">
                    <div className="container-fluid contentColor shadow rounded border">
                        {favorites ? 
                            <>
                                <div className="d-flex justify-content-between">
                                    <h4>Recent Favorites</h4>
                                </div>
                                {favorites ? 
                                    favorites.map(fav => 
                                        <BugPreview key={fav._id} fake {...fav}/>
                                    )
                                : null}
                                <hr/>
                            </>
                        : null}
                        {projects ?
                            <>
                                <div className="d-flex justify-content-between">
                                    <h4>Recent Projects</h4>
                                </div>
                                {projects?
                                    projects.map((proj, i) => 
                                        <ProjectPreview key={i} fake {...proj}/>
                                    )
                                : null}
                                <hr/>
                            </>
                        : null }
                        {!favorites &&  !projects ? 
                            <h4>Go join a project or favorite a bug!</h4>
                        : null}
                        <div className="d-flex justify-content-between">
                            <h4>View profile</h4>
                            <a className='btn btn-primary text-white'>View</a>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default Dashboard