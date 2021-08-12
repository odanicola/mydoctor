import {
    CREATEUSER, UPDATEUSER
  } from '../actions/types';

  initialState = {
    user: null
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
        case CREATEUSER: 
            return {
                ...state,
                user: action.payload.user
            }
        case UPDATEUSER: 
            return {
                ...state,
                user: action.payload.user
            }
        default:
            return state;
    }
  };
  