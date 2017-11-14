import React from 'react';
import {
  AppRegistry
} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation';
import { Provider } from 'react-redux';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Splash from './components/launcher/splash';
import Home from './components/tabs/home';
import Search from './components/tabs/search';
import Alphabetical from './components/tabs/alphabetical';
import Information from './components/tabs/information';
import StartupVideo from './components/launcher/startupVideo';
import Category from './components/categories/category';
import VideoPlayer from './components/categories/videoPlayer';
import Colors from './res/colors';
import configureStore from './configureStore';
import TabBarComponent from './tabBarComponent';

const store = configureStore();

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
          <MaterialCommunityIcons
            name={'home-outline'}
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
          <MaterialCommunityIcons
            name={'alphabetical'}
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
          <MaterialCommunityIcons
            name={'magnify'}
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
          <MaterialCommunityIcons
            name={'information-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        )
      }
    }
  },
  {
    tabBarComponent: props => <TabBarComponent {...props} />,
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

const App = () => (
  <Provider store={store}>
    <ProyectosSolidarios />
  </Provider>
);

AppRegistry.registerComponent('ProyectosSolidarios', () => App);
