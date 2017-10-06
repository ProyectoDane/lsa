import React, { Component } from 'react';
import { Text } from 'react-native';

import Colors from './../../res/colors';

export default class Alphabetical extends Component {

  static navigationOptions = ({navigation, screenProps}) => ({
    headerTintColor: Colors.THEME_SECONDARY,
    headerStyle: {
      backgroundColor: Colors.THEME_PRIMARY,
      elevation: 0,
      borderBottomWidth: 1,
      borderBottomColor: Colors.TAB_BAR_ACTIVE_ICON
    }
  });

  render() {
    return (
      <Text>Alphabetical</Text>
    );
  }

}
