import React, { useState } from 'react'

import Comment from './Comment'
import Pagination from '../layout/Pagination'  
import DeleteModal from '../modals/DeleteComment'

const options = (auth, ownerId, commentId, setModal, setCommentId) => {
    if(!auth.user){
        return
    }
    if(auth.user.userId !== ownerId){
        return
    }
    return(
        <div className="text-right">
            <button tabIndex='-1' className="btn btn-danger text-white" onClick={() => {setCommentId(commentId);setModal(true)}}>Delete</button>
        </div>)
}

const CommentPage = ({ comments, currentPage, pageOptions, totalPages, generateURL, submitComment, auth, match }) => {
    const [comment, setComment] = useState('') 
    const [modal, setModal] = useState(false)
    const [commentId, setCommentId] = useState()

    const submit = e => {
        e.preventDefault()
        submitComment(comment)
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
                    <form onSubmit={e => submit(e)}>
                        <div className="form-group">
                            <textarea value={comment} onChange={e => setComment(e.target.value)} className="form-control inputColor" rows="3"></textarea>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-success text-white">Submit</button>
                        </div>
                    </form>
                </>
            }
            <h4>Comments</h4>
            {comments && comments.length > 0 ? 
            <>
                <div className="container-fluid rounded">
                    {comments.map((c, i) => <Comment key={i} options={options(auth, c.author, c._id, setModal, setCommentId)} {...c}/>) }
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