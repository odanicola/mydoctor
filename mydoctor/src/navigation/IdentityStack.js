import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Identity } from '../screen';

const Stack = createStackNavigator()
const IdentityStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Identity"
                component={Identity}
                options={{
                    headerShown: false,
                    ...TransitionPresets.FadeFromBottomAndroid
                }}
            />
        </Stack.Navigator>
    )
}

export default IdentityStack