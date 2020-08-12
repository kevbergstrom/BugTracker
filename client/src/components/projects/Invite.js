import React from 'react'

const Invite = ({ 
    title,
    options
}) => {

    return( 
        <div className="container-fluid">
            <div className="container-fluid  contentColor shadow rounded border">
                <p>{title}</p>
                {options ? 
                    options
                : null }
            </div>
        </div>
    )
}

export default Invite