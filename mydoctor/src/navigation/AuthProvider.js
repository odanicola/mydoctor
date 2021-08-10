import React, { createContext, useState, useEffect } from 'react';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import CONSTANT from '../config'
import Snackbar from 'react-native-snackbar'
import Helper from '../helper'

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [type, setType] = useState(null);

    GoogleSignin.configure({
        scopes: ['profile','email'],
        webClientId: CONSTANT.WEB_ID,
        offlineAccess: true
    }); 

    useEffect(() => {
       
    }, [user,type])
    
    const setTypeUser = async (type) => {
        console.log('set type', type)
        await Helper.setUserType(type)
        setType(type)
    }

    const setLogout = async () => {
        try {
            await GoogleSignin.signOut()
            await Helper.removeKeys()
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
            }
        }}>
            {children}
        </AuthContext.Provider>
    )
}