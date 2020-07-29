import React from 'react'

import BasicPage from './basicPage'

const About = props => {
    return(
        <BasicPage>
            <div className="container">
                <div className="container-fluid">
                    <div className="container-fluid contentColor shadow rounded border">
                        <div className="d-flex justify-content-between">
                            <h4>About</h4>
                        </div>
                        <hr/>
                        <p>
                            Made by:
                            <a href="https://www.linkedin.com/in/kevbergstrom/">Kevin Bergstrom</a>
                        </p>
                        <p>
                            Project Link:
                            <a href="#">github.com</a>
                        </p>
                        <p>
                            Technologies:
                            <span className="badge badge-primary">MongoDB</span>
                            <span className="badge badge-primary">Express</span>
                            <span className="badge badge-primary">React</span>
                            <span className="badge badge-primary">Nodejs</span>
                        </p>
                        <div className="d-flex justify-content-between">
                            <h4>Purpose</h4>
                        </div>
                        <hr/>
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium maxime libero dolore. Repudiandae ullam provident nulla facere, similique ut ea!
                        </p>
                        <div className="d-flex justify-content-between">
                            <h4>Features</h4>
                        </div>
                        <hr/>
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut placeat illum nulla nemo laudantium corporis labore iure voluptas tempore ipsum!
                        </p>
                    </div>
                </div>
            </div>
        </BasicPage>
    )
}

export default About