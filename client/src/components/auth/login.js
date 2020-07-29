import React from 'react'

import Navbar from '../navigation/navbar'
import Footer from '../navigation/footer'

const Login = props => {
    return (
        <div className="container-fluid px-0 py-0 tall bgColor">

            <Navbar/>

            <div className="container">
                <div className="row">
                    <div className="col-0 col-md-3">
                        
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="container border shadow bg-white rounded">
                            <div className="text-center">
                                <h3>Login to BugTracker</h3>
                            </div>
                            <form>
                                <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control" placeholder="Enter email" required/>
                                </div>
                                <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Enter password" required/>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default Login