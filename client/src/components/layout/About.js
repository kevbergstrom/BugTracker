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
                            I made this app to help keep track of bugs in my programming projects.
                            This is more of a proof of concept than a fully fledged app.
                            The goal was to have a more simplified approach to bug tracking.
                            It uses a project focused model where projects work as groups with users as the members.
                            The members then have access to the project's bugs and can discuss and fix them through individual comment boards.
                            There was always supposed to be a social element to it, a way for group projects to be possible.
                            Features like inviting and searching hopefully allow for a better group project experience.
                            The backend was built using Nodejs and Express. The frontend was built using
                            React and a few npm packages. All data from the app is stored in a MongoDB database.
                        </p>
                    </div>
                </div>
            </div>
        </BasicPage>
    )
}

export default About