import React from 'react'

import Results from '../../layout/Results'
import BugPreview from '../../bugs/BugPreview'
import SearchBar from '../../search/SearchBar'
import bugs from './Bugs.json'

const PAGE_OPTIONS = 5

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