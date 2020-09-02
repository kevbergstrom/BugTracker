import React from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { confirmLink } from './utility'

const DESC_LENGTH = 100

const ProjectPreview = ({
    bugCount,
    languages,
    _id,
    title,
    desc,
    owner,
    link,
    created,
    isPrivate,
    fake
}) => {
    return(
        <div className="container-fluid">
            <div className="container-fluid contentColor shadow rounded border">
                <div className="d-flex justify-content-between">
                    <h4 id={`project${_id}`} >{title}&nbsp;
                    {isPrivate ? <span className="badge badge-warning">Private</span>
                        : <span className="badge badge-primary">Public</span>}
                    </h4>
                </div>
                <hr/>
                <p>
                    Owner:
                    {!fake ? <Link to={`/user/${owner._id}`}>&nbsp;{owner.username}</Link>
                    : <a href="#!">&nbsp;{owner.username}</a>}
                    <span className="float-right"><Moment format="MMM Do, YYYY LT">{created}</Moment></span>
                </p>
                {link && <p>
                    Project Link:
                    <a href={confirmLink(link)}>&nbsp;{confirmLink(link)}</a>
                </p>}
                <p>
                {languages.map((lang, i) => <span key={i} className="badge badge-primary">{lang}</span>)}
                </p>
                <p>{`${desc.slice(0,DESC_LENGTH)}${desc.length>0 && desc.length>DESC_LENGTH ? '...' : ''}`}</p>
                {!fake ? <Link className="btn btn-primary text-white" to={`/project/${_id}`}>View</Link>
                : <a className="btn btn-primary text-white">View</a>}
            </div>
        </div>
    )
}

export default ProjectPreview