import React, { Component } from 'react';
import {
  Dimensions,
  TextInput,
  View,
  Text,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../../../res/colors';
import I18n from '../../../res/i18n/i18n';
import CATEGORIES_INDEX from '../../../categoriesIndex';

import { styles, searchInputMaginLeft, searchInputMaginRight } from '../styles';
import Videos from '../../Videos/index';

const searchVideosBackground = require('../../../res/background/fondo-verde.jpg');

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      videos: [],
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerTintColor: Colors.THEME_SECONDARY,
    headerStyle: {
      backgroundColor: Colors.THEME_PRIMARY,
      elevation: 0,
      borderBottomWidth: 1,
      borderBottomColor: Colors.TAB_BAR_ACTIVE_ICON,
    },
    headerLeft: (
      <TextInput
        ref={r => {
          this.searchInputRef = r;
        }}
        style={[
          styles.searchInput,
          {
            width: Dimensions.get('window').width - searchInputMaginLeft - searchInputMaginRight,
          },
        ]}
        autoCapitalize="characters"
        underlineColorAndroid="transparent"
        placeholder={I18n.t('search_video')}
        placeholderTextColor={Colors.THEME_SECONDARY}
        autoFocus={false}
        onChangeText={text => navigation.setParams({ searchQuery: text })}
        value={navigation.state.params ? navigation.state.params.searchQuery : ''}
      />
    ),
    headerRight: (
      <Ionicons
        name={
          navigation.state.params && navigation.state.params.searchQuery
            ? 'ios-close-circle-outline'
            : 'ios-search-outline'
        }
        size={26}
        style={styles.searchIcon}
        onPress={() => navigation.setParams({ searchQuery: '' })}
      />
    ),
  });

  shouldComponentUpdate(nextProps) {
    const { navigation } = this.props;
    if (navigation.state.params) {
      return navigation.state.params.searchQuery !== nextProps.navigation.state.params.searchQuery;
    }
    return false;
  }

  componentWillReceiveProps(nextProps) {
    const { navigation, dispatchSearchPageRestarted } = this.props;
    if (nextProps.shouldRestartSearch) {
      navigation.setParams({ searchQuery: '' });
      dispatchSearchPageRestarted();
    } else if (nextProps.navigation.state.params) {
      this._searchVideos(nextProps.navigation.state.params.searchQuery.toUpperCase());
    }
  }

  _onLayout = () => {
    this.forceUpdate();
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.full} onLayout={this._onLayout}>
        <TouchableWithoutFeedback style={styles.mainContainer} onPressIn={() => Keyboard.dismiss()}>
          {this.state.query !== '' && this.state.videos.length > 0 ? (
            <Videos
              navigation={navigation}
              videos={this.state.videos}
              background={searchVideosBackground}
            />
          ) : (
            <ImageBackground
              style={styles.full}
              imageStyle={[
                styles.backgroundImageStyle,
                {
                  width: Dimensions.get('window').width,
                  height: Dimensions.get('window').height,
                },
              ]}
              source={require('../../../res/background/fondo-verde.jpg')}
            >
              {this.state.query.length < 1 ? (
                <View pointerEvents="none" style={styles.videosMessageContainer}>
                  <Text style={styles.videosFoundMessage}>{I18n.t('find_a_video')}</Text>
                </View>
              ) : (
                this.state.query.length > 1 &&
                this.state.videos.length === 0 && (
                  <View pointerEvents="none" style={styles.videosMessageContainer}>
                    <Text style={styles.videosFoundMessage}>{I18n.t('no_videos_found')}</Text>
                  </View>
                )
              )}
            </ImageBackground>
          )}
        </TouchableWithoutFeedback>
      </View>
    );
  }

  _removeAccents = string => {
    return string
      .split('Á')
      .join('A')
      .split('É')
      .join('E')
      .split('Í')
      .join('I')
      .split('Ó')
      .join('O')
      .split('Ú')
      .join('U');
  };

  _searchVideos = searchString => {
    if (searchString && searchString.length > 1) {
      searchString = this._removeAccents(searchString);
      const  { categories }  = CATEGORIES_INDEX;
      const foundVideos = []; // eslint-disable-line prefer-destructuring
      for (let i = 0; i < categories.length; i++) {
        for (let j = 0; j < categories[i].videos.length; j++) {
          if (categories[i].videos[j].search_name_es.indexOf(searchString) !== -1) {
            foundVideos.push(categories[i].videos[j]);
          }
        }
      }
      this.setState({ query: searchString, videos: foundVideos });
    } else {
      this.setState({ query: searchString, videos: [] });
    }
  };
}
