import React from 'react'

import ProfilePage from '../../users/ProfilePage'

const user = {
    username:'username'
}

const options = () => {
    return <a id="inviteButton" className="btn btn-success text-white" href="#!">Invite</a>
}

const Profile = props => {

    return (
            <ProfilePage 
                {...user} 
                options={options()}
                fake
                userId={0}/>
    )
}

export default Profile