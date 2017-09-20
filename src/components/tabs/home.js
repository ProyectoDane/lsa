import React, { Component } from 'react';
import Categories from './../categories/categories';

import Colors from './../../res/colors';
import I18n from './../../res/i18n/i18n';

export default class Home extends Component {

  static navigationOptions = ({navigation, screenProps}) => ({
    title: I18n.t('home_tab_title'),
    headerTintColor: Colors.THEME_SECONDARY,
    headerBackTitle: null,
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
