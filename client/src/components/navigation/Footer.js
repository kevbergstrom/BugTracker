import React from 'react'

const Footer = () => {
    return (
        <>
            <footer className={`bg-light border-top footerCustom`}>
                <nav className="navbar navbar-light">
                    <span className="text-muted">Made by <a href="https://www.linkedin.com/in/kevbergstrom/">Kevin Bergstrom</a></span>
                    <span className="text-muted float-right">View this project on <a href="https://github.com/kevbergstrom/BugTracker">Github</a></span>
                </nav>
            </footer>
            <footer className={`bg-light border-top invisible`}>
                <nav className="navbar navbar-light">
                    <span className="text-muted">Made by <p>Kevin Bergstrom</p></span>
                    <span className="text-muted float-right">View this project on <p>Github</p></span>
                </nav>
            </footer>
        </>
    )
}

export default Footer