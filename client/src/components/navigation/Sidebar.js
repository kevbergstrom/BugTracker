import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../../actions/auth'

import {     
    UserIcon,
    CalenderIcon,
    BinocularsIcon,
    NewIcon,
    BugIcon,
    MailIcon,
    NewUserIcon,
    LogoutIcon
} from './Icons'

const Sidebar = ({ username, userId , logout, open, close }) => {
    return(
        <>
            {open ?
                <nav className="sidebar fixed-top sidebarColor sidebarSize">
                    <div className="sidebar-sticky">
                        <div className="nav-link lightText container-fluid sidebarAlt">
                            <h6><UserIcon/><Link className="lightText" to={`/user/${userId}`}>{username}</Link>
                                <button className="close lightText" onClick={close}>
                                    <span>&times;</span>
                                </button>
                            </h6>
                        </div>

                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <Link className="nav-link lightText sidebarColor" to="/dashboard">
                                    <h6><CalenderIcon/>&nbsp;Dashboard</h6>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link lightText sidebarColor" to="/joined/1">
                                    <h6><BinocularsIcon/>&nbsp;Projects</h6>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link lightText sidebarColor" to="/create-project">
                                    <h6><NewIcon/>&nbsp;New Project</h6>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link lightText sidebarColor" to="/favorites/1">
                                    <h6><BugIcon/>&nbsp;Bugs</h6>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link lightText sidebarColor" to="/invites/1">
                                    <h6><MailIcon/>&nbsp;Invites</h6>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link lightText sidebarColor" to="/users/1">
                                    <h6><NewUserIcon/>&nbsp;Users</h6>
                                </Link>
                            </li>
                        </ul>
                            <a className="nav-link lightText container-fluid sidebarAlt bottom" onClick={logout} href="#!">
                                <h6><LogoutIcon/>&nbsp;Logout</h6>
                            </a>
                    </div>

                </nav>
            : null}
        </>
    )
}


export default Sidebar