import React, { useEffect, useState } from 'react'
import { Text, TextInput, Divider } from 'react-native-paper'
import { View, SafeAreaView } from 'react-native'
import { connect } from 'react-redux'

const Specialist = props => {
    // const [specialist, ]
    useEffect(() => {

    },[])

    const loadSpecialist = () => {

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
                            console.log('text', text)
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
                            console.log('text', text)
                        }}
                        mode="outlined"
                        label="Price"
                        placeholder="Type price"
                    />
                </View>
            </SafeAreaView> 
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

}

export default connect(mapStateToProps, mapDispatchToProps)(Specialist)