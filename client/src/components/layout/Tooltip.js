import React from 'react'

const Tooltip = ({ text, title, hidden }) => {
    return (
        <div id="tooltip" className={`border shadow bg-white rounded tooltipCustom ${hidden ? 'invisible' : ''}`} role="tooltip">
            <div className='card'>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <hr/>
                    <p className="card-text">{text}</p>
                </div>
            </div>
        </div>
    )
}

export default Tooltip