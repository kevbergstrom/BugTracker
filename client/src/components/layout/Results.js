import React from 'react'

import Pagination from '../layout/Pagination'

const generatePageOptions = (currentPage, totalPages, pageOptions) => {
    // find the start
    let start = parseInt(currentPage) - Math.floor(pageOptions/2)
    let offset = pageOptions
    // correct the range
    if(start <= 0){
        start = 1
    }
    if(start+offset>totalPages){
        offset-=(start+pageOptions-totalPages-1)
    }
    // generate pages
    let pages = []
    for(let i = 0;i < offset; i++){
        pages.push(i+start)
    }
    return pages
}

/*
generateURL is a function you pass in that takes a page number
and return a page url
*/
const Results = ({ header, currentPage, pageOptions, totalPages, generateURL, children}) => {
    return (
        <div className="container-fluid">
            <div className="container-fluid contentColor shadow rounded border">
                {header}
                <div className="container-fluid rounded">
                    {children}
                </div>
                <p></p>
                {currentPage > 0 && currentPage <= totalPages ?
                    <Pagination 
                        currentPage={currentPage} 
                        pages={generatePageOptions(currentPage, totalPages, pageOptions)} 
                        totalPages={totalPages} 
                        generateURL={generateURL}
                    />
                : null }
            </div>
        </div>
    )
}

export default Results