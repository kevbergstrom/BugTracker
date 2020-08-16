import React from 'react'

const ErrorBar = props => {
    return(
        <div className="alert alert-danger">
            {props.children}
        </div>
    )
}

export default ErrorBar