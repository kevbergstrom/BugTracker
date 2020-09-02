import React from 'react'

import { PrevIcon, NextIcon } from './Icons'

const IconMap = {
    'ICON_PREV': <PrevIcon/>,
    'ICON_NEXT': <NextIcon/>,
    'ICON_EXIT': <a className="close float-none"><span>&times;</span></a>
}

const replaceWord = word => {
    return IconMap[word] || word
}

const filterText = text => {
    let words = text.split(/[\s,]+/)
    let filtered = words.map((word,i) => <span key={i}>{replaceWord(word)} </span>)
    return <>{filtered}</>
}

const ScreenMessage = ({ title, text }) => {
    return (
        <div className="container h-100 screenMessage">
            <div className="row align-items-center h-100">
                <div className="mx-auto justify-content-center">
                    <div className="border shadow bg-white rounded">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{title}</h5>
                                <hr/>
                                <p className="card-text">{filterText(text)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScreenMessage