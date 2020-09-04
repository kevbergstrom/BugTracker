import React from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

import FavoriteBug from './FavoriteBug'
import BugHeader from './BugHeader'

const DESC_LENGTH = 100

const BugPreview = ({
    _id,
    created,
    author,
    title,
    desc,
    number,
    project,
    stage,
    favorited,
    fake
}) => {
    return(
        <div id={`bug${_id}`}className="container-fluid">
            <div className="card shadow">
                <BugHeader title={title} number={number} stage={stage}/>
                <div className="card-body">
                    <p>
                        Author:
                        {!fake ? <Link to={`/user/${author._id}`}>&nbsp;{author.username}</Link>
                        : <a href="#!">&nbsp;{author.username}</a>}
                    <span className="float-right"><Moment format="MMM Do, YYYY LT">{created}</Moment></span>
                    </p>
                    <p>{`${desc.slice(0,DESC_LENGTH)}${desc.length>0 && desc.length>DESC_LENGTH ? '...' : ''}`}</p>
        
                    <div className="d-flex justify-content-between">
                        {!fake ? <Link className={`btn favBtn-${stage} text-white`} to={`/project/${project}/bug/${_id}`}>View</Link>
                        : <a className={`btn favBtn-${stage} text-white`} href="#!">View</a>}
                        <FavoriteBug 
                            favorited={favorited} 
                            projectId={project} 
                            bugId={_id}
                            stage={stage}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BugPreview