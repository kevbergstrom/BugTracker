import React from 'react'
import { Link } from 'react-router-dom'

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

const Pagination = ({ currentPage, pageOptions, totalPages, generateURL }) => {
    const prevLink = (currentPage) =>{
        let linkClass = "page-item"
        let linkClick = ""
        // Set disabled
        if(parseInt(currentPage) === 1){
            linkClass += " disabled"
        } else {
            linkClick = generateURL(parseInt(currentPage)-1)
        }

        return(
            <li className={linkClass}>
                <Link
                    className="page-link" 
                    tabIndex="-1" 
                    to={linkClick}
                    key={-1}
                >Previous</Link>
            </li>
        )
    }

    const nextLink = (currentPage, totalPages) =>{
        let linkClass = "page-item"
        let linkClick = ""
        // Set disabled
        if(parseInt(currentPage) === parseInt(totalPages)){
            linkClass += " disabled"
        } else {
            linkClick = generateURL(parseInt(currentPage)+1)
        }

        return(
            <li className={linkClass}>
                <Link
                    className="page-link" 
                    tabIndex="-1"
                    to={linkClick}
                    key={-2}
                >Next</Link>
            </li>
        )
    }

    const pages = generatePageOptions(currentPage, totalPages, pageOptions)

    return(
        totalPages ? <nav>
            <ul className="pagination justify-content-center">
                {prevLink(currentPage, generateURL)}
                {pages.map((page, i) => 
                    <li className="page-item" key={i}><Link className="page-link" to={generateURL(page)} tabIndex={i}>{page}</Link></li>
                )}
                {nextLink(currentPage, totalPages, generateURL)}
            </ul>
        </nav> : null
    )
}

export default Pagination