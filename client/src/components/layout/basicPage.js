import React from 'react'

import Navbar from '../navigation/navbar'
import Footer from '../navigation/footer'

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