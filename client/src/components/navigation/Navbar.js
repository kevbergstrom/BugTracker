import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'

const Navbar = ({ isAuthenticated, logout }) => {
    return (
        <nav className="navbar navbar-expand-lg navbarColor shadow">
            <Link className="nav-link darkText" to="/"><h6>BugTracker</h6></Link>
            <ul className="navbar-nav mr-auto">
            </ul>
            {isAuthenticated ? 
                <>
                    <a className="nav-link darkText" onClick={logout} href="#!"><h6>Logout</h6></a>
                    <Link className="nav-link darkText" to="/dashboard"><h6>Dashboard</h6></Link>
                </>
                : <>
                    <Link className="nav-link darkText" to="/signup"><h6>Sign up</h6></Link>
                    <Link className="nav-link darkText" to="/login"><h6>Login</h6></Link>
                </>
            }
            <Link className="nav-link darkText" to="/projects/1"><h6>Projects</h6></Link>
            <Link className="nav-link darkText" to="/about"><h6>About</h6></Link>
            <a className="nav-link darkText" href="https://github.com/kevbergstrom/BugTracker"><h6>Github</h6></a>
          </nav>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated
})

export default connect(mapStateToProps, { logout })(Navbar)