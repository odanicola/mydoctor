import {combineReducers} from 'redux';
import chatReducer from './chatReducer';
import socketReducer from './socketReducer';
import userReducer from './userReducer'
import specialistReducer from './specialistReducer'
export default combineReducers({
    chat: chatReducer,
    socket: socketReducer,
    user: userReducer,
    specialist: specialistReducer
});
