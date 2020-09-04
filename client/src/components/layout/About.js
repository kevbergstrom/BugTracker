import React from 'react'

import BasicPage from './BasicPage'

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
                            <a href="https://www.linkedin.com/in/kevbergstrom/">&nbsp;Kevin Bergstrom</a>
                        </p>
                        <p>
                            Project link:
                            <a className="wordWrap" href="https://github.com/kevbergstrom/BugTracker">&nbsp;https://github.com/kevbergstrom/BugTracker</a>
                        </p>
                        <p>
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