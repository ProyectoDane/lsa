import React from 'react';
import {StackNavigator, TabNavigator, TabBarBottom, NavigationActions} from 'react-navigation';
import {AppRegistry} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Splash from './components/launcher/splash';
import Home from './components/tabs/home';
import Search from './components/tabs/search';
import Alphabetical from './components/tabs/alphabetical';
import Information from './components/tabs/information';
import StartupVideo from './components/launcher/startupVideo';
import Category from './components/categories/category';
import VideoPlayer from './components/categories/videoPlayer';
import Colors from './res/colors';

//Splash: { screen: Splash },
//StartupVideo: {screen: StartupVideo},

const HomeTab = StackNavigator({
  Home: {screen: Home},
  Category: {screen: Category},
  VideoPlayer: {screen: VideoPlayer}
});

const SearchTab = StackNavigator({
  Search: {screen: Search},
  VideoPlayer: {screen: VideoPlayer}
});

const AlphabeticalTab =  StackNavigator({
  Alphabetical: {screen: Alphabetical},
  VideoPlayer: {screen: VideoPlayer}
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
    tabBarComponent: props => {
      const {navigation, navigationState} = props;
      const jumpToIndex = index => {
        const tab = navigationState.routes[index];
        if (navigationState.index !== index) {
          navigation.dispatch(
            {
              type: "Navigation/NAVIGATE",
              routeName: tab.routeName
            }
          );
        } else {
          if (tab.index > 0) {
            navigation.goBack(tab.routes[1].key);
          } else {
            const resetAction = NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: tab.routes[0].routeName})
              ]
            });
            navigation.dispatch(resetAction);
          }
        }
      };
      return (<TabBarBottom {...props} jumpToIndex={jumpToIndex} />);
    },
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
