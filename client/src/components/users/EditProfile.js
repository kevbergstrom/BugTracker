import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import SidebarPage from '../layout/SidebarPage'
import Loader from '../layout/Loader'
import ErrorBar from '../errors/ErrorBar'
import auth from '../../reducers/auth'

const EditProfile = ({ match, history }) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState()
    const [desc, setDesc] = useState('')
    const [error, setError] = useState()

    const submitBug = async e => {
        e.preventDefault()
        try {
            // Construct request parameters
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify({
                desc
            })
            const id = match.params.id
             // Send request
            await axios.put(`/api/user/profile`, body, config)
            // Visit the edited bug
            history.push(`/user/${id}`)
        } catch (err) {
            setError(err.response.data)
        }
    }

    useEffect(()=>{
        (async ()=>{
            try {
                const res = await axios.get(`/api/user/${match.params.id}`)
                setUser(res.data)
                const { profile } = res.data
                if(profile){
                    setDesc(profile.desc)
                }
            } catch (err) {
                console.log(err)
            }
            setLoading(false)
        })()
    },[match.params.id])

    return(
        <SidebarPage>
            <Loader loading={loading}>
                <div className="container-fluid">
                    <div className="container-fluid  contentColor shadow rounded border">
                        <h4>Edit Profile</h4>
                        <hr/>
                        <form onSubmit={e => submitBug(e)}>
                            <div className="form-group">
                                <label>Profile Description</label>
                                <textarea value={desc} onChange={e => setDesc(e.target.value)} className="form-control inputColor" rows="3"></textarea>
                            </div>
                            {error ? <ErrorBar>{error}</ErrorBar> : null}
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </Loader>
        </SidebarPage>
    )
}

export default EditProfile