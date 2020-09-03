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

const Sidebar = ({ username, userId , logout, open, close, fake, hidden }) => {
    return(
        <>
            {open ?
                <nav className={`${fake ? 'sidebarFake' : 'sidebar'} fixed-top sidebarColor sidebarSize ${hidden ? 'invisible' : 'visible'}`}>
                    <div className="sidebar-sticky">
                        <div className="nav-link lightText container-fluid sidebarAlt">
                            <h6>
                                <span id='userIcon'>
                                    <UserIcon/>
                                    <Link className="lightText" to={`/user/${userId}`}>{username}</Link>
                                </span>
                                <button className="close lightText" onClick={close}>
                                    <span>&times;</span>
                                </button>
                            </h6>
                        </div>

                        <ul className="nav flex-column">
                            <li id='dashboardIcon' className="nav-item">
                                <Link className="nav-link lightText sidebarColor" to="/dashboard">
                                    <h6 id='calenderIcon'><CalenderIcon/>&nbsp;Dashboard</h6>
                                </Link>
                            </li>
                            <li id='projectsIcon' className="nav-item">
                                <Link className="nav-link lightText sidebarColor" to="/joined/1">
                                    <h6 id='binocularsIcon'><BinocularsIcon/>&nbsp;Projects</h6>
                                </Link>
                            </li>
                            <li id='newProjectIcon' className="nav-item">
                                <Link className="nav-link lightText sidebarColor" to="/create-project">
                                    <h6 id='newIcon'><NewIcon/>&nbsp;New Project</h6>
                                </Link>
                            </li>
                            <li id='bugsIcon' className="nav-item">
                                <Link className="nav-link lightText sidebarColor" to="/favorites/1">
                                    <h6 id='bugIcon'><BugIcon/>&nbsp;Bugs</h6>
                                </Link>
                            </li>
                            <li id='invitesIcon' className="nav-item">
                                <Link className="nav-link lightText sidebarColor" to="/invites/1">
                                    <h6 id='mailIcon'><MailIcon/>&nbsp;Invites</h6>
                                </Link>
                            </li>
                            <li id='usersIcon' className="nav-item">
                                <Link className="nav-link lightText sidebarColor" to="/users/1">
                                    <h6 id='newUserIcon'><NewUserIcon/>&nbsp;Users</h6>
                                </Link>
                            </li>
                        </ul>
                            <a className="nav-link lightText container-fluid sidebarAlt bottom" onClick={logout} href="#!">
                                <h6 id='logoutIcon'><LogoutIcon/>&nbsp;Logout</h6>
                            </a>
                    </div>

                </nav>
            : null}
        </>
    )
}


export default Sidebar