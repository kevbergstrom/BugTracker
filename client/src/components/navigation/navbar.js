import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Navbar = ({ isAuthenticated }) => {
    return (
        <nav className="navbar navbar-expand-lg navbarColor shadow">
            <Link className="nav-link darkText" to="/"><h6>BugTracker</h6></Link>
            <ul className="navbar-nav mr-auto">
            </ul>
            {isAuthenticated ? 
                <>
                    <Link className="nav-link darkText" to="/dashboard"><h6>Dashboard</h6></Link>
                    <Link className="nav-link darkText" to="/logout"><h6>Logout</h6></Link>
                </>
                : <>
                    <Link className="nav-link darkText" to="/signup"><h6>Sign up</h6></Link>
                    <Link className="nav-link darkText" to="/login"><h6>Login</h6></Link>
                </>
            }
            <Link className="nav-link darkText" to="/about"><h6>About</h6></Link>
            <a className="nav-link darkText" href="https://github.com"><h6>Github</h6></a>
          </nav>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated
})

export default connect(mapStateToProps)(Navbar)