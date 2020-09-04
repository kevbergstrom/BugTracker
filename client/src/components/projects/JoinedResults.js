import React, { useState, useEffect } from 'react'

import SidebarPage from '../layout/SidebarPage'
import Results from '../layout/Results'
import ProjectPreview from './ProjectPreview'
import Loader from '../layout/Loader'
import axios from 'axios'
import ErrorPage from '../errors/ErrorPage'

const PAGE_OPTIONS = 5

const selectPage = (pageNumber) => {
    return `/projects/${pageNumber}`
} 

const JoinedResults = ({ match }) => {
    const [loading, setLoading] = useState(true)
    const [projects, setProjects] = useState()
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        (async ()=>{
            try {
                const res = await axios.get(`/api/user/projects/${match.params.page}`)
                setProjects(res.data.projects)
                setTotalPages(res.data.totalPages)
            } catch (err) {
                console.log(err)
            }
            setLoading(false)
        })()
    },[match.params.page])
    return(
        <SidebarPage>
            <Results                
                generateURL={selectPage}
                currentPage={match.params.page}
                pageOptions={PAGE_OPTIONS}
                totalPages={totalPages}
                header={                
                <div className="d-flex justify-content-between">
                    <h4>Joined Projects</h4>
                    <p></p>
                </div>
                } >
                <Loader loading={loading}>
                    {projects ? 
                        projects.map(proj => 
                            <ProjectPreview key={proj._id} {...proj}/>
                        )
                        : <ErrorPage>Couldn't load projects</ErrorPage>
                    }
                </Loader>
            </Results>
        </SidebarPage>
    )
}

export default JoinedResults