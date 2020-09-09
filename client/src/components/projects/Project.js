import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Spinner from '../spinner/Spinner'
import SidebarPage from '../layout/SidebarPage'
import ProjectPage from './ProjectPage'
import DeleteModal from '../modals/DeleteProject'
import ErrorPage from '../errors/ErrorPage'


const options = (auth, ownerId, projectId, setModal) => {
    if(!auth.user){
        return
    }
    if(auth.user.userId !== ownerId){
        return
    }
    // Check if the user is also the owner of the project
    return(
        <div className="d-flex justify-content-between">
            <Link className="btn btn-primary text-white" to={`/project/${projectId}/edit`}>Edit</Link>
            <button className="btn btn-danger text-white" onClick={() => setModal(true)}>Delete</button>
        </div>)
}

const joinProject = async (projectId, setJoined) => {
    try {
        await axios.post(`/api/project/${projectId}/join`)
        setJoined(true)
    } catch (err) {
        console.log(err)
    }
}

const leaveProject = async (auth, projectId, setJoined, project, setProject) => {
    try {
        await axios.delete(`/api/project/${projectId}/leave`)
        setJoined(false)
        setProject({
            ...project,
            members: project.members.filter(user => user._id !== auth.user.userId)
            })
    } catch (err) {
        console.log(err)
    }
}

const membershipOptions = (auth, ownerId, projectId, joined, setJoined, project, setProject) => {
    if(!auth.user){
        return
    }
    // The owner cannot leave the project
    if(auth.user.userId === ownerId){
        return
    }
    if(joined){
        return <button className="btn btn-danger text-white" onClick={() => leaveProject(auth, projectId, setJoined, project, setProject)}>Leave</button>
    }else{
        return <button className="btn btn-primary text-white" onClick={() => joinProject(projectId, setJoined)}>Join</button>
    }
}

const Project = ({ match, auth, history }) => {
    const [loading, setLoading] = useState(true)
    const [project, setProject] = useState()
    const [joined, setJoined] = useState(false)
    const [modal, setModal] = useState(false)

    useEffect(()=>{
        (async function () {
            try {
                const res = await axios.get(`/api/project/${match.params.id}`)
                setProject(res.data)
                setJoined(res.data.joined)
            } catch (err) {
                console.log(err)
            }
            setLoading(false)
        })()
    }, [match.params.id])

    return (
        <>
            {modal ? 
                <DeleteModal 
                    _id={match.params.id}
                    closeModal={() => setModal(false)}
                    history={history}
                />
            : null }
            <SidebarPage>
                {loading ? <Spinner/>
                : project ? 
                    <ProjectPage 
                        auth={auth} 
                        options={options(auth, project.owner._id, project._id, setModal)}
                        membershipOptions={membershipOptions(auth, project.owner._id, project._id, joined, setJoined, project, setProject)}
                        {...project} 
                        joined={joined}/> 
                    : <ErrorPage>Couldn't load project</ErrorPage>
                }
            </SidebarPage>
        </>
    )
}

const mapStateToProps = state => ({
    auth: state.authReducer
})

export default connect(mapStateToProps)(Project)