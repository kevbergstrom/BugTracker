import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../logoFinalWhite.png'

import { PrevIcon, NextIcon } from './Icons'
import {     
    UserIcon,
    CalenderIcon,
    BinocularsIcon,
    NewIcon,
    BugIcon,
    MailIcon,
    NewUserIcon
} from '../navigation/Icons'
import { DangerIcon, WarningIcon, SuccessIcon } from '../bugs/Icons'

const IconMap = {
    'ICON_PREV': <PrevIcon/>,
    'ICON_NEXT': <NextIcon/>,
    'ICON_EXIT': <a className="close float-none"><span>&times;</span></a>,
    'ICON_USER': <UserIcon/>,
    'ICON_CAL': <CalenderIcon/>,
    'ICON_BIN': <BinocularsIcon/>,
    'ICON_NEW': <NewIcon/>,
    'ICON_BUG': <BugIcon/>,
    'ICON_MAIL': <MailIcon/>,
    'ICON_NEW_USER': <NewUserIcon/>,
    'ICON_DANGER': <DangerIcon/>,
    'ICON_WARNING': <WarningIcon/>,
    'ICON_SUCCESS': <SuccessIcon/>,
    'BUTTON_HOME': <Link className="btn btn-primary" to="/">Home</Link>,
    'NEW_LINE': <br/>,
    'LOGO_SMALL': <img src={logo} width={18} height={26} mode='fit'/>
}

const replaceWord = word => {
    return IconMap[word] || word
}

const filterText = text => {
    let words = text.split(/[\s,]+/)
    let filtered = words.map((word,i) => <span key={i}>{replaceWord(word)} </span>)
    return <>{filtered}</>
}

export {
    replaceWord,
    filterText
}