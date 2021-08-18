import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthProvider';
import HomeStack from './HomeStack'
import AuthStack from './AuthStack'
import IdentityStack from './IdentityStack'
import SpecialistStack from './SpecialistStack'
import DoctorStack from './DoctorStack'
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Helper from '../helper'
import { Loading } from '../component'
import { useDispatch, useStore } from 'react-redux';
import * as SpecialistActions from '../store/actions/specialistAction'
import SplashScreen from 'react-native-splash-screen'

export default function Routes() {
    const { user, setUser, type, setType, specialist, setSpecialist } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const store = useStore()

    useEffect(() => {
        SplashScreen.hide()
        loginCheck()
        console.log('type', type)
    },[])

    const identityCheck = async () => {
        setLoading(true)
        const getType  = await Helper.getUserType()
        setType(getType)
        console.log('get type', getType)
        if (getType == 'doctor') {
            specialistCheck()
        } 

        setLoading(false)
    }

    const specialistCheck = async () => {
        setLoading(true)
        console.log('check specialist')
        const getSpecialist  = await Helper.getSpecialist()
        if (getSpecialist) {
            setSpecialist(getSpecialist)
        } else {
            const getUser = await Helper.getUserData()
            await dispatch(SpecialistActions.onGetSpecialist(getUser.id))
            const specialiststore =  store.getState().specialist.specialist
            console.log('getuser s', getUser, specialiststore)
            await Helper.setSpecialist(specialiststore)
            setSpecialist(specialiststore)
        }
        
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
            <DoctorStack /> :
            <SpecialistStack /> : 
            <HomeStack />:
            <IdentityStack /> :
            <AuthStack />
        }
        </NavigationContainer>
    )
}