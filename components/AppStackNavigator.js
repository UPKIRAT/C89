import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import RecieverDetailsScreen  from '../screens/RecieverDetailsScreen';
import RateScreen from '../screens/RateScreen'



export const AppStackNavigator = createStackNavigator({
  RateList : {
    screen : RateScreen,
    navigationOptions:{
      headerShown : false
    }
  },
  RecieverDetails : {
    screen : RecieverDetailsScreen,
    navigationOptions:{
      headerShown : false
    }
  }
},
  {
    initialRouteName: 'RateList'
  }
);
