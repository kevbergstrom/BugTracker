import React, { useState, useEffect } from 'react'
import axios from 'axios'

import SidebarPage from '../layout/SidebarPage'
import Results from '../layout/Results'
import Loader from '../layout/Loader'
import ProjectPreview from './ProjectPreview'
import SearchBar from '../search/SearchBar'
import ErrorPage from '../errors/ErrorPage'

const PAGE_OPTIONS = 5

const ProjectResults = ({ match, history}) => {
    const [loading, setLoading] = useState(true)
    const [projects, setProjects] = useState()
    const [totalPages, setTotalPages] = useState()

    const selectPage = pageNumber => {
        return `/projects/${pageNumber}`
    }

    const onSearch = query => {
        const params = new URLSearchParams({
            q: query,
            page: 1
        }).toString()
        history.push(`/projects/search?${params}`)
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
                        <SearchBar onSearch={onSearch}/>
                    </div>
                }>
                <Loader loading={loading}>
                    {projects?
                        projects.map((proj, i) => 
                            <ProjectPreview key={i} {...proj}/>
                        )
                        : <ErrorPage>Couldn't load projects</ErrorPage>
                    }
                </Loader>
            </Results>
        </SidebarPage>
    )
}

export default ProjectResults