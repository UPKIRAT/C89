import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator'
import CustomSideBarMenu  from './CustomSideBarMenu';
import NotificationScreen from '../screens/NotificationScreen'
import RatesGivenToMeScreen from '../screens/RatesGivenToMeScreen'

import {Icon} from 'react-native-elements';
import MyRatesScreen from '../screens/MyRatesScreen';

export const AppDrawerNavigator = createDrawerNavigator({
  Home : {
    screen : AppTabNavigator,
    navigationOptions:{
      drawerIcon : <Icon name="home" type ="fontawesome5" />
    }
  },
  //   },
  // MyDonations : {
  //   screen : MyDonationScreen,
  //   navigationOptions:{
  //     drawerIcon : <Icon name="gift" type ="font-awesome" />,
  //     drawerLabel : "My Donations"
  //   }
  // },
  // Notification : {
  //   screen : NotificationScreen,
  //   navigationOptions:{
  //     drawerIcon : <Icon name="bell" type ="font-awesome" />,
  //     drawerLabel : "Notifications"
  //   }
  // },
  MyRatesScreen : {
    screen : MyRatesScreen,
    navigationOptions:{
      drawerIcon : <Icon name="gift" type ="font-awesome" />,
      drawerLabel : "Rates Responded to"
    }
  },
  RatesGivenToMeScreen : {
    screen : RatesGivenToMeScreen,
    navigationOptions:{
      drawerIcon : <Icon name="gift" type ="font-awesome" />,
      drawerLabel : "Rates responses"
    }
  }
  // },
  // MyReceivedBooks :{
  //   screen: MyReceivedBooksScreen,
  //   navigationOptions:{
  //     drawerIcon : <Icon name="gift" type ="font-awesome" />,
  //     drawerLabel : "My Received Books"
  //   }
  // },
  // Setting : {
  //   screen : SettingScreen,
  //   navigationOptions:{
  //     drawerIcon : <Icon name="settings" type ="fontawesome5" />,
  //     drawerLabel : "Settings"
  //   }
  },
  {
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName : 'Home'
  })
