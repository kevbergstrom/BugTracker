import React, { useState, useEffect } from 'react'
import axios from 'axios'

import SidebarPage from '../layout/SidebarPage'
import Results from '../layout/Results'
import Loader from '../layout/Loader'
import Invite from './Invite'
import ErrorPage from '../errors/ErrorPage'

const PAGE_OPTIONS = 5

const selectPage = (pageNumber) => {
    return `/invites/${pageNumber}`
} 

const joinProject = async (projectId, history) => {
    try {
        await axios.post(`/api/project/${projectId}/join`)
        history.push(`/project/${projectId}`)
    } catch (err) {
        console.log(err)
    }
}

const removeInvite = async (projectId, invites, setInvites) => {
    try {
        await axios.delete(`/api/user/invites/${projectId}`)
        setInvites(invites.filter(inv => inv._id != projectId))
    } catch (err) {
        console.log(err)
    }
}

const generateOptions = (projectId, history, invites, setInvites) => {
    return (
        <>
            <a className="btn btn-primary text-white" onClick={() => joinProject(projectId, history)}>Join</a>
            <a className="btn btn-danger text-white float-right" onClick={() => removeInvite(projectId, invites, setInvites)}>Remove</a>
        </>
    )
}

const InviteResults = ({ match, history }) => {
    const [loading, setLoading] = useState(true)
    const [invites, setInvites] = useState()
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        (async ()=>{
            try {
                const res = await axios.get(`/api/user/invites/${match.params.page}`)
                setInvites(res.data.invites)
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
                    <h4>Invites</h4>
                </div>
                } >
                <Loader loading={loading}>
                    {invites ? 
                        invites.map(inv => 
                            <Invite 
                                key={inv._id} 
                                {...inv}
                                options={generateOptions(inv._id, history, invites, setInvites)}
                            />
                        )
                        : <ErrorPage>Couldn't load invites</ErrorPage>
                    }
                </Loader>
            </Results>
        </SidebarPage>
    )
}

export default InviteResults