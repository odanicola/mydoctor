import IO from 'socket.io-client';
import CONSTANT from '../config'
import { CONNECT, DISCONNECT } from '../store/actions/types'

var socket;
export const connect = () => {
    return async dispatch => {
        socket = IO(CONSTANT.SOCKET_URL, {
            forceNew: false
        })
        
        socket.on('connect', () => {
            console.log('id', socket.id)
            console.log('connected', socket.connected)
            dispatch({
                type: CONNECT,
                payload: {
                    connected: socket.connected
                }
            })
        })
    }
}

export const disconnect = () => {
    return async dispatch => {
        socket = IO(CONSTANT.SOCKET_URL, {
            forceNew: false
        })

        socket.disconnect()
        dispatch({
            type: DISCONNECT,
            payload: {
                connected: socket.connected
            }
        })
    }
}