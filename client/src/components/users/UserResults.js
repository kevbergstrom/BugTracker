import React, { useState, useEffect } from 'react'
import axios from 'axios'

import SidebarPage from '../layout/SidebarPage'
import Results from '../layout/Results'
import Loader from '../layout/Loader'
import UserPreview from './UserPreview'

const PAGE_OPTIONS = 5

const selectPage = (pageNumber) => {
    return `/users/${pageNumber}`
}

const UserResults = ({ match }) => {
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState()
    const [totalPages, setTotalPages] = useState()

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`/api/user/users/${match.params.page}`)
                setUsers(res.data.users)
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
                    <h4>Users</h4>
                    <form className="form-inline">
                        <input className="form-control mr-sm-2 inputColor" type="search" placeholder="Search"/>
                        <button className="btn btn-primary my-2 text-white" type="submit">Search</button>
                    </form>
                </div>
                } >
                <Loader loading={loading}>
                    {users ? 
                        users.map((user, i) => 
                            <UserPreview key={i} {...user}/>
                        )
                    : <p>couldnt load users</p>
                    }
                </Loader>
            </Results>
        </SidebarPage>
    )
}

export default UserResults