import React from 'react'

import Spinner from '../spinner/Spinner'

const Loader = ({ loading , children}) => {
    return loading ? <Spinner/> : children
}

export default Loader