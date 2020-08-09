import React, { useState, useEffect} from 'react'
import axios from 'axios'

import SidebarPage from '../layout/SidebarPage'
import Results from '../layout/Results'
import BugPreview from './BugPreview'
import Loader from '../layout/Loader'

const PAGE_OPTIONS = 5

const FavoriteResults = ({ match }) => {
    const [loading, setLoading] = useState(true)
    const [bugs, setBugs] = useState()
    const [totalPages, setTotalPages] = useState(0)

    const selectPage = (pageNumber) => {
        return `/favorites/${pageNumber}`
    } 

    useEffect(()=>{
        (async () => {
            try {
                const page = match.params.page
                const res = await axios.get(`/api/user/favorites/${page}`)
                setBugs(res.data.bugs)
                setTotalPages(res.data.totalPages)
            } catch (err) {
                console.log(err)
            }
            setLoading(false)
        })()
    },[match.params.page])

    return (    
        <SidebarPage>
            <Results 
                generateURL={selectPage}
                currentPage={match.params.page}
                pageOptions={PAGE_OPTIONS}
                totalPages={totalPages}
                header={                
                <div className="d-flex justify-content-between">
                    <h4>Favorited Bugs</h4>
                    <form className="form-inline">
                        <input className="form-control mr-sm-2 inputColor" type="search" placeholder="Search"/>
                        <button className="btn btn-primary my-2 text-white" type="submit">Search</button>
                    </form>
                </div>
                } >
                <Loader loading={loading}>
                    {bugs ? 
                        bugs.map(bug => 
                            <BugPreview key={bug._id} {...bug}/>
                        )
                        : <p>couldnt load bugs</p>
                    }
                </Loader>
            </Results>
        </SidebarPage>
    )
}

export default FavoriteResults