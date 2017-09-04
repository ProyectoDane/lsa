import React, { Component } from 'react';
import Categories from './../categories/categories';

import Colors from './../../res/colors';

export default class Home extends Component {

  static navigationOptions = ({navigation, screenProps}) => ({
    headerTintColor: Colors.THEME_SECONDARY,
    headerStyle: {
      backgroundColor: Colors.THEME_PRIMARY,
      elevation: 0
    }
  });

  render() {
    return (
      <Categories
        navigation={this.props.navigation}
      />
    );
  }

}
