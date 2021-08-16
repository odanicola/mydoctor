import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Home, Profile, ProfileDoctor, Chat } from '../screen';

const Stack = createStackNavigator()
const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
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
            <Stack.Screen
                name="ProfileDoctor"
                component={ProfileDoctor}
                options={{
                    headerShown: true,
                    headerTitle: "Doctor Profile",
                    ...TransitionPresets.FadeFromBottomAndroid
                }}
            />
        </Stack.Navigator>
    )
}

export default HomeStack