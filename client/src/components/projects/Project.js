import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Spinner from '../spinner/Spinner'
import SidebarPage from '../layout/SidebarPage'
import ProjectPage from './ProjectPage'
import DeleteModal from '../modals/DeleteProject'


const options = (auth, ownerId, projectId, setModal) => {
    if(!auth.user){
        return
    }
    if(auth.user.userId !== ownerId){
        return
    }
    return(
        <div className="d-flex justify-content-between">
            <Link className="btn btn-primary text-white" to={`/project/${projectId}/edit`}>Edit</Link>
            <button className="btn btn-danger text-white" onClick={() => setModal(true)}>Delete</button>
        </div>)
}

const Project = ({ match, auth, history }) => {
    const [loading, setLoading] = useState(true)
    const [project, setProject] = useState()
    const [modal, setModal] = useState(false)

    useEffect(()=>{
        (async function () {
            try {
                const res = await axios.get(`/api/project/${match.params.id}`)
                setProject(res.data)
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
                        {...project} /> 
                    : <p>couldnt load project</p>
                }
            </SidebarPage>
        </>
    )
}

const mapStateToProps = state => ({
    auth: state.authReducer
})

export default connect(mapStateToProps)(Project)