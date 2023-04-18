import { combineReducers } from "redux";
import auth from './auth'
import images from './images'
import common from './common'

export default combineReducers({
    auth,
    images,
    common
})