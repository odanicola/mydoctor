import {
    JOIN_CHATROOM,
    LOAD_MESSAGES,
    CHAT_ERROR,
    SEND_MESSAGE,
    CREATEROOM,
    LEAVE_CHATROOM,
    GETROOMBYUSERID
  } from '../actions/types';

  initialState = {
    messages: [],
    error_message: null,
    send_message_status: false,
    status: false,
    room: []
  };
  
  const filter = (array,key) => {
        if (array & array.length > 0) {
            return [...new Map(array.map(item => [item[key], item])).values()]
        }

        return array
  }

  export default (state = initialState, action) => {
    switch (action.type) {
        case GETROOMBYUSERID:
            return {
                ...state,
                room: action.payload.room
            }
        case CREATEROOM: 
            return {
                ...state,
                status: action.payload.status,
                room: action.payload.room
            }
        case LEAVE_CHATROOM: 
            return {
                ...state,
                messages: action.payload.messages
            }
        case SEND_MESSAGE: 
            return {
                ...state,
                send_message_status: action.payload.send_message_status
            }
        case CHAT_ERROR: 
            return {
                ...state,
                send_message_status: action.payload.status,
                error_message: action.payload.error_message
            }
        case JOIN_CHATROOM:
            var messages = [];
            // console.log('state', state.messages)
            if (state.messages) {
                messages = filter([...state.messages, action.payload.messages],'_id')
                messages.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
            } else {
                messages.push(action.payload.messages)
            }
        
            return {
                ...state,
                messages: messages
            }
        case LOAD_MESSAGES: 
            var messages = action.payload.messages
            var update = state.messages

            if (messages && messages.length > 0) {
                messages.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
            
                for (let index = 0; index < messages.length; index++) {
                    const element = messages[index];
                    update.push(element)
                }
                update = filter(update,'_id')
            }
            
            return {    
                ...state,
                messages: update
            }
        default:
            return state;
    }
  };
  