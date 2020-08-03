import React, { useState, useEffect } from 'react'
import axios from 'axios'

import SidebarPage from '../layout/SidebarPage'
import Loader from '../layout/Loader'

const EditProject = ({ match, history }) => {
    const [loading, setLoading] = useState(true)
    const [title, setTitle] = useState('')
    const [link, setLink] = useState('')
    const [privateProject, setPrivateProject] = useState(false)
    const [tech, setTech] = useState('')
    const [technologies, setTechnologies] = useState([])
    const [desc, setDesc] = useState('')

    const addTech = e => {
        e.preventDefault()
        if(technologies.indexOf(tech) === -1){
            setTechnologies([...technologies, tech])
        }
        setTech('')
    }

    const removeTech = tech => {
        setTechnologies(technologies.filter(t => t !== tech))
    }

    const submitProject = async e => {
        e.preventDefault()
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify({
                title,
                link,
                private: privateProject,
                desc,
                languages: technologies
            })
            const res = await axios.put(`/api/project/${match.params.id}`, body, config)
            history.push(`/project/${match.params.id}`)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        (async () =>{
            try {
                const res = await axios.get(`/api/project/${match.params.id}`)
                setTitle(res.data.title)
                setDesc(res.data.desc)
                setPrivateProject(res.data.private)
                setTechnologies([...res.data.languages])
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
                        <h4>Create Project</h4>
                        <hr/>
                        <form onSubmit={e => submitProject(e)}>
                            <div className="form-group">
                                <label>Project Name</label>
                                <input value={title} onChange={e => setTitle(e.target.value)} name="title" type="text" className="form-control inputColor" placeholder="Name"/>
                            </div>
                            <div className="form-group">
                                <label>Project Link</label>
                                <input value={link} onChange={e => setLink(e.target.value)} name="link" type="text" className="form-control inputColor" placeholder="github.com"/>
                            </div>
                            <div className="form-check">
                                <input value={privateProject} onChange={e => setPrivateProject(e.target.value)} name="private" type="checkbox" className="form-check-input"/>
                                <label className="form-check-label">Private</label>
                            </div>
                            <p></p>
                            <div className="form-group">
                                <label>Technologies</label>
                                <div className="form-inline">
                                    <input value={tech} onChange={e => setTech(e.target.value)} type="text" className="form-control inputColor"/>
                                    &nbsp;
                                    <button onClick={addTech} className="btn btn-primary">Add</button>
                                </div>
                                {technologies.map((t, i) => 
                                    <a onClick={() => removeTech(t)} key={i} className="badge badge-primary text-white">{t}</a>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Project Description</label>
                                <textarea value={desc} onChange={e => setDesc(e.target.value)} name="desc" className="form-control inputColor" rows="3"></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Update Project</button>
                        </form>
                    </div>
                </div>
            </Loader>
        </SidebarPage>
    )
}

export default EditProject