import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from '../reducers'

const middleware = [thunk]
if (__DEV__) {
    middleware.push(logger)
}

export default initState => {
    const enhancer = compose(
        applyMiddleware(...middleware)
    )
    return createStore(rootReducer, initState, enhancer)
}