import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import SidebarPage from '../layout/SidebarPage'
import Loader from '../layout/Loader'
import ProfilePage from './ProfilePage'
import InviteModal from '../modals/InviteUser'

const options = (ownerId, auth, setModal) => {
    if(!auth.user){
        return
    }
    // Check if the user is also the owner of the profile
    if(auth.user.userId === ownerId){
        return <a className="btn btn-primary text-white">Edit</a>
    }else{
        return <a className="btn btn-success text-white" onClick={() => setModal(true)}>Invite</a>
    }
}

const Profile = ({ match, auth }) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState()
    const [modal, setModal] = useState()

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`/api/user/${match.params.id}`)
                setUser(res.data)
            } catch (err) {
                console.log(err)
            }
            setLoading(false)
        })()
    },[match.params.id])

    return (
        <>
            {modal ? 
                <InviteModal userId={match.params.id} closeModal={() => setModal(false)}/>
            : null }
            <SidebarPage>
                <Loader loading={loading}>
                    {user ? 
                        <ProfilePage 
                            {...user} 
                            options={options(user._id, auth, setModal)}
                            userId={match.params.id}/>
                    : <p>couldnt load this user</p>}
                </Loader>
            </SidebarPage>
        </>
    )
}

const mapStateToProps = state => ({
    auth: state.authReducer
})

export default connect(mapStateToProps)(Profile)