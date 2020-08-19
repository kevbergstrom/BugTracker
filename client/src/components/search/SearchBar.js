import React, { useState } from 'react'

const onSubmit = (e, onSearch, query) => {
    e.preventDefault()
    onSearch(query)
}

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('')

    return (
        <form onSubmit={e => onSubmit(e, onSearch, query)} className="form-inline">
            <input value={query} onChange={e => setQuery(e.target.value)} className="form-control mr-sm-2 inputColor" type="search" placeholder="Search"/>
            <button className="btn btn-primary my-2 text-white" type="submit">Search</button>
        </form>
    )
}

export default SearchBar