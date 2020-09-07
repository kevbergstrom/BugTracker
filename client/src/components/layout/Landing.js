import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../../logoFinalWhite.png'
import Navbar from '../navigation/Navbar'
import Footer from '../navigation/Footer'

const Landing = props => {
    return (
        <div className="container-fluid px-0 py-0 tall position-relative">

            <div className="jumbotron text-center m-0 d-flex flex-column p-0 rounded-0 bg-dark tall">
                <header className="masthead mb-auto">
                    <Navbar/>
                </header>
                <div className="container text-white">
                    <img src={logo} className="img-fluid p-5" alt="bug logo"/>
                    <h1 className="jumbotron-heading">
                        BugTracker
                    </h1>
                    <p className="lead">
                        Welcome to BugTracker! This app helps you keep track of and fix bugs in your projects
                    </p>
                    <p>
                        <Link className="btn btn-primary shadow" to="/signup">Sign up</Link>
                    </p>
                </div>
                <footer className="mastfoot mt-auto">

                </footer>
            </div>

            <div className="container-fluid text-center bg-white">
                <div className="container">
                    <h1 className="jumbotron-heading">
                        Features
                    </h1>
                    <hr/>
                    <p className="lead">
                        You can set up a projects, make bugs, and have discussions about them
                    </p>
                </div>
            </div>

            <div className="container-fluid bg-light">
                <div className="container text-center">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="container-fluid bg-white shadow rounded mb-4">
                                <h4>Create Projects</h4>
                                <hr/>
                                <p>Create public or private projects for other people to find</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="container-fluid bg-white shadow rounded mb-4">
                                <h4>Invite People</h4>
                                <hr/>
                                <p>Don't have enough people for your project? Just invite more poeple to it</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="container-fluid bg-white shadow rounded mb-4">
                                <h4>Squash Bugs</h4>
                                <hr/>
                                <p>Collaborate with a comment board and have discussions about the bugs</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid text-center bg-white">
                <div className="container">
                    <h1 className="jumbotron-heading">
                        Search Projects
                    </h1>
                    <hr/>
                    <p className="lead">
                        Find exactly the project you're looking for with the searching functionality
                    </p>
                    <p>
                        <Link className="btn btn-primary" to="/projects/1">View projects</Link>
                    </p>
                </div>
            </div>

            <div className="container-fluid text-center bg-light">
                <div className="container">
                    <h1 className="jumbotron-heading">
                        Take a Virtual Tour
                    </h1>
                    <hr/>
                    <p className="lead">
                        This tour will take you through all the major features without having to sign up
                    </p>
                    <p>
                        <Link className="btn btn-primary" to="/tour">Take a tour</Link>
                    </p>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Landing