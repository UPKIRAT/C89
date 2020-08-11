import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen'
import RateScreen from './screens/RateScreen'
import * as Font from 'expo-font'
import { AppLoading } from 'expo';
import { createAppContainer ,createSwitchNavigator } from 'react-navigation';
import { AppDrawerNavigator } from './components/AppDrawerNavigator'
import { AppTabNavigator } from './components/AppTabNavigator'
import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }



const getFonts = () => Font.loadAsync({
  'pacifico-regular': require('./assets/fonts/Pacifico-Regular.ttf'),
  'FredokaOne-Regular': require('./assets/fonts/FredokaOne-Regular.ttf')
})

export default function App() {
  const [fontsLoaded, steFontsLoaded] = useState(false)

  if (fontsLoaded){
    return (
      <AppContainer/>
    );
  } else {
    return (
      <AppLoading
      startAsync = {getFonts}
      onFinish = {()=> steFontsLoaded(true)}
      />
    );

  }
  
}

const switchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen: WelcomeScreen},
  Drawer:{screen: AppDrawerNavigator},
  BottomTab: {screen: AppTabNavigator},
})

const AppContainer = createAppContainer(switchNavigator)
