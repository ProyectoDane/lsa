import React, { PureComponent } from 'react';
import { AppRegistry, AsyncStorage } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import Splash from './components/launcher/splash';
// import StartupVideo from './components/launcher/startupVideo';
import Category from './components/Category';
import VideoPlayer from './components/VideoPlayer';
import Colors from './res/colors';
import configureStore from './configureStore';
import TabBarComponent from './components/TabBarComponent/';
import Alphabetical from './components/Tabs/Alphabetical';
import Search from './components/Tabs/Search/';
import Home from './components/Tabs/Home';
import Information from './components/Tabs/Information';
import SplashScreen from './components/Splash/main-splash';
import DaneSplashScreen from './components/Splash/dane-splash';
import VideoSplash from './components/Splash/video-splash';

const store = configureStore();

// Splash: { screen: Splash },
// StartupVideo: {screen: StartupVideo},

const HomeTab = StackNavigator({
  Home: { screen: Home },
  Category: { screen: Category },
  VideoPlayer: { screen: VideoPlayer },
});

const SearchTab = StackNavigator({
  Search: { screen: Search },
  VideoPlayer: { screen: VideoPlayer },
});

const AlphabeticalTab = StackNavigator({
  Alphabetical: { screen: Alphabetical },
  VideoPlayer: { screen: VideoPlayer },
});

const InformationTab = StackNavigator({
  Information: { screen: Information },
  VideoPlayer: { screen: VideoPlayer }
});

const ProyectosSolidarios = TabNavigator(
  {
    HomeTab: {
      screen: HomeTab,
      path: '/',
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons name="home-outline" size={26} style={{ color: tintColor }} />
        ),
      },
    },
    AlphabeticalTab: {
      screen: AlphabeticalTab,
      path: '/alphabetical',
      navigationOptions: {
        tabBarLabel: 'Alphabetical',
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons name="alphabetical" size={26} style={{ color: tintColor }} />
        ),
      },
    },
    SearchTab: {
      screen: SearchTab,
      path: '/search',
      navigationOptions: {
        tabBarLabel: 'Search',
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons name="magnify" size={26} style={{ color: tintColor }} />
        ),
      },
    },
    InformationTab: {
      screen: InformationTab,
      path: '/information',
      navigationOptions: {
        tabBarLabel: 'Information',
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="information-outline"
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
  },
  {
    tabBarComponent: props => <TabBarComponent {...props} />,
    tabBarPosition: 'bottom',
    navigationOptions: () => ({
      tabBarOnPress: ({ scene, jumpToIndex }) => jumpToIndex(scene.index),
    }),
    animationEnabled: false,
    swipeEnabled: false,
    backBehavior: 'none',
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: Colors.TAB_BAR_ACTIVE_ICON,
      inactiveTintColor: Colors.THEME_SECONDARY,
      style: { backgroundColor: Colors.THEME_PRIMARY },
      activeBackgroundColor: Colors.THEME_PRIMARY,
      indicatorStyle: { backgroundColor: 'transparent' },
    },
  }
);

export class App extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      timePassed: false,
      secondTimePassed: false,
      viewedVideo: false
    }
  }

  componentDidMount = async() =>   {
    const hasViewedVideo = await AsyncStorage.getItem('hasViewedVideo');
    hasViewedVideo === 'true' ? this.setState({viewedVideo: true}) : this.setState({viewedVideo: false})
    setTimeout(() => {
      this.setTimePassed();
    }, 1500)
  }

  setTimePassed() {
    this.setState({timePassed: true});
    setTimeout(() => {
      this.setSecondTimePassed()
    }, 2000)
  }

  setSecondTimePassed() {
    this.setState({secondTimePassed: true});
  }

  _endVideo = async() => {
    await AsyncStorage.setItem('hasViewedVideo', 'true');
    this.setState({viewedVideo: true});
  }

  render() {
    if (!this.state.timePassed) {
      return <SplashScreen />
    } else if (!this.state.secondTimePassed) {
      return <DaneSplashScreen />
    } else if (!this.state.viewedVideo) {
      return <VideoSplash onEnd={this._endVideo}/>
    }
      return <Provider store={store}>
        <ProyectosSolidarios />
      </Provider>
    
  }

}

export default App;

AppRegistry.registerComponent('ProyectosSolidarios', () => App);
