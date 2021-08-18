import React, { useEffect, useContext, useState } from 'react'
import { View, SafeAreaView, ScrollView, TouchableOpacity, RefreshControl } from 'react-native'
import { Text, Button, Avatar, Card, Title, Paragraph } from 'react-native-paper'
import { AuthContext } from '../../navigation/AuthProvider'
import { useStore, useDispatch } from 'react-redux'
import * as UserActions from '../../store/actions/userAction'
import { Loading } from '../../component'

const Home = props => {
    const {user} = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefereshing] = useState(false)
    const dispatch = useDispatch()
    const store = useStore()
    
    useEffect(() => {
        loadDoctors()
    },[])

    const loadDoctors = async () => {
        setLoading(true)
        await dispatch(UserActions.onGetDoctors())
        setRefereshing(false)
        setLoading(false)
    }

    const onRefresh = () => {
        setRefereshing(true)
        loadDoctors()
    }

    const renderDoctors = () => {
        const doctors = store.getState().user.doctors
        
        var render = []
        if (doctors && doctors.length > 0) {
            doctors.map((item,index) => {
                render.push(
                    <Card key={item.id} onPress={() => {
                        props.navigation.navigate('ProfileDoctor', item)
                    }}>
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
                                            <Text theme={{ fonts: { light: { fontFamily: 'Oxygen-Light.ttf' }} }} style={{ color: 'grey' }}>Spesialist {item.specialist}</Text>
                                        </View>
                                        <Button onPress={() => {
                                            props.navigation.navigate('ProfileDoctor', item)
                                        }} mode="outlined">{parseInt(item.price) > 0 ? item.price : 'Free'}</Button>
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
            
            <ScrollView style={{ padding: 14 }} refreshControl={ <RefreshControl onRefresh={() => { onRefresh() }} refreshing={refreshing}/>}>
                <Title>Online Doctors</Title>
                <View style={{
                    padding: 1
                }}>{loading ? <Loading/> : renderDoctors()}</View>
            </ScrollView>
        </View>
    )
}

export default Home