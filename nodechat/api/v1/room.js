const axios = require('axios')

// creating room
const createRoom = async (payload) => {
    return await axios.post(`${process.env.GO_URL}/v1/room`, payload).then(({data}) => {
        return {
            data: data
        }
    }).catch(function (error) {
        if (error.response != undefined) {
            return error.response.data
        } else {
            return {
                error: "Unknow error"
            }
        }
    })
}
module.exports = { createRoom }