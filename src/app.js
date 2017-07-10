import { StackNavigator } from 'react-navigation';
import {AppRegistry} from 'react-native';

import Splash from './components/launcher/splash'
import Home from './components/launcher/home'

const ProyectosSolidarios = StackNavigator({
  Splash: { screen: Splash },
  Home: {screen: Home},
});

AppRegistry.registerComponent('ProyectosSolidarios', () => ProyectosSolidarios);
