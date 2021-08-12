import {
    CREATEUSER, USERDISCONNECT
} from './types'
import axios from 'axios'
import CONSTANT from '../../config'
import Helper from '../../helper'

export const onCreateUser = (data) => {
    return async dispatch => {
        await axios.post(`${CONSTANT.BACKEND_URL}/v1/user`, data).then(({data}) => {
            dispatch({
                type: CREATEUSER, 
                payload: { user: data }
            })
        }).catch(function (error) {
            console.log('error', error)
            console.log('error', error.response.data)
        })
    }
}

export const onUserDisconnect = () => {
    return async dispatch => {
        const user = await Helper.getUserData()
        const type = await Helper.getUserType()
        
        const data = {
            name: user.name, email: user.email, photo: user.photo, type: type, online: "false"
        }

        await axios.post(`${CONSTANT.BACKEND_URL}/v1/user`, data).then(({data}) => {
            dispatch({
                type: USERDISCONNECT,
                payload: { user : data }
            })
        }).catch(function (error) {
            console.log('error', error)
        })
    }
}