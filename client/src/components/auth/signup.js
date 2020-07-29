import React from 'react'

import BasicPage from '../layout/basicPage'

const Signup = props => {
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
                            <form>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input type="text" className="form-control" placeholder="Enter username" required/>
                                </div>
                                <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control" placeholder="Enter email" required/>
                                </div>
                                <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Enter password" required/>
                                <small className="form-text text-muted">must be atleast 8 characters long</small>
                                </div>
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

export default Signup