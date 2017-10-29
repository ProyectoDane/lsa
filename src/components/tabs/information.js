import React, { Component } from 'react';
import {
  Text,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Platform,
  View
} from 'react-native';

import Colors from './../../res/colors';
import I18n from './../../res/i18n/i18n';

const styles = StyleSheet.create({
  backgroundImageStyle: {
    resizeMode: Platform.OS === 'ios' ? 'repeat' : 'stretch'
  }
});

export default class Information extends Component {

  static navigationOptions = ({navigation, screenProps}) => ({
    title: I18n.t('info_tab_title'),
    headerTintColor: Colors.THEME_SECONDARY,
    headerStyle: {
      backgroundColor: Colors.THEME_PRIMARY,
      elevation: 0,
      borderBottomWidth: 1,
      borderBottomColor: Colors.TAB_BAR_ACTIVE_ICON
    }
  });

  onLayout() {
    this.forceUpdate();
  }

  render() {
    return (
      <View style={{flex: 1}} onLayout={this.onLayout.bind(this)}>
        <ImageBackground
          style={{flex: 1}}
          imageStyle={[styles.backgroundImageStyle,
            {
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height
            }
          ]}
          source={require('./../../res/background/fondo-rojo.jpg')}
        >
          <Text style={{backgroundColor: 'transparent'}}>Information</Text>
        </ImageBackground>
      </View>
    );
  }

}
