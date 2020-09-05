import axios from 'axios'
import store from '../store'
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL
} from './types'

export const checkAuth = () => async dispatch => {
    // See if the user's session is still up
    try {
        const res = await axios.get('/api/user')
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

export const login = (email, password) => async dispatch => {
    // Check to see if already logged in
    const user = store.getState().authReducer.user
    if(user) {
        console.log('already logged in')
        return
    }
    // Construct request body
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ email, password })

    try {
        const res = await axios.post('/api/user/login', body, config)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data
        })
    }
}

export const signup = (username, email, password) => async dispatch => {
    // Check to see if already logged in
    const user = store.getState().authReducer.user
    if(user) {
        console.log('already logged in')
        return
    }
    // Construct request body
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ username, email, password })

    try {
        const res = await axios.post('/api/user', body, config)
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL,
            payload: err.response.data
        })
    }
}

export const logout = () => async dispatch => {
    dispatch({
        type: LOGOUT
    })
    try {
        await axios.delete('/api/user')
    } catch (err) {
        console.log(err)
    }
}