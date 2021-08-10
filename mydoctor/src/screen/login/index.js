import React, { useState, useContext, useEffect } from 'react'
import { View } from 'react-native'
import { Text, Button, useTheme } from 'react-native-paper'
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { AuthContext } from '../../navigation/AuthProvider'
import CONSTANT from '../../config'
import { connect } from 'react-redux'

const Login = props => {
    const { login, user } = useContext(AuthContext);
    const [isSigninInProgress, setIsSigninInProgress] = useState(false)
    const { colors } = useTheme();

    useEffect(() => {
        isConnected()
    })

    const isConnected = async () => {
        console.log('connected to socket', props.socket.connected)
    }

    const _signIn = async () => {
        setIsSigninInProgress(true)
        await login()
        setIsSigninInProgress(false)
    }

    return (
        <View style={{
            alignItems: 'center', 
            justifyContent: 'center',
            flex: 1,
            backgroundColor: colors.primary,
        }}>
            <View style={{
                alignItems:'flex-start',
                justifyContent: 'flex-start'
            }}>
                <Text style={{ color: 'white', fontSize: 18 }}>Find</Text>
                <Text style={{ color: 'white', fontSize: 18 }}>Your Nearest</Text>
                <Text style={{ color: 'white', fontSize: 42 }}>Doctors.</Text>
            </View>
            <View style={{
                alignItems: 'center',
                position: 'absolute',
                bottom: 20,
            }}>
                <GoogleSigninButton
                    style={{
                        marginBottom: 20
                    }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Light}
                    onPress={_signIn}
                    disabled={isSigninInProgress} />
                <Text style={{ color: 'white' }}>{CONSTANT.APP_NAME}</Text>
                <Text style={{ color: 'white' }}>version {CONSTANT.VERSION}</Text>
            </View>
        </View>
    )
}

const mapStateToProps = state => {
    const { socket } = state
    return {
        socket: socket
    }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Login)