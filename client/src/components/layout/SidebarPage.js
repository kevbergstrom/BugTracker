import React from 'react'
import { connect } from 'react-redux'

import Navbar from '../navigation/Navbar'
import Footer from '../navigation/Footer'
import Sidebar from '../navigation/Sidebar'

const SidebarPage = ({isAuthenticated, ...props}) => {
    return (
        <div className="container-fluid py-0 bgColor">
            <div className="row">
                {isAuthenticated &&
                    <div className="col-md-2">
                        <Sidebar/>
                    </div>
                }
                <div className="col ml-sm-auto px-0 tall">
                    <Navbar/>
                    {props.children}
                    <Footer/>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated
})

export default connect(mapStateToProps)(SidebarPage)