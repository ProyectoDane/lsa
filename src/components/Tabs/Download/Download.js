import React, { PureComponent } from 'react';
import { View } from 'react-native';
import CategoriesDownload from './DownloadComponents';
import Colors from '../../../res/colors';
import I18n from '../../../res/i18n/i18n';
import styles from './styles';

export class Download extends PureComponent {
  static navigationOptions = () => ({
    title: I18n.t('download_tab_title').toUpperCase(),
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
        <CategoriesDownload navigation={navigation} />
      </View>
    );
  }
}
