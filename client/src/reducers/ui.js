import {
    OPEN_SIDEBAR,
    CLOSE_SIDEBAR
} from '../actions/types'

const initialState = {
    sidebarOpen: false
}

export default function(state = initialState, action) {
    const {type, payload} = action
    
    switch(type) {
        case OPEN_SIDEBAR:
            return {
                ...state,
                sidebarOpen: true
            }
        case CLOSE_SIDEBAR:
            return {
                ...state,
                sidebarOpen: false
            }
        default:
            return state
    }
}
