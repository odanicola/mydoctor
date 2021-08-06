/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useEffect, useState } from 'react';
 import {
   Text,
   Button,
   View,
 } from 'react-native';
 
 import IO from 'socket.io-client';
 
 class App extends React.Component {
   constructor(props) {
     super(props)
     this.state = {
       status: "not connected",
       name: null,
       users: ['202101010001', '202101010002'],
       messages: [],
       timer: 0
     }
   }
   componentDidMount() {
     // this.connect()
   }
 
   connect = (user) => {
     this.setState({ name: user })
 
     const { name, users } = this.state
 
     const furikarta = "http://192.168.1.13:9000"
 
     const socket = IO(furikarta, {
       forceNew: true
     })
 
     socket.on('connection', () => {
       console.log('connection')
     })
     
     socket.emit('join', {name: user, room: "infokes", description: "Konsultasi 10 menit", users: users}, error => {
       if (error) {
         console.log('error', error)
       }
     })
 
     socket.on('message', messages => {
       console.log('message', messages)
       // this.setState({ messages: [...this.state.messages,messages] })
       this.setState(prevState => ({
         messages: [...prevState.messages,messages]
       }))
     })
 
     socket.on('timer', time => {
       console.log('timer', time)
       // this.setState({ timer: time })
     })
   }
 
   renderMessages = () => {
     const { messages } = this.state
     var render = []
     if (messages.length > 0) {
       messages.map((item,index) => { 
         render.push(
           <Text key={index}>{item.message}</Text>
         )
       })
     } else {
       render.push(<Text key={0}>No messages</Text>)
     }
 
     return <View>{render}</View>
   }
 
   render() {
     return (
       <View style={{
         flex: 1,
         backgroundColor: 'white'
       }}>
         {
           this.state.name != null ?
           <View
             style={{
               padding: 10
             }}
           >
             <Text>connected as {this.state.name} with timer {this.state.timer}</Text>
             {this.renderMessages()}
           </View>
           : <View
               style={{
                 justifyContent: "center",
                 alignItems: "center",
                 flex: 1
               }}
             >
             <Text style={{ marginBottom: 10 }}>Please select login as</Text>
             <View style={{ width: 250, flexDirection: 'column', justifyContent: 'space-between', alignContent: 'space-between' }}>
               <View style={{ marginBottom: 10 }}>
                 <Button 
                   onPress={() => { this.connect('patient') }}
                   title={'patient'}
                 />
               </View>
               
               <View style={{ marginBottom: 10 }}>
                 <Button 
                   onPress={() => { this.connect('doctor') }}
                   title={'doctor'}
                 />
               </View>
             </View>
           </View>
         }
     </View>
     )
   }
 }
 export default App;
 