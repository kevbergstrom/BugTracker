import React from 'react'

import UserButton from './UserButton'

const RecentUsers = ({ users }) => {
    return(
        <div className="container-fluid rounded border">     
            <p></p>
            <div className="d-flex justify-content-around">
                {users.slice(0,Math.ceil(users.length/2)).map(user => <UserButton key={user._id} {...user}/>)}
            </div>
            <p></p>
            <div className="d-flex justify-content-around">
                {users.slice(Math.ceil(users.length/2),users.length).map(user => <UserButton key={user._id} {...user}/>)}
            </div>
        </div>
    )
}

export default RecentUsers