import React, { createContext, useState, useEffect } from 'react';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import CONSTANT from '../config'
import Snackbar from 'react-native-snackbar'
import Helper from '../helper'
import * as UserActions from '../store/actions/userAction'
import * as SpecialistActions from '../store/actions/specialistAction'
import { useDispatch, useStore } from 'react-redux'

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [type, setType] = useState(null);
    const [specialist, setSpecialist] = useState(null);
    const dispatch = useDispatch()
    const store = useStore()

    GoogleSignin.configure({
        scopes: ['profile','email'],
        webClientId: CONSTANT.WEB_ID,
        offlineAccess: true
    }); 

    useEffect(() => {
       
    }, [user,type,specialist])

    const setTypeUser = async (type) => {
        console.log('set type', type)
        const getUser = await Helper.getUserData()
        const saveUser = {
            name: getUser.name,
            photo: getUser.photo,
            email: getUser.email,
            online: "true",
            type: type
        }
        await dispatch(UserActions.onCreateUser(saveUser))
        const userServer = store.getState().user.user 
        console.log('userserver', userServer)
        
        if (userServer.id != undefined) {
            getUser.id = userServer.id 
            console.log('user update', getUser)
            setUser(getUser)
            await Helper.storeUserData(getUser)
            await Helper.setUserType(type)
            setType(type)

            if (type == 'doctor') {
                await dispatch(SpecialistActions.onGetSpecialist(getUser.id))
                const specialistServer =  store.getState().specialist.specialist 
                setSpecialist(specialistServer)
            }
        } else {
            showSnackBar('Failed to save user to server')
            await setLogout()
        }
    }

    const setLogout = async () => {
        try {
            await dispatch(UserActions.onUserDisconnect())
            await GoogleSignin.signOut()
            await Helper.removeKeys()
            
            setSpecialist(null)
            const getType = await Helper.getUserType()
            setType(getType)
            const getUser = await Helper.getUserData()
            setUser(getUser)
        } catch (error) {
            console.log('err', error)
        }
    }

    const signInGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices()
            const userInfo = await GoogleSignin.signIn()
            console.log('userInfo', userInfo)
            setUser(userInfo.user)
            Helper.storeUserData(userInfo.user)
        } catch (error) {
            console.log(error)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                showSnackBar("Login Google dibatalkan...")
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
                showSnackBar("Login sedang proses...")
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                showSnackBar("Google Play service tidak ditemukan...")
            } else {
                // some other error happened
                showSnackBar("Terjadi kesalahan saat koneksi ke Google")
            }
        }
    }

    const showSnackBar = (message) => {
        Snackbar.show({
            text: message,
            duration: Snackbar.LENGTH_SHORT,
        });
    }

    return (
        <AuthContext.Provider value={{
            user, setUser, login: async () => {
                await signInGoogle()   
            }, selectType: async (type) => {
                await setTypeUser(type)
            }, type, setType, logout: async () => {
                await setLogout()
            },
            specialist, setSpecialist
        }}>
            {children}
        </AuthContext.Provider>
    )
}