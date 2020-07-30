import React from 'react'

const Footer = props => {
    return (
        <footer className="footer bg-light border-top">
            <nav className="navbar navbar-light">
                <span className="text-muted">Made by <a href="https://www.linkedin.com/in/kevbergstrom/">Kevin Bergstrom</a></span>
                <span className="text-muted float-right">View this project on <a href="https://github.com">Github</a></span>
            </nav>
        </footer>
    )
}

export default Footer