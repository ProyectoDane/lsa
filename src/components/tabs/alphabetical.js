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
import { connect } from 'react-redux';

import {CATEGORIES_INDEX} from './../categories/categoriesIndex';
import {ALPHABETICAL_CATEGORY_NAME_ES} from './../../constants/';
import { alphabeticalPageRestarted } from './../../actions/restartPage';

const categoryVideosBackground = require('./../../res/background/fondo-amarillo.jpg');
const infoIconMagin = 10;

const styles = StyleSheet.create({
  infoIcon: {
    color: Colors.THEME_SECONDARY,
    margin: infoIconMagin
  }
});

class Alphabetical extends Component {

  constructor(props) {
    super(props);
    const videos = CATEGORIES_INDEX.categories.find((category) => category.name_es === ALPHABETICAL_CATEGORY_NAME_ES).videos;
    this.state = {videos};
  }

  static navigationOptions = ({navigation, screenProps}) => ({
    title: I18n.t('alphabetical_tab_title'),
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldRestartAlphabetical) {
      this.videosComponent.scrollToTop();
      this.props.dispatchAlphabeticalPageRestarted();
    }
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1}}>
        <Videos
          ref={videosComponent => this.videosComponent = videosComponent}
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

function mapStateToProps (state) {
  return {
    shouldRestartAlphabetical: state.restartPage.shouldRestartAlphabetical
  };
}

function mapDispatchToProps (dispatch) {
  return {
    dispatchAlphabeticalPageRestarted: () => dispatch(alphabeticalPageRestarted())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Alphabetical);
