import React, { useEffect, useState, useCallback } from 'react'
import { createPopper } from '@popperjs/core';

import Navbar from '../navigation/Navbar'
import Footer from '../navigation/Footer'
import Sidebar from '../navigation/Sidebar'
import Tooltip from './Tooltip'
import SlideButtons from './SlideButtons'
import ScreenMessage from './ScreenMessage'
import tourCommands from './tour.json'
import Pages from './Pages'

const maxPosition = tourCommands.length-1

const Tour = ({ history, ...props }) => {
    const [page, setPage] = useState('dashboard')
    const [pos, setPos] = useState(0)
    const [sidebar, setSidebar] = useState(false)
    const [tooltip, setTooltip] = useState()
    const [message, setMessage] = useState()
    const [stage, setStage] = useState(0)

    const exit = () => {
        history.push('/')
    }

    const prev = () => {
        if(pos<=0){
            return
        }
        updateState(tourCommands[pos-1])
        setPos(pos-1)
    }

    const next = () => {
        if(pos>=maxPosition){
            return
        }
        updateState(tourCommands[pos+1])
        setPos(pos+1)
    }

    const updateTooltip = (select, tool) => {
        // Update hooks
        setTooltip({...tool})
        // Search for the correct html elements
        const icon = document.querySelector(`#${select}`);
        const tooltip = document.querySelector('#tooltip');
        // Create tooltip
        if(icon){
            icon.scrollIntoView({block: 'center'})
            if(tooltip){
                createPopper(icon, tooltip, {
                    placement: 'bottom',
                    });
            }
        }
    }

    const updateState = useCallback( directions => {
        if(!directions){
            return
        }
        // Get variables
        const {
            message,
            selected,
            tooltip,
            sidebar,
            page,
            stage
        } = directions
        // Set hooks
        if(message){
            setMessage({...message})
            window.scrollTo(0,0)
        }else{
            setMessage(null)
        }
        if(tooltip){
            setTooltip({...tooltip})
            updateTooltip(selected, tooltip)
        }else{
            setTooltip(null)
        }
        setSidebar(sidebar || false)
        setStage(stage)
        setPage(page)
    },[])

    useEffect(() => {
        // Start the first part of the tour
        updateState(tourCommands[0])
    },[updateState])

    return (
        <>
            <div className="container-fluid py-0 px-0 bgColor position-relative">
                <div className="px-0">
                    <Sidebar 
                        fake={true}
                        open={true}
                        hidden={!sidebar}
                        username='user'
                    />
                    <div className="px-0 tall">
                        <Navbar fake={true}/>
                        <Pages page={page} stage={stage}/>
                        <div className="bottomBuffer"></div>
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