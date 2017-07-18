import { StackNavigator } from 'react-navigation';
import {AppRegistry} from 'react-native';

import Splash from './components/launcher/splash';
import Home from './components/launcher/home';
import StartupVideo from './components/launcher/startupVideo';

const ProyectosSolidarios = StackNavigator({
  Splash: { screen: Splash },
  Home: {screen: Home},
  StartupVideo: {screen: StartupVideo}
});

AppRegistry.registerComponent('ProyectosSolidarios', () => ProyectosSolidarios);
