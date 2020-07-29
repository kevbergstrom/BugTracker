import React from 'react'
import { connect } from 'react-redux'

import SidebarPage from '../layout/sidebarPage'
import Header from './header'

const Dashboard = ({ user }) => {
    return(
        <SidebarPage>
            <Header>Welcome back {user.username}!</Header>
        </SidebarPage>
    )
}

const mapStateToProps = state => ({
    user: state.authReducer.user
})

export default connect(mapStateToProps)(Dashboard)