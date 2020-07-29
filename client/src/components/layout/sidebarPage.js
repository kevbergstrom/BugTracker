import React from 'react'

import Navbar from '../navigation/navbar'
import Footer from '../navigation/footer'
import Sidebar from '../navigation/sidebar'

const SidebarPage = props => {
    return (
        <div class="container-fluid py-0 bgColor">
            <div class="row">
                <Sidebar/>
                <div class="col-md-10 ml-sm-auto px-0 tall">
                    <Navbar/>
                    {props.children}
                    <Footer/>
                </div>
            </div>
        </div>
    )
}

export default SidebarPage