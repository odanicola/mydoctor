import React, { useContext } from 'react'
import { View, Button } from 'react-native'
import { useTheme, Text } from 'react-native-paper'
import { AuthContext } from '../../navigation/AuthProvider'

const Identity = () => {
    const { selectType } = useContext(AuthContext);
    const theme = useTheme()
    
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
                    <Text style={{ marginBottom: 10 }}>Please select user as</Text>
                    <View style={{ width: 250, flexDirection: 'column', justifyContent: 'space-between', alignContent: 'space-between' }}>
                    <View style={{ marginBottom: 10 }}>
                        <Button 
                            onPress={() => {
                                selectType('patient')
                            }}
                            title={'patient'} color={theme.colors.primary}
                        />
                    </View>
                    
                    <View style={{ marginBottom: 10 }}>
                        <Button 
                            onPress={() => {
                                selectType('doctor')
                            }}
                            title={'doctor'}
                        />
                    </View>
                    </View>
            </View>
        </View>
    )
}

export default Identity