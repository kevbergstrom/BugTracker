import React, { useState, useEffect } from 'react'
import axios from 'axios'

import SidebarPage from '../layout/SidebarPage'
import Results from '../layout/Results'
import Loader from '../layout/Loader'
import ProjectPreview from './ProjectPreview'
import SearchBar from '../search/SearchBar'

const PAGE_OPTIONS = 5

const ProjectSearch = ({ match, location, history }) => {
    const [loading, setLoading] = useState(true)
    const [projects, setProjects] = useState()
    const [totalPages, setTotalPages] = useState()
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(1)

    const selectPage = pageNumber => {
        const params = new URLSearchParams({
            q: query,
            page: pageNumber
        }).toString()
        return `/projects/search?${params}`
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
                const params = new URLSearchParams(location.search)
                setQuery(params.get('q'))
                setPage(params.get('page'))
                const res = await axios.get(`/api/project/projects/search${location.search}`)
                setProjects(res.data.projects)
                setTotalPages(res.data.totalPages)
            } catch (err) {
                console.log(err)
            }
            setLoading(false)
        })()
    },[location.search])

    return (
        <SidebarPage>
            <Results                
                generateURL={selectPage}
                currentPage={page}
                pageOptions={PAGE_OPTIONS}
                totalPages={totalPages}
                header={                
                    <div className="d-flex justify-content-between">
                        <h4>Project Search - {query}</h4>
                        <SearchBar onSearch={onSearch}/>
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

export default ProjectSearch