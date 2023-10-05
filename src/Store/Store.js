import {createStore  , applyMiddleware} from 'redux'
import CombineReducers from '../Reducers/CombineReducers'
import thunk from 'redux-thunk'


const persistedState =  localStorage.getItem('reduxStore-stp')  ? JSON.parse(localStorage.getItem('reduxStore-stp')) : {}




const store  =  createStore(
    CombineReducers , 
    persistedState,
    applyMiddleware(thunk)
)

export default store


