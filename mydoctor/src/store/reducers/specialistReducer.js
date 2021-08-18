import {
    CREATESPECIALIST, GETSPECIALIST
  } from '../actions/types';

  initialState = {
    specialist: null,
    status: false
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
        case CREATESPECIALIST: 
            return {
                ...state,
                status: action.payload.status,
                specialist: action.payload.specialist
            }
        case GETSPECIALIST: 
            return {
                ...state,
                specialist: action.payload.specialist
            }
        default:
            return state;
    }
  };
  