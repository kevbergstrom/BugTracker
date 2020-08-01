import React from 'react'
import { Link } from 'react-router-dom'

const UserPreview = ({ username, _id, remove }) => {
    return(     
        <div className="container-fluid">
            <div className="container-fluid  contentColor shadow rounded border">
                <div className="d-flex justify-content-between">
                    <Link to={`/user/${_id}`}>{username}</Link>
                    {remove && <a className="btn btn-danger text-white" href="#!">Remove</a>}
                </div>
            </div>
        </div>
    )
}

export default UserPreview