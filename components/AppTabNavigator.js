import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AppStackNavigator } from './AppStackNavigator'
import CustomRateScreen from '../screens/CustomRateScreen';


export const AppTabNavigator = createBottomTabNavigator({
  RateScreen : {
    screen: AppStackNavigator,
    // navigationOptions :{
    //   tabBarIcon : <Image source={require("../assets/request-list.png")} style={{width:20, height:20}}/>,
    //   tabBarLabel : "Donate Books",
    // }
  },
  RequestRate: {
    screen: CustomRateScreen,
    // navigationOptions :{
    //   tabBarIcon : <Image source={require("../assets/request-book.png")} style={{width:20, height:20}}/>,
    //   tabBarLabel : "Book Request",
    // }
  }
});
