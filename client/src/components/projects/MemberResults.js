import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import SidebarPage from '../layout/SidebarPage'
import Loader from '../layout/Loader'
import Results from '../layout/Results'
import UserPreview from '../users/UserPreview'
import ErrorPage from '../errors/ErrorPage'

const PAGE_OPTIONS = 5

const MemberResults = ({ match }) => {
    const [loading, setLoading] = useState(true)
    const [members, setMembers] = useState()
    const [totalPages, setTotalPages] = useState()
    const [title, setTitle] = useState('')

    const selectPage = pageNumber => {
        return `/project/${match.params.id}/members/${pageNumber}`
    }

    useEffect(()=>{
        (async ()=>{
            try {
                const id = match.params.id
                const page = match.params.page
                const res = await axios.get(`/api/project/${id}/members/${page}`)
                setMembers(res.data.users)
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
                        <h4><Link to={`/project/${match.params.id}`}>{title}</Link> - Members</h4>
                        <p></p>
                    </div>
                }>
                <Loader loading={loading}>
                    {members?
                        members.map((member, i) => 
                            <UserPreview key={i} {...member}/>
                        )
                        : <ErrorPage>Couldn't load members</ErrorPage>
                    }
                </Loader>
            </Results>
        </SidebarPage>
    )
}

export default MemberResults