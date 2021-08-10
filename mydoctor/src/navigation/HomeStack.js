import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Home, Profile } from '../screen';

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

export default HomeStack