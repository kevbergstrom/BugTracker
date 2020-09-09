import React, { useState } from 'react'
import axios from 'axios'
import Modal from './Modal'

const DeleteComment = ({ projectId, bugId, commentId, closeModal}) => {
    const [waiting, setWaiting] = useState(false)

    const deleteConfirmed = async () =>{
        setWaiting(true)
        try {
            await axios.delete(`/api/project/${projectId}/bug/${bugId}/comment/${commentId}`)
            window.location.reload(false)// not the best option
        } catch (err) {
            console.log(err)
        }
        setWaiting(false)
    }

    return (
        <Modal>
            <div className="text-center">
                <h3>Delete Comment</h3>
            </div>
            <hr/>
            <p>Are you sure you want to delete this comment? This action can't be undone.</p>
            <hr/>
            <div className="d-flex justify-content-between">
                <button className={`btn btn-success`} disabled={waiting} onClick={() => deleteConfirmed()}>Yes</button>
                <button className='btn btn-danger' onClick={() => closeModal()}>No</button>
            </div>
        </Modal>
    )
}

export default DeleteComment