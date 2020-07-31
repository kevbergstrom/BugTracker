import React from 'react'

import Comment from './Comment'
import Pagination from '../layout/Pagination'

const CommentPage = ({ comments, currentPage, pageOptions, totalPages, generateURL }) => {
    return(
        <>
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