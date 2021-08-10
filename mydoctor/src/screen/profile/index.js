import React, { useContext, useEffect } from 'react'
import { View, ScrollView, SafeAreaView } from 'react-native'
import { Text, Avatar, Card, Title, Paragraph, Button } from 'react-native-paper'
import { AuthContext } from '../../navigation/AuthProvider'
import * as SocketActions from '../../config/socket'
import { connect } from 'react-redux'

const Profile = props => {
    const {user, logout} = useContext(AuthContext);
    
    useEffect(() => {
        onConnect()
    },[])

    const onConnect = async () => {
        await props.onConnect()
    }

    const onLogout = async () => {
        await props.onDisconnect()
        logout()
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
                    <Avatar.Image size={120} source={{ uri: user.photo }}/>
                </View>
            </SafeAreaView>
            <ScrollView>
                <View style={{
                    padding: 15
                }}>
                    <Card>
                        <Card.Content>
                            <Title>Online</Title>
                            <Paragraph>{props.socket.connected ? 'online' : 'offline'}</Paragraph>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content>
                            <Title>Name</Title>
                            <Paragraph>{user.name}</Paragraph>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content>
                            <Title>Given Name</Title>
                            <Paragraph>{user.givenName}</Paragraph>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content>
                            <Title>Family Name</Title>
                            <Paragraph>{user.familyName}</Paragraph>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content>
                            <Title>Email</Title>
                            <Paragraph>{user.email}</Paragraph>
                        </Card.Content>
                    </Card>
                    <Button mode="contained" style={{ marginVertical: 10 }} onPress={() => {
                        onLogout()
                    }}>Logout</Button>
                </View>
            </ScrollView>
        </View>
    )
}

const mapStateToProps = state => {
    const { socket } = state
    return {
        socket: socket
    }
}

const mapDispatchToProps = {
    onConnect: () => SocketActions.connect(),
    onDisconnect: () => SocketActions.disconnect()
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);