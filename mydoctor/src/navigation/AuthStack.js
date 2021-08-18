import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Auth } from '../screen';

const Stack = createStackNavigator()
const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={Auth}
                options={{
                    headerShown: false,
                    ...TransitionPresets.FadeFromBottomAndroid
                }}
            />
        </Stack.Navigator>
    )
}

export default AuthStack