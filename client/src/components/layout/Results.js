import React from 'react'

import Pagination from '../layout/Pagination'

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
                        pageOptions={pageOptions} 
                        totalPages={totalPages} 
                        generateURL={generateURL}
                    />
                : null }
            </div>
        </div>
    )
}

export default Results