import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Alert
} from 'react-native';
import Colors from './../../res/colors';
import Videos from './../categories/videos';
import I18n from './../../res/i18n/i18n';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {CATEGORIES_INDEX} from './../categories/categoriesIndex';
import {ALPHABETICAL_CATEGORY_NAME_ES} from './../../constants/';

const categoryVideosBackground = require('./../../res/background/fondo-amarillo.jpg');
const infoIconMagin = 10;

const styles = StyleSheet.create({
  infoIcon: {
    color: Colors.THEME_SECONDARY,
    margin: infoIconMagin
  }
});

export default class Alphabetical extends Component {

  constructor(props) {
    super(props);
    const videos = CATEGORIES_INDEX.categories.find((category) => category.name_es === ALPHABETICAL_CATEGORY_NAME_ES).videos;
    this.state = {videos};
  }

  static navigationOptions = ({navigation, screenProps}) => ({
    title: I18n.t('alphabetical_tab_title'),
    headerTintColor: Colors.THEME_SECONDARY,
    headerBackTitle: null,
    headerStyle: {
      backgroundColor: Colors.THEME_PRIMARY,
      elevation: 0,
      borderBottomWidth: 1,
      borderBottomColor: Colors.TAB_BAR_ACTIVE_ICON
    },
    headerRight: (
      <Ionicons
        name={'ios-help-circle-outline'}
        size={26}
        style={styles.infoIcon}
        onPress={() => navigation.setParams({showDialog: true})}
      />
    )
  });

  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1}}>
        <Videos
          navigation={navigation}
          videos={this.state.videos}
          background={categoryVideosBackground}
        />
        {navigation.state.params ? navigation.state.params.showDialog ?
          Alert.alert(
            I18n.t('alphabetical_tab_title'),
            I18n.t('alphabetical_dialog_description'),
            [
              {text: 'OK', onPress: () => navigation.setParams({showDialog: false})}
            ],
            { cancelable: false }
          ) : null : null
        }
      </View>
    );
  }

}
