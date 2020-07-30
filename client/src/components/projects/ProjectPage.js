import React from 'react'

import RecentUsers from '../users/RecentUsers'
import BugPreview from '../bugs/BugPreview'

const ProjectPage = ({
    bugCount,
    members,
    languages,
    _id,
    title,
    desc,
    owner,
    bugs,
    created,
    auth
},...props) => {

    const options = (auth, _id) => {
        if(!auth.user){
            return
        }
        if(auth.user._id != _id){
            return
        }
        return(
            <div className="d-flex justify-content-between">
                <a className="btn btn-primary text-white">Edit</a>
                <a className="btn btn-danger text-white">Delete</a>
            </div>)
    }

    return (
        <div className="container-fluid">
            <div className="container-fluid  contentColor shadow rounded border">
                <div className="d-flex justify-content-between">
                    <h4>{title}&nbsp;
                        {props.private ? <span className="badge badge-warning">Private</span>
                        : <span className="badge badge-primary">Public</span>}
                    </h4>
                    <a className="btn btn-primary text-white">Join</a>
                </div>
                <hr/>
                <p>
                    Owner:
                    <a href="#">{owner.username}</a>
                    <span className="float-right">Date</span>
                </p>
                <p>
                    Project Link:
                    <a href="#">github.com</a>
                </p>
                <p>
                    {languages.map((lang, i) => <span key={i} className="badge badge-primary">{lang}</span>)}
                </p>
                <p>{desc}</p>

                <h4>Recent Members</h4>
                <RecentUsers users={members}/>
                <p></p>
                <div className="text-center">
                    <a className="btn btn-primary text-white">View Members</a>
                </div>

                <h4>Recent Bugs</h4>
                <div className="container-fluid">
                {bugs.map(bug => <BugPreview key={bug._id} projectId={_id} {...bug}/>)}
                </div>
                <p></p>
                <div className="text-center">
                    <a className="btn btn-primary text-white">View Bugs</a>
                </div>
                <hr/>
                {options(auth, _id)}
            </div>
        </div>
    )
}

export default ProjectPage