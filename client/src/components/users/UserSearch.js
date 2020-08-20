import React, { useState, useEffect } from 'react'
import axios from 'axios'

import SidebarPage from '../layout/SidebarPage'
import Results from '../layout/Results'
import Loader from '../layout/Loader'
import UserPreview from './UserPreview'
import SearchBar from '../search/SearchBar'

const PAGE_OPTIONS = 5

const UserSearch = ({ match, location, history }) => {
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState()
    const [totalPages, setTotalPages] = useState()
    const [query, setQuery] = useState('')

    const selectPage = pageNumber => {
        const params = new URLSearchParams({
            q: query,
            page: pageNumber
        }).toString()
        return `/users/search?${params}`
    }

    const onSearch = query => {
        const params = new URLSearchParams({
            q: query,
            page: 1
        }).toString()
        history.push(`/users/search?${params}`)
    }

    useEffect(() => {
        (async () => {
            try {
                const params = new URLSearchParams(location.search)
                setQuery(params.get('q'))
                const res = await axios.get(`/api/user/users/search${location.search}`)
                setUsers(res.data.users)
                setTotalPages(res.data.totalPages)
            } catch (err) {
                console.log(err)
            }
            setLoading(false)
        })()
    },[location.search])

    return (
        <SidebarPage>
            <Results                
                generateURL={selectPage}
                currentPage={match.params.page}
                pageOptions={PAGE_OPTIONS}
                totalPages={totalPages}
                header={                
                <div className="d-flex justify-content-between">
                    <h4>User Search - {query}</h4>
                    <SearchBar onSearch={onSearch}/>
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

export default UserSearch