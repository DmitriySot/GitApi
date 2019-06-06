import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import users from '../ducks/users'

const reducers = combineReducers({ users })

export default createStore(reducers, {}, applyMiddleware(thunk))
