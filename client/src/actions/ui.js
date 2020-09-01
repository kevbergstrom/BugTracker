import {
    OPEN_SIDEBAR,
    CLOSE_SIDEBAR
} from './types'

export const openSidebar = () => async dispatch => {
    dispatch({
        type: OPEN_SIDEBAR
    })
}

export const closeSidebar = () => async dispatch => {
    dispatch({
        type: CLOSE_SIDEBAR
    })
}