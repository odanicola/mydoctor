import React, { useContext, useEffect, useState } from 'react'
import { View, ScrollView, SafeAreaView } from 'react-native'
import { Text, Avatar, Card, Title, Paragraph, Button } from 'react-native-paper'
import { AuthContext } from '../../navigation/AuthProvider'
import * as SocketActions from '../../config/socket'
import * as ChatActions from '../../store/actions/chatAction'
import { connect, useStore } from 'react-redux'

const ProfileDoctor = props => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const { params } = props.route
    const doctor = params
    const store = useStore()

    useEffect(() => {
        
    },[])

    const createRoom = async () => {
        setLoading(true)
        const data = { 
            name: `${doctor.id}-${user.id}`, 
            description: "consultation", 
            users: [doctor.id,user.id],
            active: "true"
        }

        // console.log('data', data)
        await props.onCreateRoom(data)
        
        const status = store.getState().chat.status
        const room = store.getState().chat.room 
        // console.log('room', room)
        if (status) {
            const params = {
                id: room.id,
                name: user.name,
                recipient: {
                    name: doctor.name,
                    photo: doctor.photo
                },
            }
            setLoading(false)
            props.navigation.navigate('Chat', params)
        }

        setLoading(false)
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white'
          }}>
            <SafeAreaView>
                <View style={{
                    justifyContent: 'center', 
                    alignItems: 'center',
                    paddingVertical: 15
                }}>
                    <Avatar.Image size={120} source={{ uri: doctor.photo }}/>
                </View>
            </SafeAreaView>
            <ScrollView>
                <View style={{
                    padding: 15
                }}>
                    <Card>
                        <Card.Content>
                            <Title>Name</Title>
                            <Paragraph>dr. {doctor.name}</Paragraph>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content>
                            <Title>Specialist</Title>
                            <Paragraph>{doctor.specialist}</Paragraph>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content>
                            <Title>Price</Title>
                            <Paragraph>{parseInt(doctor.price) > 0 ? doctor.price : 'Free'}</Paragraph>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content>
                            <Title>Email</Title>
                            <Paragraph>{user.email}</Paragraph>
                        </Card.Content>
                    </Card>
                    {
                        loading ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center', marginVertical: 10}}><Text>Processing...</Text></View>
                        :<Button mode="contained" style={{ marginVertical: 10 }} onPress={() => {
                            createRoom()
                        }}>Chat Now</Button>
                    }
                </View>
            </ScrollView>
        </View>
    )
}

const mapStateToProps = state => {
    const { chat } = state
    return {
        chat: chat
    }
}

const mapDispatchToProps = {
    onConnect: () => SocketActions.connect(),
    onDisconnect: () => SocketActions.disconnect(),
    onCreateRoom: (data) => ChatActions.onCreateRoom(data)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);