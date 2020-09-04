import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'
import { openSidebar, closeSidebar } from '../../actions/ui'

import Navbar from '../navigation/Navbar'
import Footer from '../navigation/Footer'
import Sidebar from '../navigation/Sidebar'

const SidebarPage = ({
    isAuthenticated, 
    user, 
    logout, 
    sidebarOpened,
    openSidebar,
    closeSidebar,
     ...props}) => {
    return (
        <div className="container-fluid py-0 px-0 bgColor position-relative">
            <div className="px-0">
                {isAuthenticated &&
                    <Sidebar 
                        logout={logout} 
                        open={sidebarOpened}
                        close={closeSidebar}
                        {...user}
                    />
                }
                <div className="px-0 tall">
                    <Navbar openSidebar={openSidebar}/>
                    {props.children}
                    <Footer/>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated,
    user: state.authReducer.user,
    sidebarOpened: state.uiReducer.sidebarOpen
})

export default connect(mapStateToProps, { logout, openSidebar, closeSidebar })(SidebarPage)