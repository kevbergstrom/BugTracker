import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Favorite from '../buttons/Favorite'

const FavoriteBug = ({ favorited, projectId, bugId, stage }) => {
    const [favorite, setFavorite] = useState(false)
    const [ready, setReady] = useState(true)

    useEffect(() => {
        setFavorite(favorited || false)
    },[favorited])

    const updateFavorite = async () => {
        if(!ready){ return }
        try {
            setReady(false)
            if(!favorite){
                // favorite
                await axios.post(`/api/project/${projectId}/bug/${bugId}/favorite`)
            }else{
                // unfavorite
                await axios.delete(`/api/project/${projectId}/bug/${bugId}/favorite`)
            }
            // update variable
            setFavorite(!favorite)
        } catch (err) {
            console.log(err)
        }
        setReady(true)
    }

    return <Favorite favorited={favorite} onClick={updateFavorite} stage={stage}/>
}

export default FavoriteBug