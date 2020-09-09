import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Modal from './Modal'

import Loader from '../layout/Loader'

const inviteButton = (userId, projectId, title, closeModal, waiting, setWaiting) => {
    return (
            <div key={projectId} className="container-fluid d-flex justify-content-between">
                <p>{title}</p>
                <button className={`btn btn-success `} disabled={waiting} onClick={() => {inviteUser(userId, projectId);closeModal()}}>Invite</button>
            </div>
    )
}

const inviteUser = async (userId, projectId, setWaiting) => {
    setWaiting(true)
    try {
        await axios.post(`/api/project/${projectId}/invite/${userId}`)
    } catch (err) {
        console.log(err)
    }
    setWaiting(false)
}

const InviteUser = ({ userId, closeModal }) => {
    const [loading, setLoading] = useState(true)
    const [projects, setProjects] = useState()
    const [waiting, setWaiting] = useState(false)

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
                        {projects.map(proj => inviteButton(userId, proj._id, proj.title, closeModal, waiting, setWaiting))}
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