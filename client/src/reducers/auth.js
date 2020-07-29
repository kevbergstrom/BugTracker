import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from '../actions/types'

const initialState = {
    loading: true,
    isAuthenticated: false,
    user: null
}

export default function(state = initialState, action) {
    const { type, payload } = action

    // case USER_LOADED
    switch(type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: payload,
                loading: false
            }
        case LOGIN_FAIL:
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                loading: false
            }
        default:
            return state
    }
}
