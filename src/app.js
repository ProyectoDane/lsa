import React, { PureComponent } from 'react';
import { AppRegistry, AsyncStorage, Text } from 'react-native';
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
import Register from './components/Splash/register';
import Download from './components/Tabs/Download';

// Analytics
import firebase from 'react-native-firebase';

const store = configureStore();
const Analytics = firebase.analytics();

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

const DownloadTab = StackNavigator({
  Download: { screen: Download }
})

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
    DownloadTab: {
      screen: DownloadTab,
      path: '/download',
      navigationOptions: {
        tabBarLabel: 'Download',
        tabBarIcon: ({tintColor}) => (
          <MaterialCommunityIcons name="download" size={26} style={{color: tintColor}} />
        )
      }
    },
    AlphabeticalTab: {
      screen: AlphabeticalTab,
      path: '/alphabetical',
      navigationOptions: {
        tabBarLabel: 'Alphabetical',
        tabBarIcon: ({ tintColor }) => (
          <Text style={{ fontWeight: 'bold', color: tintColor }}>ABC</Text>
          // <MaterialCommunityIcons name="alphabetical" size={26} style={{ color: tintColor }} />
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
      viewedVideo: false,
      registered: false
    }
  }

  componentDidMount = () => {
    this._start();
    Analytics.logEvent("app_started");
  }

  _start = async () => {
    const hasViewedVideo = await AsyncStorage.getItem('hasViewedVideo');
    hasViewedVideo === 'true' ? this.setState({ viewedVideo: true }) : this.setState({ viewedVideo: false });
    const hasRegistred = await AsyncStorage.getItem('hasRegistred');
    hasRegistred === 'true' ? this.setState({ registered: true }) : this.setState({ registered: false });
    
    setTimeout(() => {
      this.setTimePassed();
    }, 1500)
  };

  setTimePassed() {
    this.setState({ timePassed: true });
    setTimeout(() => {
      this.setSecondTimePassed()
    }, 5000); 
  }

  setSecondTimePassed() {
    this.setState({ secondTimePassed: true });
  }

  _endVideo = async () => {
    await AsyncStorage.setItem('hasViewedVideo', 'true');
    this.setState({ viewedVideo: true });
  }
  
  _registered = async() => {
    Analytics.logEvent("registered");
    await AsyncStorage.setItem('hasRegistred', 'true');
    this.setState({ registered: true });
  }
  
  _notRegistered = async() => {
    Analytics.logEvent("skip_register");
    await AsyncStorage.setItem('hasRegistred', 'false');
    this.setState({registered: true});
  }

  render() {
    if (!this.state.timePassed) {
      return <SplashScreen />
    } else if (!this.state.secondTimePassed) {
      return <DaneSplashScreen />
    } else if (!this.state.viewedVideo) {
      return <VideoSplash onEnd={this._endVideo} />
    } else if (!this.state.registered) {
      return <Register onRegister={this._registered} onNotRegistered={this._notRegistered}/>
    } else if (this.state.registered) {
      return <Provider store={store}>
        <ProyectosSolidarios />
      </Provider>
    }
  }

}

export default App;

AppRegistry.registerComponent('ProyectosSolidarios', () => App);
