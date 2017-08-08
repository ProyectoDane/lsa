import { StackNavigator } from 'react-navigation';
import {AppRegistry} from 'react-native';

import Splash from './components/launcher/splash';
import Home from './components/launcher/home';
import StartupVideo from './components/launcher/startupVideo';
import Category from './components/categories/category';
import VideoPlayerIOS from './components/categories/videoPlayerIOS';
import VideoPlayerAndroid from './components/categories/videoPlayerAndroid';

const ProyectosSolidarios = StackNavigator({
  Splash: { screen: Splash },
  Home: {screen: Home},
  StartupVideo: {screen: StartupVideo},
  Category: {screen: Category},
  VideoPlayerIOS: {screen: VideoPlayerIOS},
  VideoPlayerAndroid: {screen: VideoPlayerAndroid}
});

AppRegistry.registerComponent('ProyectosSolidarios', () => ProyectosSolidarios);
