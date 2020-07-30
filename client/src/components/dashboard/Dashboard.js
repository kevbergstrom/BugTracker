import React from 'react'
import { connect } from 'react-redux'

import SidebarPage from '../layout/SidebarPage'
import Header from './Header'

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