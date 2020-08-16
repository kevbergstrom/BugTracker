import React, { useState } from 'react'
import { connect } from'react-redux'
import { Redirect } from 'react-router-dom'
import { signup } from '../../actions/auth'

import BasicPage from '../layout/BasicPage'
import ErrorBar from '../errors/ErrorBar'

const Signup = ({ isAuthenticated, signup, error }) => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = async e =>{
        e.preventDefault()
        signup(username, email, password)
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
                        <div className="container border shadow bg-white">
                            <div className="text-center">
                                <h3>SignUp to BugTracker</h3>
                            </div>
                            <form onSubmit={onSubmit}>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input value={username} onChange={e => setUsername(e.target.value)} type="text" className="form-control" placeholder="Enter username" required/>
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control" placeholder="Enter email" required/>
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" placeholder="Enter password" required/>
                                    <small className="form-text text-muted">must be atleast 8 characters long</small>
                                </div>
                                {error ? <ErrorBar>{error}</ErrorBar> : null}
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary">Sign up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </BasicPage>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated,
    error: state.authReducer.error
})

export default connect(mapStateToProps, { signup })(Signup)