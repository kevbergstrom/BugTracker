import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'

const options = (isAuthenticated, logout, fake) =>{
    if(fake){
        return (
            <>
                <a className="nav-link darkText" href="#!"><h6>Logout</h6></a>
                <a className="nav-link darkText" href="#!"><h6>Dashboard</h6></a>
                <a id="projectsNav" className="nav-link darkText" href="#!"><h6>Projects</h6></a>
                <a className="nav-link darkText" href="#!"><h6>About</h6></a>
                <a className="nav-link darkText" href="#!"><h6>Github</h6></a>
            </>
        )
    }

    let output = []

    if(isAuthenticated){
        output.push(<a href="#!" className="nav-link darkText" onClick={logout} ><h6>Logout</h6></a>)
        output.push(<Link className="nav-link darkText" to="/dashboard"><h6>Dashboard</h6></Link>)
    }else{
        output.push(<Link className="nav-link darkText" to="/signup"><h6>Sign up</h6></Link>)
        output.push(<Link className="nav-link darkText" to="/login"><h6>Login</h6></Link>)
    }

    output.push(<Link id="projectsNav" className="nav-link darkText" to="/projects/1"><h6>Projects</h6></Link>)
    output.push(<Link className="nav-link darkText" to="/about"><h6>About</h6></Link>)
    output.push(<a className="nav-link darkText" href="https://github.com/kevbergstrom/BugTracker"><h6>Github</h6></a>)

    return output
}

const Navbar = ({ isAuthenticated, logout, openSidebar, fake }) => {
    return (
        <nav id="navbar" className="navbar navbar-light navbarColor shadow">
            {(isAuthenticated && openSidebar) || fake ?
                <button id="sidebarButton" className="navbar-toggler" onClick={openSidebar}>
                    <span className="navbar-toggler-icon"></span>
                </button>
            : null}
            <Link className="nav-link darkText" to="/"><h6>BugTracker</h6></Link>
            <ul className="navbar-nav mr-auto">
            </ul>
            {options(isAuthenticated, logout, fake)}
          </nav>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated
})

export default connect(mapStateToProps, { logout })(Navbar)