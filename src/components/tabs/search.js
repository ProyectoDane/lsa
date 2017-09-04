import React, { Component } from 'react';
import { Text } from 'react-native';

import SearchHeader from './searchHeader';
import Colors from './../../res/colors';

export default class Search extends Component {

  static navigationOptions = ({navigation, screenProps}) => ({
    headerTintColor: Colors.THEME_SECONDARY,
    headerRight: (<SearchHeader />),
    headerStyle: {
      backgroundColor: Colors.THEME_PRIMARY,
      elevation: 0
    }
  });

  render() {
    return (
      <Text>Search</Text>
    );
  }

}
