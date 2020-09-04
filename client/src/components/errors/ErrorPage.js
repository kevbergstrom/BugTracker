import React from 'react'

const ErrorPage = props => {
    return (
        <div className="container-fluid py-0 px-0 bgColor">
            <div className="card shadow">
                <div className="card-body">
                     <div className="alert alert-danger">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage