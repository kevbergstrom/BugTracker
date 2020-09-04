import React from 'react'

import { DangerIcon, WarningIcon, SuccessIcon } from './Icons'

const BugHeader = ({ title, number, stage }, ...props) => {
    switch(stage){
        default:
        case 0:
            return(
                <div className="card-header gradient-danger">
                    <h4 className="text-white"><span>#{number}&nbsp;</span>
                        {title}
                        <DangerIcon float/>
                        <span className="float-right">Not Fixed&nbsp;</span>
                    </h4>
                </div>
            )
        case 1:
            return(
                <div className="card-header gradient-warning">
                    <h4 className="text-white"><span>#{number}&nbsp;</span>
                        {title}
                        <WarningIcon float/>
                        <span className="float-right">Review&nbsp;</span>
                    </h4>
                </div>
            )
        case 2:
            return(
                <div className="card-header gradient-success">
                    <h4 className="text-white"><span>#{number}&nbsp;</span>
                        {title}
                        <SuccessIcon float/>
                        <span className="float-right">Fixed&nbsp;</span>
                    </h4>
                </div>
            )
    }
}

export default BugHeader