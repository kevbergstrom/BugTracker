import React from 'react'

const Navbar = props => {
    return (
        <nav className="navbar navbar-expand-lg navbarColor shadow">
            <a className="nav-link darkText"><h6>BugTracker</h6></a>
              <ul className="navbar-nav mr-auto">
              </ul>
              {/* not logged in */}
              <a className="nav-link darkText"><h6>Login</h6></a>
              {/* logged in */}
              <a className="nav-link darkText"><h6>Dashboard</h6></a>

              <a className="nav-link darkText"><h6>Home</h6></a>
              <a className="nav-link darkText"><h6>About</h6></a>
              <a className="nav-link darkText" href="https://github.com"><h6>Github</h6></a>
          </nav>
    )
}

export default Navbar