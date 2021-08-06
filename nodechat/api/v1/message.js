const axios = require('axios')

// creating message
const createMessage = async (payload) => {
    return await axios.post(`${process.env.GO_URL}/v1/message`, payload).then(({data}) => {
        return {
            data: data
        }
    }).catch(function (error) {
        if (error.response != undefined) {
            return error.response.data
        } else {
            return {
                error: "Unknown error"
            }
        }
    })
}

// getting messages 
const loadMessages = async (room) => {
    return await axios.get(`${process.env.GO_URL}/v1/message?room=${room}`).then(({data}) => {
        return {
            data: data
        }
    }).catch(function (error) {
        if (error.response != undefined) {
            return error.response.data
        } else {
            return {
                error: 'Unknown error'
            }
        }
    })
}
module.exports = { createMessage, loadMessages }