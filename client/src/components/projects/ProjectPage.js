import React from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { confirmLink } from './utility'

import RecentUsers from '../users/RecentUsers'
import BugPreview from '../bugs/BugPreview'

const ProjectPage = ({
    bugCount,
    members,
    languages,
    _id,
    title,
    desc,
    link,
    owner,
    bugs,
    created,
    auth,
    options,
    membershipOptions,
    joined,
    isPrivate,
    fake
}) => {
    return (
        <div className="container-fluid">
            <div className="container-fluid  contentColor shadow rounded border">
                <div className="d-flex justify-content-between">
                    <h4>{title}&nbsp;
                        {isPrivate ? <span className="badge badge-warning">Private</span>
                        : <span className="badge badge-primary">Public</span>}
                    </h4>
                    <div>{membershipOptions}</div>
                </div>
                <hr/>
                <p>
                    Owner:
                    {!fake ? <Link to={`/user/${owner._id}`}>&nbsp;{owner.username}</Link>
                    : <a href='#!'>&nbsp;{owner.username}</a>}
                    <span className="float-right"><Moment format="MMM Do, YYYY LT">{created}</Moment></span>
                </p>
                {link && <p>
                    Project Link:
                    <a href={confirmLink(link)}>&nbsp;{confirmLink(link)}</a>
                </p>}
                <p id="languageIcons">
                    {languages.map((lang, i) => <span key={i} className="badge badge-primary">{lang}</span>)}
                </p>
                <p>{desc}</p>

                <div className="text-center">
                    {auth.user && joined ? <Link className="btn btn-primary text-white" to={`/project/${_id}/create-bug`}>Add Bug</Link>
                    : null }
                </div>

                <h4>Recent Members</h4>
                <RecentUsers users={members}/>
                <p></p>
                <div className="text-center">
                    {!fake ? <Link id="membersButton" className="btn btn-primary text-white" to={`/project/${_id}/members/1`}>View Members</Link>
                    : <a id="membersButton" className="btn btn-primary text-white" href="#!">View Members</a>}
                </div>

                { bugCount > 0 ?
                    <>
                        <h4>Recent Bugs</h4>
                        <div className="container-fluid">
                        {bugs.map(bug => <BugPreview key={bug._id} fake={fake} {...bug}/>)}
                        </div>
                        <p></p>
                        <div className="text-center">
                            {!fake ? <Link id="bugsButton" className="btn btn-primary text-white" to={`/project/${_id}/bugs/1`}>View {bugCount} Bugs</Link>
                            : <a id="bugsButton" className="btn btn-primary text-white" href="#!">View {bugCount} Bugs</a>}
                        </div>
                        <hr/>
                    </>
                    : null
                }
                {options}
            </div>
        </div>
    )
}

export default ProjectPage