import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import SidebarPage from '../layout/SidebarPage'
import Loader from '../layout/Loader'
import BugPage from './BugPage'
import CommentPage from '../comments/CommentPage'

const PAGE_OPTIONS = 5

const Bug = ({ match, auth }) => {
    const [loading, setLoading] = useState(false)
    const [bug, setBug] = useState()
    const [comments, setComments] = useState()
    const [totalPages, setTotalPages] = useState()

    const selectPage = (pageNumber) => {
        const projectId = match.params.projectId
        const bugId = match.params.bugId
        return `/project/${projectId}/bug/${bugId}/comments/${pageNumber}`
    }

    useEffect(()=>{
        (async () => {
            try {
                const projectId = match.params.projectId
                const bugId = match.params.bugId
                // get bug data
                const res = await axios.get(`/api/project/${projectId}/bug/${bugId}`)
                setBug(res.data)
                //get comment data
                const commentPage = match.params.page || 1
                const cres = await axios.get(`/api/project/${projectId}/bug/${bugId}/comments/${commentPage}`)
                setComments(cres.data.comments)
                setTotalPages(cres.data.totalPages)
            } catch (err) {
                console.log(err)
            }
            setLoading(false)
        })()
    },[match.params.projectId, match.params.bugId, match.params.page])

    return(
        <SidebarPage>
            <Loader loading={loading}>
                {bug ? 
                    <BugPage 
                    projectId={match.params.projectId} 
                    auth={auth}
                    {...bug} 
                    commentPage={
                        <CommentPage 
                            comments={comments}
                            currentPage={match.params.page || 1}
                            pageOptions={PAGE_OPTIONS}
                            totalPages={totalPages}
                            generateURL={selectPage}
                        />
                    }
                    />
                    : <p>couldnt load bug</p>
                }
            </Loader>
        </SidebarPage>
    )
}

const mapStateToProps = state => ({
    auth: state.authReducer
})

export default connect(mapStateToProps)(Bug)