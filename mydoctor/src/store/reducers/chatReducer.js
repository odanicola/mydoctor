import {
    JOIN_CHATROOM,
    LOAD_MESSAGES,
    CHAT_ERROR,
    SEND_MESSAGE,
    CREATEROOM,
    LEAVE_CHATROOM,
    GETROOMBYUSERID,
    SETROOM
  } from '../actions/types';

  initialState = {
    messages: [],
    error_message: null,
    send_message_status: false,
    status: false,
    room: [],
    room_id: null,
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
        case SETROOM:
            return {
                ...state,
                room_id: action.payload.room_id,
                messages: []
            }
        case JOIN_CHATROOM:
            var messages = [];
            // messages.push(action.payload.messages)
            console.log('state room', state.room_id, action.payload.room_id)
            if (state.messages) {
                if (state.room_id == action.payload.room_id) {
                    messages = filter([...state.messages, action.payload.messages],'_id')
                    messages.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
                } else {
                    messages = state.messages
                }
            } else {
                messages.push(action.payload.messages)
            }
        
            return {
                ...state,
                room_id: action.payload.room_id,
                messages: messages
            }
        case LOAD_MESSAGES: 
            var messages = action.payload.messages
            var update = state.messages
            console.log('update', update)
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
  