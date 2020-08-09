import React from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

import FavoriteBug from './FavoriteBug'
import BugHeader from './BugHeader'

const BugPage = ({    
    _id,
    created,
    author,
    title,
    desc,
    number,
    project,
    commentPage,
    options,
    stage,
    favorited,
    controls
}) => {

    return (
        <div className="container-fluid">
            <div className="card shadow">
                <BugHeader title={title} number={number} stage={stage}/>
                <div className="card-body">
                    <p>
                        Author:
                        <Link to={`/user/${author._id}`}>&nbsp;{author.username}</Link>
                        <span className="float-right"><Moment format="MMM Do, YYYY LT">{created}</Moment></span>
                    </p>
                    <p>
                        Project:
                        <Link to={`/project/${project._id}`}>&nbsp;{project.title}</Link>
                    </p>
                    <p>{desc}</p>

                    <div className="d-flex justify-content-between">
                        {controls}
                        <FavoriteBug 
                            favorited={favorited} 
                            projectId={project._id} 
                            bugId={_id}
                            stage={stage}
                        />
                    </div>
                    {commentPage}
                    {options}
                </div>
            </div>
        </div>
        
    )
}

export default BugPage