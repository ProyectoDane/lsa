import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  TextInput,
  Platform,
  View,
  Text,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from './../../res/colors';
import I18n from './../../res/i18n/i18n';
import Videos from './../categories/videos';
import {CATEGORIES_INDEX} from './../categories/categoriesIndex';

const searchInputMaginLeft = 10;
const searchIconSize = 26;
const searchIconMaginRight = searchInputMaginLeft;
const searchInputMaginRight = searchIconMaginRight + searchIconSize + searchInputMaginLeft;
const noGrouponsMessageHorizontalMargin = 30;
const searchVideosBackground = require('./../../res/background/fondo-verde.jpg');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  searchInput: {
    marginVertical: 10,
    marginLeft: searchInputMaginLeft,
    marginRight: searchInputMaginRight,
    height: 30,
    paddingBottom: (Platform.OS === 'android') ? 6 : 0,
    paddingHorizontal: 5,
    fontSize: 14,
    color: 'black',
    backgroundColor: 'whitesmoke'
  },
  videosMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  videosFoundMessage: {
    fontSize:    20,
    fontWeight:  'bold',
    color: Colors.THEME_PRIMARY,
    marginLeft:  noGrouponsMessageHorizontalMargin,
    marginRight: noGrouponsMessageHorizontalMargin
  },
  backgroundImageStyle: {
    resizeMode: Platform.OS === 'ios' ? 'repeat' : 'stretch'
  },
  searchIcon: {
    color: Colors.THEME_SECONDARY,
    marginRight: searchIconMaginRight
  }
});

export default class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: "",
      videos: []
    };
  }

  static navigationOptions = ({navigation, screenProps}) => ({
    headerTintColor: Colors.THEME_SECONDARY,
    headerStyle: {
      backgroundColor: Colors.THEME_PRIMARY,
      elevation: 0,
      borderBottomWidth: 1,
      borderBottomColor: Colors.TAB_BAR_ACTIVE_ICON
    },
    headerLeft: (
      <TextInput
        ref={r => this.searchInputRef = r}
        style={[styles.searchInput,
          {
            width: Dimensions.get('window').width - searchInputMaginLeft - searchInputMaginRight
          }
        ]}
        autoCapitalize={'characters'}
        underlineColorAndroid={'transparent'}
        placeholder={I18n.t('search_video')}
        placeholderTextColor={Colors.THEME_SECONDARY}
        autoFocus={false}
        onChangeText={(text) => navigation.setParams({searchQuery: text})}
        value={navigation.state.params ? navigation.state.params.searchQuery : ''}
      />
    ),
    headerRight: (
      <Ionicons
        name={navigation.state.params ? navigation.state.params.searchQuery ? 'ios-close-circle-outline' : 'ios-search-outline' : 'ios-search-outline'}
        size={26}
        style={styles.searchIcon}
        onPress={() => navigation.setParams({searchQuery: ''})}
      />
    )
  });

  componentWillReceiveProps(nextProps) {
    this.searchVideos(nextProps.navigation.state.params.searchQuery.toUpperCase());
  }

  onLayout() {
    this.forceUpdate();
  }

  render() {
    return (
      <View style={{flex: 1}} onLayout={this.onLayout.bind(this)}>
        <TouchableWithoutFeedback
          style={styles.mainContainer}
          onPressIn={() => Keyboard.dismiss()}
        >
          {this.state.query !== "" && this.state.videos.length > 0 ?
            <Videos
              navigation={this.props.navigation}
              videos={this.state.videos}
              background={searchVideosBackground}
            />
            :
            <ImageBackground
              style={{flex: 1}}
              imageStyle={[styles.backgroundImageStyle,
                {
                  width: Dimensions.get('window').width,
                  height: Dimensions.get('window').height
                }
              ]}
              source={require('./../../res/background/fondo-verde.jpg')}
            >
              {
                this.state.query.length < 1 ?
                  <View
                    pointerEvents="none"
                    style={styles.videosMessageContainer}
                  >
                    <Text style={styles.videosFoundMessage}>{I18n.t('find_a_video')}</Text>
                  </View> :
                this.state.query.length > 1 && this.state.videos.length === 0 ?
                  <View
                    pointerEvents="none"
                    style={styles.videosMessageContainer}
                  >
                    <Text style={styles.videosFoundMessage}>{I18n.t('no_videos_found')}</Text>
                  </View> : null
              }
            </ImageBackground>
          }
        </TouchableWithoutFeedback>
      </View>
    );
  }

  removeAccents(string) {
    return string.split("Á").join("A").split("É").join("E").split("Í").join("I").split("Ó").join("O").split("Ú").join("U");
  }

  searchVideos(searchString) {
    if (searchString && searchString.length > 1) {
      searchString = this.removeAccents(searchString);
      let categories = CATEGORIES_INDEX.categories;
      let foundVideos = [];
      for (var i = 0; i < categories.length; i++) {
        for (var j = 0; j < categories[i].videos.length; j++) {
          if (categories[i].videos[j].search_name_es.indexOf(searchString) !== -1) {
            foundVideos.push(categories[i].videos[j]);
          }
        }
      }
      this.setState({query: searchString, videos: foundVideos});
    } else {
      this.setState({query: searchString, videos: []});
    }
  }

}
