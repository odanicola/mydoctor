import React, { useEffect, useState, useCallback } from 'react'
import { View, Text } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { connect, useStore, useSelector } from 'react-redux'
import { onJoinChatRoom } from '../../store/actions/chatAction'
import CONSTANT from '../../config'
import IO from 'socket.io-client';

const Chat = props => {
    const [messages, setMessages] = useState([])
    const [name, setName] = useState(null)
    const [users, setUsers] = useState(['202101010001', '202101010002'])
    const store = useStore()
    const chatMessages = useSelector((state) => state.chat.messages)
    
    useEffect(() => {
        const { name } = props.route.params;
        setName(name)
        join()
        
    },[])

    const join = async () => {
        const data = {name: props.route.params.name, room: 'infokes', description: 'Konsultasi 10 menit', users: users}
        await props.onJoinChatRoom(data)
        loadMessages()
    }

    const loadMessages = async () => {
        console.log(store.getState().chat.messages)
        await setMessages(previousMessages => GiftedChat.append(previousMessages, chatMessages))
    }

    const onSend = useCallback((messages = []) => {
        console.log("ini message",messages)
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    })

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
            }}
        />
    )
}

const mapStateToProps = (state) => {
    const { chat } = state
    return {
        chat: chat
    }
}

const mapDispatchToProps = {
    onJoinChatRoom: (data) => onJoinChatRoom(data)
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
