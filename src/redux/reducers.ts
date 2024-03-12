import { combineReducers } from 'redux'
import players from '../redux/slices/playersSlice';

const reducers = combineReducers({
    players,
})

export default reducers;