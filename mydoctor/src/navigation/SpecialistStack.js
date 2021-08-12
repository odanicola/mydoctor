import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Specialist } from '../screen';

const Stack = createStackNavigator()
const SpecialistStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Specialist"
                component={Specialist}
                options={{
                    headerShown: true,
                    ...TransitionPresets.FadeFromBottomAndroid
                }}
            />
        </Stack.Navigator>
    )
}

export default SpecialistStack