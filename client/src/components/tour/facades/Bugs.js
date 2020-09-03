import React from 'react'

import Results from '../../layout/Results'
import BugPreview from '../../bugs/BugPreview'
import SearchBar from '../../search/SearchBar'

const PAGE_OPTIONS = 5

const bugs = [
    {
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
    },
    {
        "stage": 2,
        "favorited": false,
        "_id": "5f2fa499b8b50647f12da4c0",
        "author": {
            "username": "username"
        },
        "title": "anotha one first",
        "desc": "here goes [edited]",
        "number": 6,
        "project": "5f2fa33078da5b46a6b007a1",
        "created": "2020-08-09T07:24:09.410Z",
        "progress": [],
        "__v": 0
    },
    {
        "stage": 1,
        "favorited": false,
        "_id": "2",
        "author": {
            "username": "username"
        },
        "title": "badda bing",
        "desc": "badda boom\nedit",
        "number": 5,
        "project": "5f2fa33078da5b46a6b007a1",
        "created": "2020-08-09T07:22:39.050Z",
        "progress": [],
        "__v": 14
    },
    {
        "stage": 0,
        "favorited": false,
        "_id": "3",
        "author": {
            "username": "username"
        },
        "title": "new 4",
        "desc": "",
        "number": 4,
        "project": "5f2fa33078da5b46a6b007a1",
        "created": "2020-08-09T07:20:43.171Z",
        "progress": [],
        "__v": 0
    },
    {
        "stage": 0,
        "favorited": false,
        "_id": "4",
        "author": {
            "username": "username"
        },
        "title": "new 2",
        "desc": "edit",
        "number": 3,
        "project": "5f2fa33078da5b46a6b007a1",
        "created": "2020-08-09T07:20:34.923Z",
        "progress": [],
        "__v": 0
    }
]
const totalPages = 2
const title = "BugTracker"

const BugResults = props => {

    return (
            <Results 
                generateURL={()=>{}}
                currentPage={1}
                pageOptions={PAGE_OPTIONS}
                totalPages={totalPages}
                header={                
                <div className="d-flex justify-content-between">
                    <h4><a href="#!">{title}</a> - Bugs</h4>
                    <SearchBar onSearch={()=>{}}/>
                </div>
                } >
                {bugs.map(bug => <BugPreview key={bug._id} fake {...bug}/>)}
            </Results>
    )
}

export default BugResults