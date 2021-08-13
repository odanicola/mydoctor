import React, { useContext, useEffect } from 'react'
import { View, ScrollView, SafeAreaView } from 'react-native'
import { Text, Avatar, Card, Title, Paragraph, Button } from 'react-native-paper'
import { AuthContext } from '../../navigation/AuthProvider'
import * as SocketActions from '../../config/socket'
import { connect } from 'react-redux'

const ProfileDoctor = props => {
    const { user } = useContext(AuthContext);
    const { params } = props.route
    const doctor = params

    useEffect(() => {
        
    },[])

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
                    <Button mode="contained" style={{ marginVertical: 10 }} onPress={() => {
                        props.navigation.navigate('Chat', {  })
                    }}>Chat Now</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);