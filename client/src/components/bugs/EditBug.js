import React, { useState, useEffect } from 'react'
import axios from 'axios'

import SidebarPage from '../layout/SidebarPage'
import Loader from '../layout/Loader'
import ErrorBar from '../errors/ErrorBar'

const EditBug = ({ match, history }) => {
    const [loading, setLoading] = useState(true)
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [error, setError] = useState()
    const [waiting, setWaiting] = useState(false)

    const submitBug = async e => {
        e.preventDefault()
        setWaiting(true)
        try {
            // Construct request parameters
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify({
                title,
                desc
            })
            const projectId = match.params.projectId
            const bugId = match.params.bugId
             // Send request
            await axios.put(`/api/project/${projectId}/bug/${bugId}`, body, config)
            // Visit the edited bug
            history.push(`/project/${projectId}/bug/${bugId}`)
        } catch (err) {
            setError(err.response.data)
        }
        setWaiting(false)
    }

    useEffect(()=>{
        (async ()=>{
            try {
                const projectId = match.params.projectId
                const bugId = match.params.bugId
                const res = await axios.get(`/api/project/${projectId}/bug/${bugId}`)
                setTitle(res.data.title)
                setDesc(res.data.desc)
            } catch (err) {
                console.log(err)
            }
            setLoading(false)
        })()
    },[match.params.projectId, match.params.bugId])

    return(
        <SidebarPage>
            <Loader loading={loading}>
                <div className="container-fluid">
                    <div className="container-fluid  contentColor shadow rounded border">
                        <h4>Create Bug</h4>
                        <hr/>
                        <form onSubmit={e => submitBug(e)}>
                            <div className="form-group">
                                <label>Bug Name</label>
                                <input value={title} onChange={e => setTitle(e.target.value)} type="text" className="form-control inputColor" placeholder="Name"/>
                            </div>
                            <div className="form-group">
                                <label>Bug Description</label>
                                <textarea value={desc} onChange={e => setDesc(e.target.value)} className="form-control inputColor" rows="3"></textarea>
                            </div>
                            {error ? <ErrorBar>{error}</ErrorBar> : null}
                            <button type="submit" className={`btn btn-primary`} disabled={waiting}>Submit</button>
                        </form>
                    </div>
                </div>
            </Loader>
        </SidebarPage>
    )
}

export default EditBug