import React, { useEffect, useState, useContext } from 'react'
import { View, SafeAreaView } from 'react-native'
import { Text, Button, IconButton, Colors, Avatar } from 'react-native-paper'
import { GiftedChat } from 'react-native-gifted-chat'
import { connect, useStore, useSelector } from 'react-redux'
import { onJoinChatRoom, onSendMessage, onLeaveRoom } from '../../store/actions/chatAction'
import Helper from '../../helper'
import { AuthContext } from '../../navigation/AuthProvider'

const Chat = props => {
    const { user } = useContext(AuthContext);
    
    useEffect(() => {
        joinRoom()
    },[])

   const joinRoom = async () => {
        const { route } = props
        const data = route.params
        await props.onJoinChatRoom(data)
   }

   const onSend = async (messages) => {
        messages = messages.shift()
        messages.room = props.route.params.id
        await props.onSendMessage(messages)
   }

   const onLeaveRoom = async () => {
        const { route } = props
        const data = route.params
        await props.onLeaveRoom(data)
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
                    <Text style={{ marginLeft: 5 }}>{props.route.params.recipient.name ? props.route.params.recipient.name : 'Chat Room'}</Text>
                </View>
                <IconButton
                    icon="exit-to-app"
                    color={Colors.red900}
                    onPress={() => onLeaveRoom()}
                />
            </View>
        </SafeAreaView>
        <GiftedChat
             messages={filter(props.chat.messages, '_id')}
             onSend={messages => onSend(messages)}
             user={{
                 _id: user.id,
                 name: user.name
             }}
             isTyping={true}
             textInputStyle={{ color: 'black' }}
         />
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
