import React, { PureComponent } from 'react';
import Videos from './../Videos';
import Colors from './../../res/colors';

const categoryVideosBackground = require('./../../res/background/fondo-amarillo.jpg');

export class Category extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.category.name_es,
    headerTintColor: Colors.THEME_SECONDARY,
    headerBackTitle: null,
    headerTitleStyle: {
      fontFamily: 'nunito',
    },
    headerStyle: {
      backgroundColor: Colors.THEME_PRIMARY,
      elevation: 0,
      borderBottomWidth: 1,
      borderBottomColor: Colors.TAB_BAR_ACTIVE_ICON,
    },
  });

  render() {
    const { navigation } = this.props;
    const { params } = navigation.state;
    return (
      <Videos
        navigation={navigation}
        videos={params.category.videos}
        background={categoryVideosBackground}
      />
    );
  }
}
