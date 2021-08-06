import {
    JOIN_CHATROOM,
    LOAD_MESSAGES,
    CHAT_ERROR,
    SEND_MESSAGE,
    CHAT_DISCONNECT,
    LEAVE_CHATROOM
  } from '../actions/types';

  initialState = {
    messages: [],
    error_message: null,
    send_message_status: false
  };
  
  const filter = (array,key) => {
    return [...new Map(array.map(item => [item[key], item])).values()]
  }

  export default (state = initialState, action) => {
    switch (action.type) {
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
            var messages = filter([...state.messages, action.payload.messages],'_id')
            messages.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
            // console.log('join room', messages)
            return {
                ...state,
                messages: messages
            }
        case LOAD_MESSAGES: 
            var messages = action.payload.messages
            messages.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
            
            var update = state.messages
            for (let index = 0; index < messages.length; index++) {
                const element = messages[index];
                update.push(element)
            }
            update = filter(update,'_id')
            console.log('dd')
            console.log('reducer', update)
            return {    
                ...state,
                messages: update
            }
        default:
            return state;
    }
  };
  