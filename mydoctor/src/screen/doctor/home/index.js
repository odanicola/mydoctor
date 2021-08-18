import React, { useEffect, useContext, useState } from 'react'
import { View, SafeAreaView, ScrollView, TouchableOpacity, RefreshControl } from 'react-native'
import { Text, Button, Avatar, Card, Title, Paragraph, Divider } from 'react-native-paper'
import { AuthContext } from '../../../navigation/AuthProvider'
import { connect } from 'react-redux'
import { Loading } from '../../../component'
import * as ChatActions from '../../../store/actions/chatAction'

const DoctorHome = props => {
    const {user} = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefereshing] = useState(false)
    
    useEffect(() => {
        // loadRoom()
        const unsubscribe = props.navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            loadRoom()
        });
        return unsubscribe;
    },[props.navigation])

    const loadRoom = async () => {
        setRefereshing(false)
        setLoading(true)
        await props.onGetRoomByUserId()
        setLoading(false)
    }

    const onRefresh = () => {
        setRefereshing(true)
        loadRoom()
    }

    const renderRooms = () => {
        const { chat } = props
        const room = chat.room 

        var render = []
        if (room && room.length > 0) {
            room.map((item,index) => {
                const params = {id: item.id, name: user.name, recipient: {
                    id: item.recipient.id,
                    name: item.recipient.name, 
                    photo: item.recipient.photo
                }}
                render.push(
                    <Card key={item.id} style={{ marginVertical: 5 }}  onPress={() => {
                        props.navigation.navigate('Chat', params)
                    }}>
                        <Card.Content>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Avatar.Image size={60} source={{ uri: item.recipient.photo }} />
                                <View style={{ flex: 1 }}>
                                    <View style={{
                                        flexDirection: 'row', alignItems: 'center'
                                    }}>
                                        <View style={{ marginHorizontal: 10, flex: 1 }}>
                                            <Text style={{ fontSize: 16 }}>{item.recipient.name}</Text>
                                            <Text theme={{ fonts: { light: { fontFamily: 'Oxygen-Light.ttf' }} }} style={{ color: 'grey' }}>{item.messages.text ? item.messages.text : "New Message"}</Text>
                                        </View>
                                        <Button onPress={() => {
                                            props.navigation.navigate('Chat', params)
                                        }} mode="outlined">JOIN</Button>
                                    </View>
                                </View>
                            </View>
                        </Card.Content>
                    </Card>
                )
            })
        }
        return render
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff'
          }}>
            <View style={{
                padding: 15
            }}>
                <SafeAreaView>
                    <View>
                        <Text>Hello,</Text>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent:'space-between'
                        }}>
                            <Text style={{ fontSize: 22 }}>{user.name}</Text>
                            <TouchableOpacity onPress={() => {
                                props.navigation.navigate('Profile')
                            }}>
                                <Avatar.Image size={32} source={{ uri: user.photo }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </View>
            <Divider />
            <ScrollView style={{ padding: 14 }} refreshControl={ <RefreshControl onRefresh={() => { onRefresh() }} refreshing={refreshing}/>}>
                <View style={{
                    padding: 1
                }}>{renderRooms()}</View>
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
    onGetRoomByUserId: () => ChatActions.onGetRoomByUserId()
}
export default connect(mapStateToProps, mapDispatchToProps)(DoctorHome)