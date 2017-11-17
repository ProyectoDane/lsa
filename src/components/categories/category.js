import React, { Component } from 'react';
import Videos from './videos';
import Colors from './../../res/colors';

const categoryVideosBackground = require('./../../res/background/fondo-amarillo.jpg');

export default class Category extends Component {

  static navigationOptions = ({navigation, screenProps}) => ({
    title: navigation.state.params.category.name_es,
    headerTintColor: Colors.THEME_SECONDARY,
    headerBackTitle: null,
    headerTitleStyle: {
      fontFamily: 'nunito'
    },
    headerStyle: {
      backgroundColor: Colors.THEME_PRIMARY,
      elevation: 0,
      borderBottomWidth: 1,
      borderBottomColor: Colors.TAB_BAR_ACTIVE_ICON
    }
  });

  render() {
    const {params} = this.props.navigation.state;
    return (
      <Videos
        navigation={this.props.navigation}
        videos={params.category.videos}
        background={categoryVideosBackground}
      />
    );
  }

}
