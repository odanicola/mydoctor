import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthProvider';
import HomeStack from './HomeStack'
import AuthStack from './AuthStack'
import IdentityStack from './IdentityStack'
import SpecialistStack from './SpecialistStack'
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Helper from '../helper'
import { Loading } from '../component'

export default function Routes() {
    const { user, setUser, type, setType, specialist, setSpecialist } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        loginCheck()
        console.log('type', type)
    },[])

    const identityCheck = async () => {
        setLoading(true)
        let getType  = await Helper.getUserType()
        setType(getType)
        setLoading(false)
    }

    const loginCheck = async () => {
        setLoading(true)
        const isLogin = await GoogleSignin.isSignedIn()
        console.log('islogin', isLogin)
        if (isLogin) {
            let getUser = await Helper.getUserData()
            console.log('getuser', getUser)
            setUser(getUser)
            identityCheck()
        } else {
            await Helper.removeKeys()
            let getType  = await Helper.getUserType()
            setType(getType)
            let getUser = await Helper.getUserData()
            console.log('remove', getUser)
            setUser(getUser)
        }

        setLoading(false)
    }

    if (loading) {
        return <Loading/>
    }

    console.log('type', type)
    console.log('specialist', specialist)

    return (
        <NavigationContainer>
            <StatusBar backgroundColor={'#383DC4'}/>
        {
            user && user.id ?
            type ? 
            type == 'doctor' ?
            specialist ? 
            <HomeStack /> :
            <SpecialistStack /> : 
            <HomeStack />:
            <IdentityStack /> :
            <AuthStack />
        }
        </NavigationContainer>
    )
}