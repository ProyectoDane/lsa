import React, { PureComponent } from 'react';
import { Text, ImageBackground, Dimensions, View } from 'react-native';
import Colors from '../../../res/colors';
import I18n from '../../../res/i18n/i18n';
import styles from './styles';

const categoryVideosBackground = require('../../../res/background/fondo-rojo.jpg');

export class Information extends PureComponent {
  static navigationOptions = () => ({
    title: I18n.t('info_tab_title'),
    headerTintColor: Colors.THEME_SECONDARY,
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

  _onLayout = () => {
    this.forceUpdate();
  };

  render() {
    return (
      <View style={styles.full} onLayout={this._onLayout}>
        <ImageBackground
          style={styles.full}
          imageStyle={[
            styles.backgroundImageStyle,
            {
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
            },
          ]}
          source={categoryVideosBackground}
        >
          <Text style={styles.transparent}>Information</Text>
        </ImageBackground>
      </View>
    );
  }
}
