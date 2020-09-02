import React from 'react'

const ScreenMessage = ({ title, text }) => {
    return (
        <div className="container h-100 screenMessage">
            <div className="row align-items-center h-100">
                <div className="mx-auto justify-content-center">
                    <div className="border shadow bg-white rounded">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{title}</h5>
                                <hr/>
                                <p className="card-text">{text}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScreenMessage