import React from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

import FavoriteBug from './FavoriteBug'
import BugHeader from './BugHeader'

const DESC_LENGTH = 20

const BugPreview = ({
    _id,
    created,
    author,
    title,
    desc,
    number,
    project,
    stage,
    favorited
}) => {
    return(
        <div className="container-fluid">
            <div className="card shadow">
                <BugHeader title={title} number={number} stage={stage}/>
                <div className="card-body">
                    <p>
                        Author:
                        <Link to={`/user/${author._id}`}>&nbsp;{author.username}</Link>
                    <span className="float-right"><Moment format="MMM Do, YYYY LT">{created}</Moment></span>
                    </p>
                    <p>{desc.slice(0,DESC_LENGTH)}</p>
        
                    <div className="d-flex justify-content-between">
                        <Link className={`btn favBtn-${stage} text-white`} to={`/project/${project}/bug/${_id}`}>View</Link>
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