import React from 'react'

import BugPage from '../../bugs/BugPage'
import CommentPage from '../../comments/CommentPage'
import bugs from './Bugs.json'
import comments from './Comments.json'

const PAGE_OPTIONS = 5

const bug = bugs[0]
const totalPages = 3

const Bug = ({ stage }) => {

    const controls = () => {
        switch(stage){
            case 0:
                return <a href="#!" id='stageButton' className={`btn favBtn-${stage} text-white`}>Move to testing</a>
            case 1:
                return <a href="#!" id='stageButton' className={`btn favBtn-${stage} text-white`}>Move to fixed</a>
            case 2:
                return <a href="#!" id='stageButton' className={`btn favBtn-${stage} text-white`}>Reopen</a>
            default:
                return <a href="#!" id='stageButton' className={`btn favBtn-${stage} text-white`}>Move to testing</a>
        }
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