import React from 'react'

import BugPage from '../../bugs/BugPage'
import CommentPage from '../../comments/CommentPage'

const PAGE_OPTIONS = 5

const bug = {
    "stage": 0,
    "favorited": false,
    "_id": "0",
    "author": {
        "username": "username"
    },
    "title": "Validation test",
    "desc": "I hope this works!\nedit",
    "number": 7,
    "project": "5f2fa33078da5b46a6b007a1",
    "created": "2020-08-18T23:12:46.315Z",
    "progress": [],
    "__v": 1
}
const comments = [
    {
        "created": "2020-08-18T23:12:46.315Z",
        "desc": "comment desc",
        "name": "username",
        "_id": "0"
    },
    {
        "created": "2020-08-18T23:12:46.315Z",
        "desc": "comment desc",
        "name": "username",
        "_id": "1"
    },
    {
        "created": "2020-08-18T23:12:46.315Z",
        "desc": "comment desc",
        "name": "username",
        "_id": "2"
    },
    {
        "created": "2020-08-18T23:12:46.315Z",
        "desc": "comment desc",
        "name": "username",
        "_id": "3"
    },
    {
        "created": "2020-08-18T23:12:46.315Z",
        "desc": "comment desc",
        "name": "username",
        "_id": "4"
    },
]
const totalPages = 3
const projectId = 0
const bugId = 0

const Bug = ({ stage }) => {

    const controls = () => {
        switch(stage){
            case 0:
                return <a id='stageButton' className={`btn favBtn-${stage} text-white`}>Move to testing</a>
            case 1:
                return <a id='stageButton' className={`btn favBtn-${stage} text-white`}>Move to fixed</a>
            case 2:
                return <a id='stageButton' className={`btn favBtn-${stage} text-white`}>Reopen</a>
            default:
                return <a id='stageButton' className={`btn favBtn-${stage} text-white`}>Move to testing</a>
        }
    }

    const selectPage = (pageNumber) => {
        return `/project/${projectId}/bug/${bugId}/comments/${pageNumber}`
    }

    return(
                    <BugPage 
                        projectId={0} 
                        auth={{user:null}}
                        options={()=>{}}
                        controls={controls()}
                        fake
                        {...bug} 
                        stage={stage}
                        commentPage={
                            <>
                                <p></p>
                                <CommentPage 
                                    comments={comments}
                                    currentPage={1}
                                    pageOptions={PAGE_OPTIONS}
                                    totalPages={totalPages}
                                    generateURL={()=>{}}
                                    projectId={0}
                                    bugId={0}
                                    fake
                                    auth={{user:{username:'user'}}}
                                />
                            </>
                        }
                    />
    )
}

export default Bug