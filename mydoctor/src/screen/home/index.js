import React from 'react'
import { View, Text, Button, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

const Home = ({navigation}) => {
    const [text, onChangeText] = React.useState("");
    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white'
          }}>
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1
                }}
                >
                
                <Text style={{ marginBottom: 10 }}>Please insert room name</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                />
                <Text style={{ marginBottom: 10 }}>Please select login as</Text>
                <View style={{ width: 250, flexDirection: 'column', justifyContent: 'space-between', alignContent: 'space-between' }}>
                <View style={{ marginBottom: 10 }}>
                    <Button 
                    onPress={() => { navigation.navigate('Chat', {name: "patient", id: "202101010001", room: text}) }}
                    title={'patient'}
                    />
                </View>
                
                <View style={{ marginBottom: 10 }}>
                    <Button 
                    onPress={() => { navigation.navigate('Chat', {name: "doctor", id: "202101010002", room: text}) }}
                    title={'doctor'}
                    />
                </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      color: 'black',
      width: 250
    },
});
export default connect(null,{})(Home)