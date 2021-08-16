import axios from 'axios';
import IO from 'socket.io-client';
import CONSTANT from '../../config'
import Helper from '../../helper'
import {
    JOIN_CHATROOM,
    CHAT_ERROR,
    SEND_MESSAGE,
    LOAD_MESSAGES,
    LEAVE_CHATROOM,
    CREATEROOM,
    GETROOMBYUSERID
} from '../actions/types'

const socket = IO(CONSTANT.SOCKET_URL, {
    forceNew: false
})

socket.on('connect', () => {
    console.log(socket.id)
    console.log(socket.disconnected)
})

export const onCreateRoom = (data) => {
    return async dispatch => {
        dispatch({
            type: CREATEROOM,
            payload: {
                status: false,
                room: []
            }
        })
        await axios.post(`${CONSTANT.BACKEND_URL}/v1/room`,data).then(({data}) => {
            dispatch({
                type: CREATEROOM,
                payload: {
                    status: true,
                    room: data
                }
            })
        }).catch(function(error) {
            console.log('error', error)
        })
    }
}

export const onGetRoomByUserId = () => {
    return async dispatch => {
        dispatch({
            type: CREATEROOM,
            payload: {
                room: []
            }
        })
        const user = await Helper.getUserData()
        await axios.get(`${CONSTANT.BACKEND_URL}/v1/room/user/${user.id}`).then(({data}) => {
            dispatch({
                type: CREATEROOM,
                payload: {
                    room: data
                }
            })
        }).catch(function (error) {
            console.log('error', error)
        })
    }
}

export const onJoinChatRoom = (data) => {
    return async dispatch => {
        dispatch({
            type: LOAD_MESSAGES,
            payload: {
                messages: []
            },
        });
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
                console.log('callback message', callback.message)
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
        // console.log('room', data)
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