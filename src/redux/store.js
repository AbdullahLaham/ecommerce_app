import { applyMiddleware, createStore } from 'redux'
// import rootReducer from './RootReduce'
import { fetchReducer } from "./fetchProducts/fetchReducer";

import logger from 'redux-logger'
// const store = createStore(rootReducer, applyMiddleware(logger))
const store = createStore(fetchReducer, applyMiddleware(logger))
export default store

