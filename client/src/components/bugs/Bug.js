import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import SidebarPage from '../layout/SidebarPage'
import Loader from '../layout/Loader'
import BugPage from './BugPage'
import CommentPage from '../comments/CommentPage'
import DeleteModal from '../modals/DeleteBug'

const PAGE_OPTIONS = 5

const options = (auth, ownerId, projectId, bugId, setModal) => {
    if(!auth.user){
        return
    }
    if(auth.user.userId !== ownerId){
        return
    }
    return(
        <div className="d-flex justify-content-between">
            <Link className="btn btn-primary text-white" to={`/project/${projectId}/bug/${bugId}/edit`}>Edit</Link>
            <button tabIndex='-1' className="btn btn-danger text-white" onClick={() => setModal(true)}>Delete</button>
        </div>)
}

const Bug = ({ match, history, auth }) => {
    const [loading, setLoading] = useState(false)
    const [bug, setBug] = useState()
    const [comments, setComments] = useState()
    const [totalPages, setTotalPages] = useState()
    const [stage, setStage] = useState(0)
    const [ready, setReady] = useState(true)
    const [modal, setModal] = useState(false)
    const projectId = match.params.projectId
    const bugId = match.params.bugId

    const controls = () => {
        switch(stage){
            case 0:
                return <a className={`btn favBtn-${stage} text-white`} onClick={() => upgradeStage(stage+1)}>Move to testing</a>
            case 1:
                return <a className={`btn favBtn-${stage} text-white`} onClick={() => upgradeStage(stage+1)}>Move to fixed</a>
            case 2:
                return <a className={`btn favBtn-${stage} text-white`} onClick={() => upgradeStage(0)}>Reopen</a>
            default:
                return <p></p>
        }
    }

    const selectPage = (pageNumber) => {
        return `/project/${projectId}/bug/${bugId}/comments/${pageNumber}`
    }

    const submitComment = async comment => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify({desc: comment})
            await axios.post(`/api/project/${projectId}/bug/${bugId}/comment`, body, config)
            window.location.reload(false)// not the best option
        } catch (err) {
            console.log(err)
        }
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
                const projectId = match.params.projectId
                const bugId = match.params.bugId
                // get bug data
                const res = await axios.get(`/api/project/${projectId}/bug/${bugId}`)
                setBug(res.data)
                setStage(res.data.stage)
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
                const projectId = match.params.projectId
                const bugId = match.params.bugId
                //get comment data
                const commentPage = match.params.page || 1
                const cres = await axios.get(`/api/project/${projectId}/bug/${bugId}/comment/results/${commentPage}`)
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
                                    submitComment={submitComment}
                                    match={match}
                                    auth={auth}
                                />
                            </>
                        }
                        />
                        : <p>couldnt load bug</p>
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