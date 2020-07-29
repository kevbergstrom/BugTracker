import React from 'react'

import logo from '../../logoFinalWhite.png'
import Navbar from '../navigation/navbar'
import Footer from '../navigation/footer'

const Landing = props => {
    return (
        <div className="container-fluid px-0 py-0 tall">

        <div className="jumbotron text-center m-0 d-flex flex-column p-0 rounded-0 bg-dark tall">
            <header className="masthead mb-auto">
                <Navbar/>
            </header>
            <div className="container text-white">
                <img src={logo} className="img-fluid p-5"/>
                <h1 className="jumbotron-heading">
                    BugTracker
                </h1>
                <p className="lead">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet sequi reprehenderit earum, ipsum voluptas reiciendis iusto dolorem quaerat consequuntur perferendis!
                </p>
                <p>
                    <a className="btn btn-primary shadow" href="#">Sign up</a>
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
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet sequi reprehenderit earum, ipsum voluptas reiciendis iusto dolorem quaerat consequuntur perferendis!
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
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, dolores! Voluptatem unde temporibus nihil pariatur quasi autem a eum neque.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="container-fluid bg-white shadow rounded mb-4">
                            <h4>Invite People</h4>
                            <hr/>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, dolores! Voluptatem unde temporibus nihil pariatur quasi autem a eum neque.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="container-fluid bg-white shadow rounded mb-4">
                            <h4>Squash Bugs</h4>
                            <hr/>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, dolores! Voluptatem unde temporibus nihil pariatur quasi autem a eum neque.</p>
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
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet sequi reprehenderit earum, ipsum voluptas reiciendis iusto dolorem quaerat consequuntur perferendis!
                </p>
                <p>
                    <a className="btn btn-primary" href="#">Search projects</a>
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
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet sequi reprehenderit earum, ipsum voluptas reiciendis iusto dolorem quaerat consequuntur perferendis!
                </p>
                <p>
                    <a className="btn btn-primary" href="#">Take a tour</a>
                </p>
            </div>
        </div>
        <Footer/>
    </div>
    )
}

export default Landing