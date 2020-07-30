import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import Spinner from '../spinner/Spinner'
import SidebarPage from '../layout/SidebarPage'
import ProjectPage from './ProjectPage'

const Project = ({ match, auth }) => {
    const [loading, setLoading] = useState(true)
    const [project, setProject] = useState()

    useEffect(()=>{
        (async function () {
            try {
                const res = await axios.get(`/api/project/${match.params.id}`)
                setProject(res.data)
            } catch (err) {
                console.log(err)
            }
            setLoading(false)
        })()
    }, [match.params.id])

    return (
        <SidebarPage>
            {loading ? <Spinner/>
            : project ? 
                <ProjectPage auth={auth} {...project}/> 
                : <p>couldnt load project</p>
            }
        </SidebarPage>
    )
}

const mapStateToProps = state => ({
    auth: state.authReducer
})

export default connect(mapStateToProps)(Project)