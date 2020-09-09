import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'
import { Redirect } from 'react-router-dom'

import BasicPage from '../layout/BasicPage'
import ErrorBar from '../errors/ErrorBar'

const Login = ({ login, isAuthenticated, error }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [waiting, setWaiting] = useState(false)

    const onSubmit = async e => {
        e.preventDefault()
        setWaiting(true)
        login(email, password)
        setWaiting(false)
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
                                {error ? <ErrorBar>{error}</ErrorBar> : null}
                                <div className="text-center">
                                    <button type="submit" className={`btn btn-primary`} disabled={waiting}>Login</button>
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
    isAuthenticated: state.authReducer.isAuthenticated,
    error: state.authReducer.error
})

export default connect( mapStateToProps, { login })(Login)