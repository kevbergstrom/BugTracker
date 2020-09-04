import React from 'react'
import { filterText } from './utils'

const ScreenMessage = ({ title, text }) => {
    return (
        <div className="container h-100 screenMessage">
            <div className="row align-items-center h-100">
                <div className="mx-auto justify-content-center">
                    <div className="shadow rounded">
                        <div className="card bg-dark text-white">
                            <div className="card-body">
                                <h5 className="card-title">{filterText(title)}</h5>
                                <hr className="border-white"/>
                                <p className="card-text">{filterText(text)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScreenMessage