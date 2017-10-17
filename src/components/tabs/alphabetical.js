import React, { Component } from 'react';

import Colors from './../../res/colors';
import Videos from './../categories/videos';
import I18n from './../../res/i18n/i18n';

import {CATEGORIES_INDEX} from './../categories/categoriesIndex';
import {ALPHABETICAL_CATEGORY_NAME_ES} from './../../constants/';

const categoryVideosBackground = require('./../../res/background/fondo-amarillo.jpg');

export default class Alphabetical extends Component {

  constructor(props) {
    super(props);
    const videos = CATEGORIES_INDEX.categories.find((category) => category.name_es === ALPHABETICAL_CATEGORY_NAME_ES).videos;
    this.state = {videos};
  }

  static navigationOptions = ({navigation, screenProps}) => ({
    title: I18n.t('alphabetical_tab_title'),
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
      <Videos
        navigation={this.props.navigation}
        videos={this.state.videos}
        background={categoryVideosBackground}
      />
    );
  }

}
