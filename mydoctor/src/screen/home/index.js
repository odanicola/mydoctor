import React, { useEffect, useContext } from 'react'
import { View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { Text, Button, Avatar, Card, Title, Paragraph } from 'react-native-paper'
import { AuthContext } from '../../navigation/AuthProvider'
import { useStore, useDispatch } from 'react-redux'
import * as UserActions from '../../store/actions/userAction'

const Home = props => {
    const {user} = useContext(AuthContext);
    const dispatch = useDispatch()
    const store = useStore()
    
    useEffect(() => {
        console.log('user', user)
        loadDoctors()
    },[])

    const loadDoctors = async () => {
        await dispatch(UserActions.onGetDoctors())
    }

    const renderDoctors = () => {
        const doctors = store.getState().user.doctors
        
        var render = []
        if (doctors && doctors.length > 0) {
            doctors.map((item,index) => {
                render.push(
                    <Card key={item.id}>
                        <Card.Content>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Avatar.Image size={60} source={{ uri: item.photo }} />
                                <View style={{ flex: 1 }}>
                                    <View style={{
                                        flexDirection: 'row', alignItems: 'center'
                                    }}>
                                        <View style={{ marginHorizontal: 10, flex: 1 }}>
                                            <Text style={{ fontSize: 16 }}>{item.name}</Text>
                                            <Text theme={{ fonts: { light: { fontFamily: 'Oxygen-Light.ttf' }} }} style={{ color: 'grey' }}>Spesialis Umum</Text>
                                        </View>
                                        <Button mode="outlined">Free</Button>
                                    </View>
                                </View>
                            </View>
                        </Card.Content>
                    </Card>
                )
            })
        } else {
            render.push(<View key={0}><Text>Not found</Text></View>)
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
                {renderDoctors()}
            </View>
        </View>
    )
}

export default Home