import React from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

const DESC_LENGTH = 20

const BugPreview = ({
    _id,
    created,
    author,
    title,
    desc,
    number,
    project
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
                        <a className="text-danger" href="#!">
                            <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-star" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BugPreview