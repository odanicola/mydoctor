import React, { useEffect, useState, useContext, useCallback } from 'react'
import { View, SafeAreaView } from 'react-native'
import { Text, Button, IconButton, Colors, Avatar } from 'react-native-paper'
import { GiftedChat } from 'react-native-gifted-chat'
import { connect, useStore, useSelector } from 'react-redux'
import { onJoinChatRoom, onSendMessage, onLeaveRoom } from '../../store/actions/chatAction'
import Helper from '../../helper'
import CONSTANT from '../../config'
import { AuthContext } from '../../navigation/AuthProvider'
import IO from 'socket.io-client';

const Chat = props => {
    
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState([])
    const [isTyping, setIsTyping] = useState(false)
    const [typingText, isTypingText] = useState(null)

    const socket = IO(CONSTANT.SOCKET_URL, {
        forceNew: false
    })
    
    useEffect(() => {
        socket.on('connect', () => {
            console.log(socket.id)
            console.log(socket.disconnected)
        })

        socket.on('message', message => {
            setMessages(previousMessages => GiftedChat.append(previousMessages, message))
        })

        socket.on('typing', callback => {
            console.log('text', callback)
            if (callback.id != user.id) {
                if (callback.istyping) {
                    isTypingText('typing...')
                } else {
                    isTypingText(null)
                }
            } else {
                isTypingText(null)
            }
        })

        joinRoom()
        console.log(user.name,isTyping)
    },[])

   const joinRoom = async () => {
        setLoading(true)
        const { route } = props
        const data = route.params
        await socket.emit('join', data, error => {})
        setTimeout(() => {
            setLoading(false)
            loadMessages()
        }, 300);
   }

   const loadMessages = () => {
        const { route } = props
        const data = route.params
        setLoading(true)
        socket.emit('loadmessages', data, callback => {
            if (callback.status) {
                setMessages(previousMessages => GiftedChat.append(previousMessages, callback.message))
            }
            setLoading(false)
        })
   }

   const onTyping = (text) => {
        const { route } = props
        const params = route.params
        console.log('isTyping', isTyping)
        if (text != "") {
            setIsTyping(true)
            const data = {
                id: params.id, 
                user: user.id,
                name: user.name, 
                text: text,
                istyping: true
            }
            console.log('data typing', data)
            socket.emit('typing', data, callback => {
                console.log('callback', callback)
            })
        } else {
            setIsTyping(false)
            const data = {
                id: params.id, 
                user: user.id,
                name: user.name, 
                text: text,
                istyping: false
            }
            console.log('data typing', data)
            socket.emit('typing', data, callback => {
                console.log('callback', callback)
            })
        }
    }

   const onSend = useCallback((message = []) => {
        var data = message.shift()
        data.room = props.route.params.id

        socket.emit('send', data, callback => {
            // console.log('messages on send', callback)
            setMessages(previousMessages => GiftedChat.append(previousMessages, callback.message))
        })
        
    }, [])

   const onLeaveRoom = async () => {
        const { route } = props
        const data = route.params
        // await props.onLeaveRoom(data)
        console.log('data leave', data)
        await socket.emit('leaveroom', data, callback => {})
        const type = await Helper.getUserType()
        setTimeout(() => {
            if (type == 'doctor') {
                props.navigation.navigate('DoctorHome')
            } else {
                props.navigation.navigate('Home')
            }
        }, 300);
   }

   const filter = (array,key) => {
        if (array && array.length > 0) {
            return [...new Map(array.map(item => [item[key], item])).values()]
        } 

        return array
   }

   const sort = (messages) => {
        if (messages && messages.length > 0) {
            messages.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
        }
        return messages
   }

   return (
    <View style={{
        flex: 1
    }}>
        <SafeAreaView>
            <View style={{
                flexDirection: 'row',
                paddingVertical: 10,
                backgroundColor: 'white',
                alignItems:'center',
            }}>
                <IconButton
                    icon="arrow-left"
                    color={Colors.black}
                    onPress={() => props.navigation.goBack()}
                />
                <View style={{
                    flex: 1,
                    justifyContent: 'flex-start', 
                    flexDirection: 'row', alignItems: 'center'
                }}>
                    <Avatar.Image size={26} source={{ uri: props.route.params.recipient.photo }} />
                    <View>
                        <Text style={{ marginLeft: 5 }}>{props.route.params.recipient.name ? props.route.params.recipient.name : 'Chat Room'}</Text>
                        {
                            typingText ? <Text style={{ marginLeft: 5, color: 'grey' }}>{typingText}</Text>:null
                        }
                    </View>
                    
                </View>
                <IconButton
                    icon="exit-to-app"
                    color={Colors.red900}
                    onPress={() => onLeaveRoom()}
                />
            </View>
        </SafeAreaView>
        {loading ? null 
        :<GiftedChat
             messages={sort(filter(messages,'_id'))}
             onSend={messages => onSend(messages)}
             user={{
                 _id: user.id,
                 name: user.name
             }}
             isTyping={isTyping}
             onInputTextChanged={text => {
                 onTyping(text)
             }}
             textInputStyle={{ color: 'black' }}
         />}
    </View>
)
}

const mapStateToProps = state => {
    const { chat } = state
    return {
        chat: chat,
        send_message: chat.send_message_status
    }
}

const mapDispatchToProps = {
    onJoinChatRoom: (data) => onJoinChatRoom(data),
    onSendMessage: (data) => onSendMessage(data),
    onLeaveRoom: (data) => onLeaveRoom(data)
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
