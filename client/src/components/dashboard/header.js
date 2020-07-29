import React from 'react'

const Header = props => {
    return(
        <div class="container-fluid">
            <div class="container-fluid text-center border shadow rounded gradient-dash text-white">
                <p></p>
                <h1>{props.children}</h1>
                <p></p>
            </div>
        </div>
    )
}

export default Header