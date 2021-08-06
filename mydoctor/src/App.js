/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useEffect, useState } from 'react';
 import { Provider } from 'react-redux'
 import store from './store/storeconfig'
 import Routes from './routes'
 
 const App = () => (
     <Provider store={store}>
         <Routes/>
     </Provider>
 )

 export default App
 