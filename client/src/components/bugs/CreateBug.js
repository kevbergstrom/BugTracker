import React, { useState } from 'react'
import axios from 'axios'

import SidebarPage from '../layout/SidebarPage'

const CreateBug = ({ match, history }) => {
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
            const id = match.params.id
            const res = await axios.post(`/api/project/${id}/bug`, body, config)
            // Visit the newly created bug
            const newBugId = res.data._id
            history.push(`/project/${id}/bug/${newBugId}`)
        } catch (err) {
            console.log(err)
        }
    }

    return(
        <SidebarPage>
                <div className="container-fluid">
                    <div className="container-fluid  contentColor shadow rounded border">
                        <h4><a href="#">Project Name</a> - Create Bug</h4>
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
        </SidebarPage>
    )
}

export default CreateBug