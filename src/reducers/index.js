import { combineReducers } from 'redux'
// import images from './images'
import { navReducer } from '../navigation'

const rootReducers = combineReducers({
    nav: navReducer
})

export default rootReducers