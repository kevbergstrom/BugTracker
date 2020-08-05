import React from 'react'

const Modal = props => {
    return(
        <div className="p-5 modalCustom">
            <div className="container border shadow bg-white rounded modalBox">
                {props.children}
            </div>
        </div>
    )
}

export default Modal