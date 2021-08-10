import {combineReducers} from 'redux';
import chatReducer from './chatReducer';
import socketReducer from './socketReducer';
export default combineReducers({
    chat: chatReducer,
    socket: socketReducer
});
