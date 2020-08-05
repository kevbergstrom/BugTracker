import React from 'react'
import axios from 'axios'
import Modal from './Modal'

const deleteConfirmed = async (projectId, bugId, history) =>{
    try {
        await axios.delete(`/api/project/${projectId}/bug/${bugId}`)
        history.push(`/project/${projectId}`)
    } catch (err) {
        console.log(err)
    }
}

const DeleteBug = ({ projectId, bugId, closeModal, history }) => {
    return(
        <Modal>
            <div className="text-center">
                <h3>Delete Bug</h3>
            </div>
            <hr/>
            <p>Are you sure you want to delete this bug? This action can't be undone.</p>
            <hr/>
            <div className="d-flex justify-content-between">
                <button className='btn btn-success' onClick={() => deleteConfirmed(projectId, bugId, history)}>Yes</button>
                <button className='btn btn-danger' onClick={() => closeModal()}>No</button>
            </div>
        </Modal>
    )
}

export default DeleteBug