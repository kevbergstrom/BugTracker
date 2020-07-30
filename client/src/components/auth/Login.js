import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'
import { Redirect } from 'react-router-dom'

import BasicPage from '../layout/BasicPage'

const Login = ({ login, isAuthenticated }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = async e => {
        e.preventDefault()
        login(email, password)
    }

    if(isAuthenticated){
        return <Redirect to="/dashboard"/>
    }

    return (
        <BasicPage>
            <div className="container">
                <div className="row">
                    <div className="col-0 col-md-3"></div>
                    <div className="col-12 col-md-6">
                        <div className="container border shadow bg-white rounded">
                            <div className="text-center">
                                <h3>Login to BugTracker</h3>
                            </div>
                            <form onSubmit={e => onSubmit(e)}>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control" placeholder="Enter email" required/>
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" placeholder="Enter password" required/>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </BasicPage>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated
})

export default connect( mapStateToProps, { login })(Login)