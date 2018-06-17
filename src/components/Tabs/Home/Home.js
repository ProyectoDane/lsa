import React, { PureComponent } from 'react';
import { View } from 'react-native';
import Categories from '../../Categories/index';
import Colors from '../../../res/colors';
import I18n from '../../../res/i18n/i18n';
import styles from './styles';

export class Home extends PureComponent {
  static navigationOptions = () => ({
    title: I18n.t('home_tab_title'),
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
    return (
      <View style={styles.full}>
        <Categories navigation={navigation} />
      </View>
    );
  }
}
