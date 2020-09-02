import React, { useEffect, useState } from 'react'
import { createPopper } from '@popperjs/core';

import Navbar from '../navigation/Navbar'
import Footer from '../navigation/Footer'
import Sidebar from '../navigation/Sidebar'
import Tooltip from '../layout/Tooltip'
import SlideButtons from './SlideButtons'
import ScreenMessage from './ScreenMessage'
import tourCommands, { maxPosition } from './tourScript'

const Tour = ({ history, ...props }) => {
    const [page, setPage] = useState('dashboard')
    const [pos, setPos] = useState(0)
    const [selected, setSelected] = useState('logoutIcon')
    const [sidebar, setSidebar] = useState(false)
    const [tooltip, setTooltip] = useState()
    const [message, setMessage] = useState()

    const exit = () => {
        history.push('/')
    }
    const prev = () => {
        if(pos<=0){
            return
        }
        updateState(tourCommands(pos-1))
        setPos(pos-1)
    }
    const next = () => {
        if(pos>=maxPosition){
            return
        }
        updateState(tourCommands(pos+1))
        setPos(pos+1)
    }
    const updateTooltip = (selected, tool) => {
        // Update hooks
        setSelected(selected)
        setTooltip({...tool})
        // Create tooltip
        const icon = document.querySelector(`#${selected}`);
        const tooltip = document.querySelector('#tooltip');
        createPopper(icon, tooltip, {
            placement: 'top',
          });
    }
    const updateState = directions => {
        if(!directions){
            return
        }
        if(directions.message){
            setMessage({...directions.message})
        }else{
            setMessage(null)
        }
        setSelected(directions.selected)
        if(directions.tooltip){
            setTooltip({...directions.tooltip})
            updateTooltip(directions.selected, directions.tooltip)
        }else{
            setTooltip(null)
        }
        setSidebar(directions.sidebar || false)
    }

    useEffect(() => {
        updateState(tourCommands(0))
    },[])

    return (
        <>
            <div className="container-fluid py-0 px-0 bgColor">
                <div className="px-0">
                    <Sidebar 
                        fake={true}
                        open={sidebar}
                        username='user'
                    />
                    <div className="px-0 tall">
                        <Navbar fake={true}/>
                        {props.children}
                        <Footer/>
                    </div>
                </div>
            </div>
            <SlideButtons
                exit={exit}
                prev={prev}
                next={next}
                prevDisabled={pos<=0}
                nextDisabled={pos>=maxPosition}
            />
            <Tooltip hidden={!tooltip} {...tooltip}/>
            {message && <ScreenMessage {...message}/>}
        </>
    )
}

export default Tour