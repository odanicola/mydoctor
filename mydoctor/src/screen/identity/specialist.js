import React, { useEffect, useState, useContext } from 'react'
import { Text, TextInput, Divider, Button } from 'react-native-paper'
import { View, SafeAreaView } from 'react-native'
import { connect, useStore } from 'react-redux'
import { AuthContext } from '../../navigation/AuthProvider'
import * as specialistActions from '../../store/actions/specialistAction'
import { Loading } from '../../component'
import Helper from '../../helper'

const Specialist = props => {
    const { user, setSpecialist } = useContext(AuthContext);
    const [specialistName, setSpecialistName] = useState(null)
    const [price, setPrice] = useState(null)
    const [loading, setLoading] = useState(false)
    const store = useStore()

    useEffect(() => {

    },[])

    const onSubmit = async () => {
        setLoading(true)
        const data = {
            doctor_id: user.id,
            name: specialistName,
            price: price
        }

        await props.onCreateSpecialist(data)
        const status = store.getState().specialist.status 
        const specialist = store.getState().specialist.specialist 
        if (status) {
            await Helper.setSpecialist(specialist)
            setSpecialist(specialist)
        } else {
            setLoading(false)
        }
    }

    if (loading) {
        return <Loading/>
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white'
        }}>
            <SafeAreaView>
                <View style={{
                    paddingHorizontal: 10
                }}>
                    <TextInput
                        style={{
                            marginVertical: 10
                        }}
                        onChangeText={(text) => {
                            setSpecialistName(text)
                        }}
                        mode="outlined"
                        label="Specialist Name"
                        placeholder="Type specialist name"
                    />
                    <Divider />
                    <TextInput
                        style={{
                            marginVertical: 10
                        }}
                        onChangeText={(text) => {
                            setPrice(text)
                        }}
                        mode="outlined"
                        label="Price"
                        placeholder="Type price"
                    />
                    <Divider/>
                    <Button onPress={() => {
                        onSubmit()
                    }} mode="contained" style={{  marginVertical: 10 }}>Save</Button>
                </View>
            </SafeAreaView> 
        </View>
    )
}

const mapStateToProps = state => {
    const { specialist } = state
    return {
        specialist: specialist
    }
}

const mapDispatchToProps = {
    onCreateSpecialist: (data) => specialistActions.onCreateSpecialist(data)
}

export default connect(mapStateToProps, mapDispatchToProps)(Specialist)