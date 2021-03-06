import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import SidebarPage from '../layout/SidebarPage'
import Loader from '../layout/Loader'
import BugPage from './BugPage'
import CommentPage from '../comments/CommentPage'
import DeleteModal from '../modals/DeleteBug'
import ErrorPage from '../errors/ErrorPage'

const PAGE_OPTIONS = 5

const options = (auth, ownerId, projectId, bugId, setModal) => {
    if(!auth.user){
        return
    }
    if(auth.user.userId !== ownerId){
        return
    }
    // Check if the user is also the owner of the project
    return(
        <div className="d-flex justify-content-between">
            <Link className="btn btn-primary text-white" to={`/project/${projectId}/bug/${bugId}/edit`}>Edit</Link>
            <button tabIndex='-1' className="btn btn-danger text-white" onClick={() => setModal(true)}>Delete</button>
        </div>)
}

const Bug = ({ match, history, auth }) => {
    const [loading, setLoading] = useState(true)
    const [bug, setBug] = useState()
    const [comments, setComments] = useState()
    const [totalPages, setTotalPages] = useState()
    const [stage, setStage] = useState(0)
    const [ready, setReady] = useState(true)
    const [modal, setModal] = useState(false)
    const [joined, setJoined] = useState(false)
    const projectId = match.params.projectId
    const bugId = match.params.bugId

    const controls = () => {
        if(!auth.user || !joined){
            return <p></p>
        }

        switch(stage){
            case 0:
                return <button className={`btn favBtn-${stage} text-white`} onClick={() => upgradeStage(stage+1)}>Move to testing</button>
            case 1:
                return <button className={`btn favBtn-${stage} text-white`} onClick={() => upgradeStage(stage+1)}>Move to fixed</button>
            case 2:
                return <button className={`btn favBtn-${stage} text-white`} onClick={() => upgradeStage(0)}>Reopen</button>
            default:
                return <p></p>
        }
    }

    const selectPage = (pageNumber) => {
        return `/project/${projectId}/bug/${bugId}/comments/${pageNumber}`
    }

    const upgradeStage = async (stage) => {
        if(!ready){
            return
        }
        setReady(false)
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify({stage: stage})
            await axios.put(`/api/project/${projectId}/bug/${bugId}/stage`, body, config)
            setStage(stage)
        } catch (err) {
            console.log(err)
        }
        setReady(true)
    }

    // Bug loading
    useEffect(()=>{
        (async () => {
            try {
                // Get arguments
                const projectId = match.params.projectId
                const bugId = match.params.bugId
                // Get bug data
                const res = await axios.get(`/api/project/${projectId}/bug/${bugId}`)
                // Set bug data
                setBug(res.data)
                setStage(res.data.stage)
                setJoined(res.data.joined)
            } catch (err) {
                console.log(err)
            }
            setLoading(false)
        })()
    },[match.params.projectId, match.params.bugId])

    // Comments loading
    useEffect(()=>{
        (async () => {
            try {
                // Get arguments
                const projectId = match.params.projectId
                const bugId = match.params.bugId
                // Get comment data
                const commentPage = match.params.page || 1
                const cres = await axios.get(`/api/project/${projectId}/bug/${bugId}/comment/results/${commentPage}`)
                // Set comment data
                setComments(cres.data.comments)
                setTotalPages(cres.data.totalPages)
            } catch (err) {
                console.log(err)
            }
        })()
    },[match.params.projectId, match.params.bugId, match.params.page])

    return(
        <>
            {modal ? 
                <DeleteModal 
                    projectId={match.params.projectId} 
                    bugId={match.params.bugId}
                    closeModal={() => setModal(false)}
                    history={history}
                />
                : null
            }
            <SidebarPage>
                <Loader loading={loading}>
                    {bug ? 
                        <BugPage 
                        projectId={match.params.projectId} 
                        auth={auth}
                        options={options(auth, bug.author._id, match.params.projectId, bug._id, setModal)}
                        controls={controls()}
                        {...bug} 
                        stage={stage}
                        commentPage={
                            <>
                                <p></p>
                                <CommentPage 
                                    comments={comments}
                                    currentPage={match.params.page || 1}
                                    pageOptions={PAGE_OPTIONS}
                                    totalPages={totalPages}
                                    generateURL={selectPage}
                                    projectId={match.params.projectId}
                                    bugId={match.params.bugId}
                                    match={match}
                                    auth={auth}
                                    joined={joined}
                                />
                            </>
                        }
                        />
                        : <ErrorPage>Couldn't load bug</ErrorPage>
                    }
                </Loader>
            </SidebarPage>
        </>
    )
}

const mapStateToProps = state => ({
    auth: state.authReducer
})

export default connect(mapStateToProps)(Bug)