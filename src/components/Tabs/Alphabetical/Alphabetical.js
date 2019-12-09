import React, { PureComponent } from 'react';
import { View, Alert, ImageBackground, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../../res/colors';
import Videos from '../../Videos/index';
import I18n from '../../../res/i18n/i18n';

import CATEGORIES_INDEX from '../../../categoriesIndex';
import { ALPHABETICAL_CATEGORY_NAME_ES } from '../../../constants/index';

import { styles } from '../styles';

const categoryVideosBackground = require('../../../res/background/fondo-amarillo.jpg');

export class Alphabetical extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      videos: CATEGORIES_INDEX.categories.find(category => {
        return category.name_es === ALPHABETICAL_CATEGORY_NAME_ES;
      }).videos,
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: I18n.t('alphabetical_tab_title'),
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
    headerRight: (
      <Ionicons
        name="ios-help-circle-outline"
        size={26}
        style={styles.infoIcon}
        onPress={() => navigation.setParams({ showDialog: true })}
      />
    ),
  });

  componentWillReceiveProps(nextProps) {
    const { dispatchAlphabeticalPageRestarted } = this.props;
    if (nextProps.shouldRestartAlphabetical) {
      this.videosComponent.scrollToTop();
      dispatchAlphabeticalPageRestarted();
    }
  }
  _onLayout = () => {
    this.forceUpdate();
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.full} onLayout={this._onLayout}>
         <ImageBackground
          style={styles.full}
          imageStyle={[
            styles.backgroundImageStyle,
            { width: Dimensions.get('window').width, height: Dimensions.get('window').height },
          ]}
          source={categoryVideosBackground}
        >
        <Videos
          ref={videosComponent => {
            this.videosComponent = videosComponent;
          }}
          navigation={navigation}
          videos={this.state.videos}
        />
        {navigation.state.params &&
          navigation.state.params.showDialog &&
          Alert.alert(
            I18n.t('alphabetical_tab_title').toUpperCase(),
            I18n.t('alphabetical_dialog_description').toUpperCase(),
            [{ text: 'OK', onPress: () => navigation.setParams({ showDialog: false }) }],
            { cancelable: false }
          )}
          </ImageBackground>
      </View>
    );
  }
}
