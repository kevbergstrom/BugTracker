import { combineReducers } from 'redux'
import authReducer from './auth'
import uiReducer from './ui.js'

export default combineReducers({
    authReducer,
    uiReducer
})