import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = props => {
    return (
        <nav className="navbar navbar-expand-lg navbarColor shadow">
            <a className="nav-link darkText"><h6>BugTracker</h6></a>
              <ul className="navbar-nav mr-auto">
              </ul>
              {/* not logged in */}
              <Link className="nav-link darkText" to="/login"><h6>Login</h6></Link>
              {/* logged in */}
              <a className="nav-link darkText"><h6>Dashboard</h6></a>

              <Link className="nav-link darkText" to="/"><h6>Home</h6></Link>
              <Link className="nav-link darkText" to="/about"><h6>About</h6></Link>
              <a className="nav-link darkText" href="https://github.com"><h6>Github</h6></a>
          </nav>
    )
}

export default Navbar