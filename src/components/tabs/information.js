import React, { Component } from 'react';
import { Text } from 'react-native';

import Colors from './../../res/colors';

export default class Information extends Component {

  static navigationOptions = ({navigation, screenProps}) => ({
    headerTintColor: Colors.THEME_SECONDARY,
    headerStyle: {
      backgroundColor: Colors.THEME_PRIMARY,
      elevation: 0
    }
  });

  render() {
    return (
      <Text>Information</Text>
    );
  }

}
