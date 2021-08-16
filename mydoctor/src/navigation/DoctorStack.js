import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { DoctorHome, Chat, Profile } from '../screen';

const Stack = createStackNavigator()
const DoctorStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="DoctorHome"
                component={DoctorHome}
                options={{
                    headerShown: false,
                    ...TransitionPresets.FadeFromBottomAndroid
                }}
            />
        <Stack.Screen
            name="Chat"
            component={Chat}
            options={{
                headerShown: false,
                ...TransitionPresets.FadeFromBottomAndroid
            }}
        />
        <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
                headerShown: true,
                ...TransitionPresets.FadeFromBottomAndroid
            }}
        />
        </Stack.Navigator>
    )
}

export default DoctorStack