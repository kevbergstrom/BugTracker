import React, { useState } from 'react'
import axios from 'axios'

import Comment from './Comment'
import Pagination from '../layout/Pagination'  
import DeleteModal from '../modals/DeleteComment'
import ErrorBar from '../errors/ErrorBar'

const options = (auth, ownerId, commentId, setModal, setCommentId) => {
    if(!auth.user){
        return
    }
    if(auth.user.userId !== ownerId){
        return
    }
    //Check if the user is also the owner of the comment
    return(
        <div className="text-right">
            <button tabIndex='-1' className="btn btn-danger text-white" onClick={() => {setCommentId(commentId);setModal(true)}}>Delete</button>
        </div>)
}

const CommentPage = ({ comments, currentPage, pageOptions, totalPages, generateURL, projectId, bugId, auth, match, fake }) => {
    const [comment, setComment] = useState('') 
    const [modal, setModal] = useState(false)
    const [commentId, setCommentId] = useState()
    const [error, setError] = useState()

    const submit = async e => {
        e.preventDefault()
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify({desc: comment})
            await axios.post(`/api/project/${projectId}/bug/${bugId}/comment`, body, config)
            window.location.reload(false)// not the best option
            setError()
        } catch (err) {
            setError(err.response.data)
        }
    } 

    return(
        <>  
            {modal && commentId ?
                <DeleteModal
                    projectId={match.params.projectId}
                    bugId={match.params.bugId}
                    commentId={commentId}
                    closeModal={setModal}
                />
                : null
            }
            {auth.user &&
                <>
                    <h4>Add Comment</h4>
                    <form id="commentForm" onSubmit={e => submit(e)}>
                        <div className="form-group">
                            <textarea value={comment} onChange={e => setComment(e.target.value)} className="form-control inputColor" rows="3"></textarea>
                        </div>
                        {error ? <ErrorBar>{error}</ErrorBar> : null}
                        <div className="text-center">
                            {!fake ? <button className="btn btn-success text-white">Submit</button>
                            : <a href="#!" className="btn btn-success text-white">Submit</a>}
                        </div>
                    </form>
                </>
            }
            <h4>Comments</h4>
            {comments && comments.length > 0 ? 
            <>
                <div className="container-fluid rounded">
                    {!fake ? comments.map((c, i) => <Comment key={i} options={options(auth, c.author, c._id, setModal, setCommentId)} {...c}/>) 
                    : comments.map((c, i) => <Comment key={i} options={()=>{}} {...c}/>) }
                </div>
                <p></p>
                <Pagination
                    currentPage={currentPage} 
                    pageOptions={pageOptions} 
                    totalPages={totalPages} 
                    generateURL={generateURL}
                />
            </>
            : <p>no comments</p>
            }
        </>
    )
}

export default CommentPage