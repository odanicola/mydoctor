import React, { useEffect, useContext } from 'react'
import { View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { Text, Button, Avatar, Card, Title, Paragraph } from 'react-native-paper'
import { AuthContext } from '../../navigation/AuthProvider'

const Home = props => {
    const {user} = useContext(AuthContext);
    
    useEffect(() => {
        console.log('user', user)
    },[])

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
            <View style={{
                padding: 15
            }}>
                <Card>
                    <Card.Content>
                        <Text style={{ fontWeight: '200', marginBottom: 10 }}>Latest conversation with</Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent:'space-between'
                        }}>
                            <Avatar.Image size={26} source={{ uri: user.photo }} />
                            <View style={{ flex: 1 }}>
                                <View style={{
                                    flexDirection: 'row', alignItems: 'center'
                                }}>
                                    <View style={{ marginHorizontal: 10, flex: 1 }}>
                                        <Text>dr. Indra Wibowo</Text>
                                        <Text style={{ fontSize: 10, color: 'grey' }} theme={{ fonts: { regular: { fontWeight: '100' } } }}>Spesialis Umum</Text>
                                    </View>
                                    <Button mode="contained">View</Button>
                                </View>
                            </View>
                            
                        </View>
                    </Card.Content>
                </Card>
            </View>
            <View style={{
                padding: 15
            }}>
                <Title>Online Doctors</Title>
                <Card>
                    <Card.Content>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Avatar.Image size={60} source={{ uri: user.photo }} />
                            <View style={{ flex: 1 }}>
                                <View style={{
                                    flexDirection: 'row', alignItems: 'center'
                                }}>
                                    <View style={{ marginHorizontal: 10, flex: 1 }}>
                                        <Text style={{ fontSize: 16 }}>dr. Indra Wibowo</Text>
                                        <Text theme={{ fonts: { light: { fontFamily: 'Oxygen-Light.ttf' }} }} style={{ color: 'grey' }}>Spesialis Umum</Text>
                                    </View>
                                    <Button mode="outlined">Free</Button>
                                </View>
                            </View>
                        </View>
                    </Card.Content>
                </Card>
                <Card  onPress={() => {
                    alert('ddd')
                }}>
                    <Card.Content>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Avatar.Image size={60} source={{ uri: user.photo }} />
                            <View style={{ flex: 1 }}>
                                <View style={{
                                    flexDirection: 'row', alignItems: 'center'
                                }}>
                                    <View style={{ marginHorizontal: 10, flex: 1 }}>
                                        <Text style={{ fontSize: 16 }}>dr. Letuce</Text>
                                        <Text theme={{ fonts: { light: { fontFamily: 'Oxygen-Light.ttf' }} }} style={{ color: 'grey' }}>Spesialis Umum</Text>
                                    </View>
                                    <Button mode="outlined">IDR 15K</Button>
                                </View>
                            </View>
                        </View>
                    </Card.Content>
                </Card>
            </View>
        </View>
    )
}

export default Home