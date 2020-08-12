import React from 'react'
import Moment from 'react-moment'

import Header from './Header'

const ProfilePage = ({
    username,
    profile,
    created,
    options
}) => {
    return (
        <>
            <Header>{username}'s Profile</Header>
            <div className="container-fluid">
                <div className="container-fluid contentColor shadow rounded border">
                    <div className="d-flex justify-content-between">
                        <h4>Joined</h4>
                    </div>
                    <hr/>
                    <p><Moment format="MMM Do, YYYY">{created}</Moment></p>
                    {profile ?
                        <>
                            <hr/>
                            <div className="d-flex justify-content-between">
                                <h4>Description</h4>
                            </div>
                            <hr/>
                            <p>{profile.desc}</p>
                        </>
                    : null}
                    {options ? 
                        <>
                            <hr/>
                            {options}
                        </>
                    : null}
                </div>
            </div>
        </>
    )
}

export default ProfilePage