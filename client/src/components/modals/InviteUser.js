import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Modal from './Modal'

import Loader from '../layout/Loader'

const inviteUser = async (userId, projectId) => {
    try {
        await axios.post(`/api/project/${projectId}/invite/${userId}`)
    } catch (err) {
        console.log(err)
    }
}

const inviteButton = (userId, projectId, title, closeModal) => {
    return (
            <div key={projectId} className="container-fluid d-flex justify-content-between">
                <p>{title}</p>
                <button className='btn btn-success' onClick={() => {inviteUser(userId, projectId);closeModal()}}>Invite</button>
            </div>
    )
}

const InviteUser = ({ userId, closeModal }) => {
    const [loading, setLoading] = useState(true)
    const [projects, setProjects] = useState()

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get('/api/user/projects')
                setProjects(res.data)
            } catch (err) {
                console.log(err)
            }
            setLoading(false)
        })()
    },[])
    
    return (
        <Modal>
            <div className="text-center">
                <h3>Invite User</h3>
            </div>
            <hr/>
            <Loader loading={loading}>
                {projects ?
                    <div className="container-fluid modalScrollBox">
                        {projects.map(proj => inviteButton(userId, proj._id, proj.title, closeModal))}
                    </div>
                : null }
            </Loader>
            <hr/>
            <div className="d-flex justify-content-between">
                <p></p>
                <button className='btn btn-danger' onClick={() => closeModal()}>Cancel</button>
            </div>
        </Modal>
    )
}

export default InviteUser