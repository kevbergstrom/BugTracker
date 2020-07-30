import React from 'react'

import Navbar from '../navigation/Navbar'
import Footer from '../navigation/Footer'

const BasicPage = props => {
    return(
        <div className="container-fluid px-0 py-0 tall bgColor">
            <Navbar/>
            {props.children}
            <Footer/>
        </div>
    )
}

export default BasicPage