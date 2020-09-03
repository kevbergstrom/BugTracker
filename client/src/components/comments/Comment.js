import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

const Comment = ({ 
    created,
    _id,
    author,
    desc,
    name,
    options,
    auth
}) => {
    return(
        <div id={`comment${_id}`} className="container-fluid contentColor rounded shadow border mb-4">
            {author ? <Link to={`/user/${author}`}>{name}</Link>
            : <a href="#!">{name}</a>}
            <span className="float-right"><Moment format="MMM Do, YYYY LT">{created}</Moment></span>
            <p>{desc}</p>
            {options}
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.authReducer
})

export default connect(mapStateToProps)(Comment)