import React, { useState, useEffect } from 'react'
import axios from 'axios'

import SidebarPage from '../layout/SidebarPage'
import Results from '../layout/Results'
import Loader from '../layout/Loader'
import ProjectPreview from './ProjectPreview'

const PAGE_OPTIONS = 5

const ProjectResults = ({ match }) => {
    const [loading, setLoading] = useState(true)
    const [projects, setProjects] = useState()
    const [totalPages, setTotalPages] = useState()

    const selectPage = pageNumber => {
        return `/projects/${pageNumber}`
    }

    useEffect(()=>{
        (async () =>{
            try {
                const res = await axios.get(`/api/project/projects/${match.params.page}`)
                setProjects(res.data.projects)
                setTotalPages(res.data.totalPages)
            } catch (err) {
                console.log(err)
            }
            setLoading(false)
        })()
    },[match.params.page])

    return (
        <SidebarPage>
            <Results                
                generateURL={selectPage}
                currentPage={match.params.page}
                pageOptions={PAGE_OPTIONS}
                totalPages={totalPages}
                header={                
                    <div className="d-flex justify-content-between">
                        <h4>Projects</h4>
                        <form className="form-inline">
                            <input className="form-control mr-sm-2 inputColor" type="search" placeholder="Search"/>
                            <button className="btn btn-primary my-2 text-white" type="submit">Search</button>
                        </form>
                    </div>
                }>
                <Loader loading={loading}>
                    {projects?
                        projects.map((proj, i) => 
                            <ProjectPreview key={i} {...proj}/>
                        )
                        : <p>couldnt load projects</p>
                    }
                </Loader>
            </Results>
        </SidebarPage>
    )
}

export default ProjectResults