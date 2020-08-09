import React from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

import FavoriteBug from './FavoriteBug'

const DESC_LENGTH = 20

const BugPreview = ({
    _id,
    created,
    author,
    title,
    desc,
    number,
    project,
    favorited
}) => {
    return(
        <div className="container-fluid">
            <div className="card shadow">
                <div className="card-header gradient-danger">
                    <h4 className="text-white"><span>#{number}&nbsp;</span>
                        {title}
                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-exclamation-circle float-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                        </svg>
                        <span className="float-right">Not Fixed&nbsp;</span>
                    </h4>
                </div>
                <div className="card-body">
                    <p>
                        Author:
                        <Link to={`/user/${author._id}`}>&nbsp;{author.username}</Link>
                    <span className="float-right"><Moment format="MMM Do, YYYY LT">{created}</Moment></span>
                    </p>
                    <p>{desc.slice(0,DESC_LENGTH)}</p>
        
                    <div className="d-flex justify-content-between">
                        <Link className="btn btn-danger text-white" to={`/project/${project}/bug/${_id}`}>View</Link>
                        <FavoriteBug favorited={favorited} projectId={project} bugId={_id}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BugPreview