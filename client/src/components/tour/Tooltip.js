import React from 'react'
import { filterText } from './utils'

const Tooltip = ({ text, title, hidden }) => {
    return (
        <div id="tooltip" className={`shadow rounded tooltipCustom ${hidden ? 'invisible' : ''}`} role="tooltip">
            <div className='card bg-dark text-white'>
                <div className="card-body">
                    <h5 className="card-title">{title && filterText(title)}</h5>
                    <hr className="border-white"/>
                    <p className="card-text">{text && filterText(text)}</p>
                </div>
            </div>
        </div>
    )
}

export default Tooltip