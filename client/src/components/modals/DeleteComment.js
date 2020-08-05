import React from 'react'
import axios from 'axios'
import Modal from './Modal'

const deleteConfirmed = async (projectId, bugId, commentId) =>{
    try {
        await axios.delete(`/api/project/${projectId}/bug/${bugId}/comment/${commentId}`)
        window.location.reload(false)// not the best option
    } catch (err) {
        console.log(err)
    }
}

const DeleteComment = ({ projectId, bugId, commentId, closeModal}) => {
    return (
        <Modal>
            <div className="text-center">
                <h3>Delete Comment</h3>
            </div>
            <hr/>
            <p>Are you sure you want to delete this comment? This action can't be undone.</p>
            <hr/>
            <div className="d-flex justify-content-between">
                <button className='btn btn-success' onClick={() => deleteConfirmed(projectId, bugId, commentId)}>Yes</button>
                <button className='btn btn-danger' onClick={() => closeModal()}>No</button>
            </div>
        </Modal>
    )
}

export default DeleteComment