import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL
} from '../actions/types'

const initialState = {
    loading: true,
    isAuthenticated: false,
    user: null,
    error: null
}

export default function(state = initialState, action) {
    const { type, payload } = action

    switch(type) {
        case LOGIN_SUCCESS:
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: payload,
                loading: false,
                error: null
            }
        case LOGIN_FAIL:
        case SIGNUP_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                loading: false,
                error: payload
            }
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                loading: false,
                error: null
            }
        default:
            return state
    }
}
