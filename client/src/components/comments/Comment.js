import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

const options = (auth, ownerId) => {
    if(!auth.user){
        return
    }
    if(auth.user.userId !== ownerId){
        return
    }
    return(
        <div className="text-right">
            <a className="btn btn-danger text-white" href="#!">Delete</a>
        </div>)
}

const Comment = ({ 
    created,
    _id,
    author,
    desc,
    name,
    auth
}) => {
    return(
        <div className="container-fluid contentColor rounded shadow border mb-4">
            <Link to={`/user/${author}`}>{name}</Link>
            <span className="float-right"><Moment format="MMM Do, YYYY LT">{created}</Moment></span>
            <p>{desc}</p>
            {options(auth, author)}
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.authReducer
})

export default connect(mapStateToProps)(Comment)