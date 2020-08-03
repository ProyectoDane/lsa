import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

import React, {PureComponent} from 'react';
import {Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import Splash from './components/launcher/splash';
// import StartupVideo from './components/launcher/startupVideo';
import Category from './components/Category';
import {
  VideoPlayer,
  NavigationOptions as VideoPlayerNavOpts,
} from './components/VideoPlayer';
import Colors from './res/colors';
import configureStore from './configureStore';

import {
  Alphabetical,
  NavigationOptions as AlphaNavOpts,
} from './components/Tabs/Alphabetical';
import {
  Search,
  NavigationOptions as SearchNavOpts,
} from './components/Tabs/Search/';
import {Home, NavigationOptions as HomeNavOpts} from './components/Tabs/Home';
import {
  Information,
  NavigationOptions as InfoNavOpts,
} from './components/Tabs/Information';
import SplashScreen from './components/Splash/main-splash';
import DaneSplashScreen from './components/Splash/dane-splash';
import VideoSplash from './components/Splash/video-splash';
import Register from './components/Splash/register';
import {
  Download,
  NavigationOptions as DownloadNavOpts,
} from './components/Tabs/Download';

// Analytics
import analytics from '@react-native-firebase/analytics';
const Analytics = analytics();

const store = configureStore();

// Splash: { screen: Splash },
// StartupVideo: {screen: StartupVideo},

const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} options={HomeNavOpts} />
      <HomeStack.Screen
        name="Category"
        component={Category}
        options={Category.navigationOptions}
      />
      <HomeStack.Screen
        name="VideoPlayer"
        component={VideoPlayer}
        options={VideoPlayerNavOpts}
      />
    </HomeStack.Navigator>
  );
}

const SearchStack = createStackNavigator();
function SearchStackScreen() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="Search"
        component={Search}
        options={SearchNavOpts}
      />
      <SearchStack.Screen
        name="VideoPlayer"
        component={VideoPlayer}
        options={VideoPlayerNavOpts}
      />
    </SearchStack.Navigator>
  );
}

const AlphabeticalStack = createStackNavigator();
function AlphabeticalStackScreen() {
  return (
    <AlphabeticalStack.Navigator>
      <AlphabeticalStack.Screen
        name="Alphabetical"
        component={Alphabetical}
        options={AlphaNavOpts}
      />
      <AlphabeticalStack.Screen
        name="VideoPlayer"
        component={VideoPlayer}
        options={VideoPlayerNavOpts}
      />
    </AlphabeticalStack.Navigator>
  );
}

const InformationStack = createStackNavigator();
function InformationStackScreen() {
  return (
    <InformationStack.Navigator>
      <InformationStack.Screen
        name="Information"
        component={Information}
        options={InfoNavOpts}
      />
    </InformationStack.Navigator>
  );
}

const DownloadStack = createStackNavigator();
function DownloadStackScreen() {
  return (
    <DownloadStack.Navigator>
      <DownloadStack.Screen
        name="Download"
        component={Download}
        options={DownloadNavOpts}
      />
    </DownloadStack.Navigator>
  );
}

const getScreenOptions = (label, iconName) => ({
  tabBarLabel: label,
  tabBarIcon: ({color}) =>
    label === 'Alphabetical' ? (
      // eslint-disable-next-line react-native/no-inline-styles
      <Text style={{fontWeight: 'bold', color: color}}>ABC</Text>
    ) : (
      <MaterialCommunityIcons
        name={iconName}
        size={26}
        style={{color: color}}
      />
    ),
});

const getTabNavigatorTabBarOptions = () => ({
  showLabel: false,
  activeTintColor: Colors.TAB_BAR_ACTIVE_ICON,
  inactiveTintColor: Colors.THEME_SECONDARY,
  activeBackgroundColor: Colors.THEME_PRIMARY,
  style: {backgroundColor: Colors.THEME_PRIMARY},
  indicatorStyle: {backgroundColor: 'transparent'},
});

const ProyectosSolidariosTab = createBottomTabNavigator();
function ProyectosSolidariosTabScreen() {
  return (
    <ProyectosSolidariosTab.Navigator
      backBehavior="none"
      tabBarOptions={getTabNavigatorTabBarOptions()}>
      <ProyectosSolidariosTab.Screen
        name="Home"
        component={HomeStackScreen}
        options={getScreenOptions('Home', 'home-outline')}
      />
      <ProyectosSolidariosTab.Screen
        name="Download"
        component={DownloadStackScreen}
        options={getScreenOptions('Download', 'download')}
      />
      <ProyectosSolidariosTab.Screen
        name="Alphabetical"
        component={AlphabeticalStackScreen}
        options={getScreenOptions('Alphabetical', 'alphabetical')}
      />
      <ProyectosSolidariosTab.Screen
        name="Search"
        component={SearchStackScreen}
        options={getScreenOptions('Search', 'magnify')}
      />
      <ProyectosSolidariosTab.Screen
        name="Information"
        component={InformationStackScreen}
        options={getScreenOptions('Information', 'information-outline')}
      />
    </ProyectosSolidariosTab.Navigator>
  );
}

export class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      timePassed: false,
      secondTimePassed: false,
      viewedVideo: false,
      registered: false,
    };
  }

  componentDidMount = () => {
    this._start();
    Analytics.logEvent('app_started');
  };

  _start = async () => {
    const hasViewedVideo = await AsyncStorage.getItem('hasViewedVideo');
    hasViewedVideo === 'true'
      ? this.setState({viewedVideo: true})
      : this.setState({viewedVideo: false});
    const hasRegistred = await AsyncStorage.getItem('hasRegistred');
    hasRegistred === 'true'
      ? this.setState({registered: true})
      : this.setState({registered: false});

    setTimeout(() => {
      this.setTimePassed();
    }, 1500);
  };

  setTimePassed() {
    this.setState({timePassed: true});
    setTimeout(() => {
      this.setSecondTimePassed();
    }, 5000);
  }

  setSecondTimePassed() {
    this.setState({secondTimePassed: true});
  }

  _endVideo = async () => {
    await AsyncStorage.setItem('hasViewedVideo', 'true');
    this.setState({viewedVideo: true});
  };

  _registered = async () => {
    Analytics.logEvent('registered');
    await AsyncStorage.setItem('hasRegistred', 'true');
    this.setState({registered: true});
  };

  _notRegistered = async () => {
    Analytics.logEvent('skip_register');
    await AsyncStorage.setItem('hasRegistred', 'false');
    this.setState({registered: true});
  };

  render() {
    if (!this.state.timePassed) {
      return <SplashScreen />;
    } else if (!this.state.secondTimePassed) {
      return <DaneSplashScreen />;
    } else if (!this.state.viewedVideo) {
      return <VideoSplash onEnd={this._endVideo} />;
    } else if (!this.state.registered) {
      return (
        <Register
          onRegister={this._registered}
          onNotRegistered={this._notRegistered}
        />
      );
    } else if (this.state.registered) {
      return (
        <Provider store={store}>
          <NavigationContainer>
            <ProyectosSolidariosTabScreen />
          </NavigationContainer>
        </Provider>
      );
    }
  }
}

export default App;
