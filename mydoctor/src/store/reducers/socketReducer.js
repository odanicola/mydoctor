import {
    CONNECT,
    CONNECTED,
    DISCONNECT
  } from '../actions/types';

  initialState = {
    connected: false
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
        case CONNECT: 
            return {
                ...state,
                connected: action.payload.connected
            }
        case CONNECTED: 
            return {
                ...state,
                connected: action.payload.connected
            }
        case DISCONNECT: 
            return {
                ...state,
                connected: action.payload.connected
            }
        default:
            return state;
    }
  };
  