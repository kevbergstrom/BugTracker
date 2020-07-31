import React from 'react'
import { Link } from 'react-router-dom'

const Pagination = ({ currentPage, pages, totalPages, generateURL }) => {
    const prevLink = (currentPage, onClick) =>{
        let linkClass = "page-item"
        let linkClick
        if(currentPage==1){
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

    const nextLink = (currentPage, totalPages, onClick) =>{
        let linkClass = "page-item"
        let linkClick
        if(currentPage==totalPages){
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