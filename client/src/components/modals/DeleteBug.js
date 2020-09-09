import React, { useState } from 'react'
import axios from 'axios'
import Modal from './Modal'

const DeleteBug = ({ projectId, bugId, closeModal, history }) => {
    const [waiting, setWaiting] = useState(false)

    const deleteConfirmed = async () =>{
        setWaiting(true)
        try {
            await axios.delete(`/api/project/${projectId}/bug/${bugId}`)
            history.push(`/project/${projectId}`)
        } catch (err) {
            console.log(err)
        }
        setWaiting(false)
    }

    return(
        <Modal>
            <div className="text-center">
                <h3>Delete Bug</h3>
            </div>
            <hr/>
            <p>Are you sure you want to delete this bug? This action can't be undone.</p>
            <hr/>
            <div className="d-flex justify-content-between">
                <button className={`btn btn-success`} disabled={waiting} onClick={() => deleteConfirmed()}>Yes</button>
                <button className='btn btn-danger' onClick={() => closeModal()}>No</button>
            </div>
        </Modal>
    )
}

export default DeleteBug