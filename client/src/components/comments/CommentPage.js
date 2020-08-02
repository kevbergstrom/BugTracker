import React, { useState } from 'react'

import Comment from './Comment'
import Pagination from '../layout/Pagination'  

const CommentPage = ({ comments, currentPage, pageOptions, totalPages, generateURL, submitComment, auth }) => {
    const [comment, setComment] = useState('') 

    const submit = e => {
        e.preventDefault()
        submitComment(comment)
    } 

    return(
        <>  
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
                    {comments.map((c, i) => <Comment key={i} {...c}/>) }
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