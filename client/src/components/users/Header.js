import React from 'react'

const Header = props => {
    return(
        <div className="container-fluid">
            <div className="container-fluid text-center border shadow rounded gradient-profile text-white">
                <p></p>
                <h1>{props.children}</h1>
                <p></p>
            </div>
        </div>
    )
}

export default Header