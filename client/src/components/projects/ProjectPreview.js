import React from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

const DESC_LENGTH = 20

const ProjectPreview = ({
    bugCount,
    languages,
    _id,
    title,
    desc,
    owner,
    created
}, ...props) => {
    return(
        <div className="container-fluid">
            <div className="container-fluid contentColor shadow rounded border">
                <div className="d-flex justify-content-between">
                    <h4>{title}&nbsp;
                    {props.private ? <span className="badge badge-warning">Private</span>
                        : <span className="badge badge-primary">Public</span>}
                    </h4>
                </div>
                <hr/>
                <p>
                    Owner:
                    <Link to={`/user/${owner._id}`}>&nbsp;{owner.username}</Link>
                    <span className="float-right"><Moment format="MMM Do, YYYY LT">{created}</Moment></span>
                </p>
                <p>
                    Project Link:
                    <a href="#!">&nbsp;github.com</a>
                </p>
                <p>
                {languages.map((lang, i) => <span key={i} className="badge badge-primary">{lang}</span>)}
                </p>
                <p>{desc.slice(0,DESC_LENGTH)}</p>
                <Link className="btn btn-primary text-white" to={`/project/${_id}`}>View</Link>
            </div>
        </div>
    )
}

export default ProjectPreview