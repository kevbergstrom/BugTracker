import React from 'react'

import { PrevIcon, NextIcon } from './Icons'

const SlideButtons = ({ exit, prev, next, prevDisabled, nextDisabled }) => {
    return (
        <div className="slideButtons">
            <div className="close float-left p-2" onClick={exit}>
                <span>&times;</span>
            </div>
            <div className="container-fluid bg-light">
                <div className="row">
                    <div className="col col-6">
                        <div className={`container-fluid btn btn-dark ${prevDisabled && 'disabled'}`} onClick={prev}>
                            <PrevIcon/>
                        </div>
                    </div>
                    <div className="col col-6">
                        <div className={`container-fluid btn btn-dark ${nextDisabled && 'disabled'}`} onClick={next}>
                            <NextIcon/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SlideButtons