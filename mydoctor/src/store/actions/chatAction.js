import IO from 'socket.io-client';
import CONSTANT from '../../config'
import {
    JOIN_CHATROOM,
    CHAT_ERROR,
    SEND_MESSAGE,
    LOAD_MESSAGES,
    LEAVE_CHATROOM
} from '../actions/types'

const socket = IO(CONSTANT.SOCKET_URL, {
    forceNew: false
})

socket.on('connect', () => {
    console.log(socket.id)
    console.log(socket.disconnected)
})

export const onJoinChatRoom = (data) => {
    return async dispatch => {
        await socket.emit('join', data, error => {
            if (error) {
                console.log('error', error)
                dispatch({
                    type: CHAT_ERROR,
                    payload: {
                        error_message: error
                    },
                });
            }
        });

        await socket.emit('loadmessages', data, callback => {
            if (callback.status) {
                // console.log('callback message', callback.message)
                dispatch({
                    type: LOAD_MESSAGES,
                    payload: {
                        messages: callback.message
                    },
                });
            }
        })
        
        await socket.on('message', message => {
            // console.log('message', message)
            dispatch({
                type: JOIN_CHATROOM,
                payload: {
                    messages: message
                },
            });
        });
    }
}

export const onSendMessage = (data) => {
    return async dispatch => {
        dispatch({
            type: SEND_MESSAGE,
            payload: {
                send_message_status: false
            }
        })
        socket.emit('send', data, callback => {
            console.log('cb',callback)
            dispatch({
                type: SEND_MESSAGE,
                payload: {
                    send_message_status: true
                }
            })
        });
        
        socket.on('message', message => {
            // console.log('message', message)
            dispatch({
                type: JOIN_CHATROOM,
                payload: {
                    messages: message
                },
            });
        });
    }
}

export const onLeaveRoom = (data) => {
    return async dispatch => {
        console.log('masuk')
        console.log('room', data)
        socket.emit('leaveroom', data, callback => {
            console.log('has disconnected', callback)
            dispatch({
                type: LEAVE_CHATROOM,
                payload: {
                    messages: []
                }
            })
        })
    }
}