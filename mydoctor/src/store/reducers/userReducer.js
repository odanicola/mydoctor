import {
    CREATEUSER, UPDATEUSER, GETDOCTORS
  } from '../actions/types';

  initialState = {
    user: null,
    doctors: []
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
        case GETDOCTORS: 
            return {
                ...state,
                doctors: action.payload.doctors
            }
        default:
            return state;
    }
  };
  