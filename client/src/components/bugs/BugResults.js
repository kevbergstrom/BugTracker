import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import SidebarPage from '../layout/SidebarPage'
import Results from '../layout/Results'
import BugPreview from './BugPreview'
import Loader from '../layout/Loader'
import SearchBar from '../search/SearchBar'
import ErrorPage from '../errors/ErrorPage'

const PAGE_OPTIONS = 5

const BugResults = ({ match, history }) => {
    const [loading, setLoading] = useState(true)
    const [bugs, setBugs] = useState()
    const [totalPages, setTotalPages] = useState(0)
    const [title, setTitle] = useState("")

    const selectPage = (pageNumber) => {
        return `/project/${match.params.id}/bugs/${pageNumber}`
    } 

    const onSearch = query => {
        const params = new URLSearchParams({
            q: query,
            page: 1
        }).toString()
        history.push(`/project/${match.params.id}/bugs/search?${params}`)
    }

    useEffect(()=>{
        (async () => {
            try {
                // Get arguments
                const projectId = match.params.id
                const page = match.params.page
                // Get bug data
                const res = await axios.get(`/api/project/${projectId}/bug/results/${page}`)
                // Set bug data
                setBugs(res.data.bugs)
                setTotalPages(res.data.totalPages)
                setTitle(res.data.title)
            } catch (err) {
                console.log(err)
            }
            setLoading(false)
        })()
    },[match.params.id, match.params.page])

    return (
        <SidebarPage>
            <Results 
                generateURL={selectPage}
                currentPage={match.params.page}
                pageOptions={PAGE_OPTIONS}
                totalPages={totalPages}
                header={                
                <div className="d-flex justify-content-between">
                    <h4><Link to={`/project/${match.params.id}`}>{title}</Link> - Bugs</h4>
                    <SearchBar onSearch={onSearch}/>
                </div>
                } >
                <Loader loading={loading}>
                    {bugs ? 
                        bugs.map(bug => 
                            <BugPreview key={bug._id} {...bug}/>
                        )
                        : <ErrorPage>Couldn't load bugs</ErrorPage>
                    }
                </Loader>
            </Results>
        </SidebarPage>
    )
}

export default BugResults