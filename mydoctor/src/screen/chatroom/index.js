import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, SafeAreaView, Button } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { connect, useStore, useSelector } from 'react-redux'
import { onJoinChatRoom, onSendMessage, onLeaveRoom } from '../../store/actions/chatAction'

class Chat extends React.Component {
   constructor(props) {
        super(props) 
        this.state = {
            messages : [],
            name: null,
            users: ['202101010001', '202101010002'],
            onSendMessage: false
        }
   }

   componentDidMount() {
        this.onJoinChatRoom()    
   }

   async componentDidUpdate(prevProps, prevState) {
       if (prevState.messages.length !== this.props.chat.messages.length) {
            // await this.onLoadMessages()
       }
   }

   onLoadMessages = () => {
        let messages = this.props.chat.messages
        this.setState({ messages: [...this.state.messages, messages]})
   }

   onJoinChatRoom = async () => {
        const { route, chat } = this.props
        const { users } = this.state
        const data = { name: route.params.name, room: route.params.room, description: "Konsultasi 10 menit", users: users }
        await this.props.onJoinChatRoom(data)
   }

   onSend = async (messages) => {
        messages = messages.shift()
        messages.room = this.props.route.params.room
        await this.props.onSendMessage(messages)
   }

   onLeaveRoom = async () => {
        const { route } = this.props
        const data = {
            room: route.params.room,
            name: route.params.name
        }
        await this.props.onLeaveRoom(data)
        setTimeout(() => {
            this.props.navigation.navigate('Home')
        }, 300);
   }

   filter = (array,key) => {
        return [...new Map(array.map(item => [item[key], item])).values()]
   }

   render() {
       const { messages } = this.state
       const { route, chat } = this.props
       return (
           <View style={{
               flex: 1
           }}>
               <SafeAreaView>
                   <View style={{
                       flexDirection: 'row',
                       padding: 15, 
                       backgroundColor: 'white',
                       alignItems:'center',
                   }}>
                       <Button title={'back'} onPress={() => {
                           this.props.navigation.goBack()
                       }}/>
                       <View style={{
                           flex: 1,
                           justifyContent: 'center'
                       }}>
                        <Text style={{ fontSize: 16, fontWeight: '700', alignSelf: 'center' }}>{this.props.route.params.room}</Text>
                       </View>
                       <Button title={'leave'} color={'red'} onPress={() => {
                           this.onLeaveRoom()
                       }}/>
                   </View>
               </SafeAreaView>
               <GiftedChat
                    messages={this.filter(chat.messages, '_id')}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: route.params.id,
                        name: route.params.name
                    }}
                    isTyping={true}
                    textInputStyle={{ color: 'black' }}
                />
           </View>
       )
   }
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
