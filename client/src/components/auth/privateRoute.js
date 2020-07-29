import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, auth: {loading, isAuthenticated}, ...rest }) => {
    return(!loading &&
        <Route {...rest}
            render={
                props => !isAuthenticated && !loading ?
                (<Redirect to="/login"/>)
                : (<Component {...props}/>)
            }
        />
    )
}

const mapStateToProps = state => ({
    auth: state.authReducer
})

export default connect(mapStateToProps)(PrivateRoute)