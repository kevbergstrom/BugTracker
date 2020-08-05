import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import SidebarPage from '../layout/SidebarPage'
import Loader from '../layout/Loader'

const EditBug = ({ match, history }) => {
    const [loading, setLoading] = useState(true)
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')

    const submitBug = async e => {
        e.preventDefault()
        try {

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
            await axios.put(`/api/project/${projectId}/bug/${bugId}`, body, config)
            history.push(`/project/${projectId}/bug/${bugId}`)
        } catch (err) {
            console.log(err)
        }
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
                        <h4><Link to={`/project/${match.params.projectId}`}>Project Name</Link> - Create Bug</h4>
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
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </Loader>
        </SidebarPage>
    )
}

export default EditBug