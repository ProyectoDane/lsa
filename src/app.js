import React from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation';
import {AppRegistry} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Splash from './components/launcher/splash';
import Home from './components/tabs/home';
import Search from './components/tabs/search';
import Alphabetical from './components/tabs/alphabetical';
import Information from './components/tabs/information';
import StartupVideo from './components/launcher/startupVideo';
import Category from './components/categories/category';
import VideoPlayerIOS from './components/categories/videoPlayerIOS';
import VideoPlayerAndroid from './components/categories/videoPlayerAndroid';
import Colors from './res/colors';

//Splash: { screen: Splash },
//StartupVideo: {screen: StartupVideo},

const HomeTab = StackNavigator({
  Home: {screen: Home},
  Category: {screen: Category},
  VideoPlayerIOS: {screen: VideoPlayerIOS},
  VideoPlayerAndroid: {screen: VideoPlayerAndroid}
});

const SearchTab = StackNavigator({
  Search: {screen: Search},
  VideoPlayerIOS: {screen: VideoPlayerIOS},
  VideoPlayerAndroid: {screen: VideoPlayerAndroid}
});

const AlphabeticalTab =  StackNavigator({
  Alphabetical: {screen: Alphabetical},
  VideoPlayerIOS: {screen: VideoPlayerIOS},
  VideoPlayerAndroid: {screen: VideoPlayerAndroid}
});

const InformationTab =  StackNavigator({
  Information: {screen: Information}
});

const ProyectosSolidarios = TabNavigator(
  {
    HomeTab: {
      screen: HomeTab,
      path: '/',
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-home' : 'ios-home-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        )
      }
    },
    SearchTab: {
      screen: SearchTab,
      path: '/search',
      navigationOptions: {
        tabBarLabel: 'Search',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-search' : 'ios-search-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        )
      }
    },
    AlphabeticalTab: {
      screen: AlphabeticalTab,
      path: '/alphabetical',
      navigationOptions: {
        tabBarLabel: 'Alphabetical',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-list' : 'ios-list-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        )
      }
    },
    InformationTab: {
      screen: InformationTab,
      path: '/information',
      style: {backgroundColor: 'red'},
      navigationOptions: {
        tabBarLabel: 'Information',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-information-circle' : 'ios-information-circle-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        )
      }
    }
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    backBehavior: 'none',
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: Colors.TAB_BAR_ACTIVE_ICON,
      inactiveTintColor: Colors.THEME_SECONDARY,
      style: {backgroundColor: Colors.THEME_PRIMARY},
      activeBackgroundColor: Colors.THEME_PRIMARY,
      indicatorStyle: {backgroundColor: 'transparent'}
    }
  }
);

AppRegistry.registerComponent('ProyectosSolidarios', () => ProyectosSolidarios);
