import {
    CREATESPECIALIST, GETSPECIALIST
} from './types'
import axios from 'axios'
import CONSTANT from '../../config'
import Helper from '../../helper'

export const onCreateSpecialist = (data) => {
    return async dispatch => {
        dispatch({
            type: CREATESPECIALIST,
            payload: { specialist: null, status: false }
        })

        console.log('body', data)

        await axios.post(`${CONSTANT.BACKEND_URL}/v1/specialist`, data).then(({data}) => {
            dispatch({
                type: CREATESPECIALIST, 
                payload: { specialist: data, status: true }
            })
        }).catch(function (error) {
            console.log('error', error)
            console.log('error', error.response.data)
        })
    }
}

export const onGetSpecialist = (doctor_id) => {
    return async dispatch => {
        await axios.get(`${CONSTANT.BACKEND_URL}/v1/specialist`, {
            params: { doctor_id: doctor_id}
        }).then(({data}) => {
            console.log('data', data)
            dispatch({
                type: GETSPECIALIST, 
                payload: { specialist: data }
            })
        }).catch(function (error){
            console.log('error', error)
        })
    }
}