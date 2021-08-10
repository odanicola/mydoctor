import AsyncStorage from '@react-native-async-storage/async-storage';
import CONSTANT from '../config'

const storeUserData = async (obj) => {
    try{
        await AsyncStorage.setItem(CONSTANT.STORAGE_KEYS.USER, JSON.stringify(obj))
    } catch (e) {
        console.log('error', e)
    }
}

const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(CONSTANT.STORAGE_KEYS.USER)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
      console.log(e)
    }
}

const setUserType = async (type) => {
    try {
        console.log('async type', type)
        await AsyncStorage.setItem(CONSTANT.STORAGE_KEYS.TYPE, type)
    } catch (error) {
        console.log(error)
    }
}

const getUserType = async () => {
    try {
       const type = await AsyncStorage.getItem(CONSTANT.STORAGE_KEYS.TYPE) 
       return type
    } catch (error) {
        console.log(error)
    }
}

const removeKeys = async () => {
    try {
        const keys = [
            CONSTANT.STORAGE_KEYS.USER,
            CONSTANT.STORAGE_KEYS.TYPE
        ]

        await AsyncStorage.multiRemove(keys)
    } catch (error) {
        console.log('error', error)
    }
}

export default { storeUserData, getUserData, getUserType, setUserType, removeKeys }