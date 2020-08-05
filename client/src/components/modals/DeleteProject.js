import React from 'react'
import axios from 'axios'
import Modal from './Modal'

const deleteConfirmed = async (_id, history) =>{
    try {
        await axios.delete(`/api/project/${_id}`)
        history.push('/dashboard')
    } catch (err) {
        console.log(err)
    }
}

const DeleteProject = ({ _id, closeModal, history }) => {
    return(
    <Modal>
            <div className="text-center">
                <h3>Delete Project</h3>
            </div>
            <hr/>
            <p>Are you sure you want to delete this project? This action can't be undone.</p>
            <hr/>
            <div className="d-flex justify-content-between">
                <button className='btn btn-success' onClick={() => deleteConfirmed(_id, history)}>Yes</button>
                <button className='btn btn-danger' onClick={() => closeModal()}>No</button>
            </div>
    </Modal>
    )
}

export default DeleteProject