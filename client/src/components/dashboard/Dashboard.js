import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'

import SidebarPage from '../layout/SidebarPage'
import Header from './Header'
import Loader from '../layout/Loader'
import BugPreview from '../bugs/BugPreview'
import ProjectPreview from '../projects/ProjectPreview'

const Dashboard = ({ user }) => {
    const [loading, setLoading] = useState(true)
    const [favorites, setFavorites] = useState()
    const [projects, setProjects] = useState()

    useEffect(()=>{
        (async () => {
            try {
                const res = await axios.get(`/api/user/dashboard`)
                setFavorites(res.data.bugs)
                setProjects(res.data.projects)
            } catch (err) {
                console.log(err)
            }
            setLoading(false)
        })()
    },[])

    return(
        <SidebarPage>
            <Header>Welcome back {user.username}!</Header>
            <Loader loading={loading}>
                <div className="container-fluid">
                    <div className="container-fluid contentColor shadow rounded border">
                        {favorites ? 
                            <>
                                <div className="d-flex justify-content-between">
                                    <h4>Recent Favorites</h4>
                                </div>
                                {favorites ? 
                                    favorites.map(fav => 
                                        <BugPreview key={fav._id} {...fav}/>
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
                                        <ProjectPreview key={i} {...proj}/>
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
                            <Link className='btn btn-primary' to={`/user/${user.userId}`}>View</Link>
                        </div>
                    </div>
                </div>
            </Loader>
        </SidebarPage>
    )
}

const mapStateToProps = state => ({
    user: state.authReducer.user
})

export default connect(mapStateToProps)(Dashboard)