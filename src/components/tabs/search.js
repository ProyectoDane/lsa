import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  TextInput,
  Platform,
  View,
  Text
} from 'react-native';

import Colors from './../../res/colors';
import I18n from './../../res/i18n/i18n';
import Videos from './../categories/videos';
import {CATEGORIES_INDEX} from './../categories/categoriesIndex';

const searchInputMaginHorizontal = 10;
const noGrouponsMessageHorizontalMargin = 25;

const styles = StyleSheet.create({
  searchInput: {
    marginVertical: 10,
    marginHorizontal: searchInputMaginHorizontal,
    height: 30,
    width: Dimensions.get('window').width - searchInputMaginHorizontal * 2,
    paddingBottom: (Platform.OS === 'android') ? 6 : 0,
    paddingHorizontal: 5,
    fontSize: 14,
    color: Colors.THEME_PRIMARY,
    backgroundColor: 'white'
  },
  noVideosFoundContainer: {
    flex:           1,
    justifyContent: 'center',
    alignItems:     'center'
  },
  noVideosFoundMessage: {
    fontSize:    20,
    fontWeight:  'bold',
    marginLeft:  noGrouponsMessageHorizontalMargin,
    marginRight: noGrouponsMessageHorizontalMargin
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
      elevation: 0
    }
  });

  render() {
    return (
      <View style={{flex: 1}}>
        <TextInput
          ref={r => this.searchInputRef = r}
          style={styles.searchInput}
          autoCapitalize={'characters'}
          underlineColorAndroid={'transparent'}
          placeholder={I18n.t('search_video')}
          placeholderTextColor='lightgrey'
          autoFocus={false}
          onChangeText={(text) => this.searchVideos(text)}
        />
        {this.state.query !== "" && this.state.videos.length > 0 ?
        <Videos
          navigation={this.props.navigation}
          videos={this.state.videos}
        />
        : this.state.query !== "" && this.state.videos.length === 0 ?
        <View style={styles.noVideosFoundContainer}>
          <Text style={styles.noVideosFoundMessage}>{I18n.t('no_videos_found')}</Text>
        </View> : null
        }
      </View>
    );
  }

  searchVideos(searchString) {
    if (searchString && searchString.length > 1) {
      let categories = CATEGORIES_INDEX.categories;
      let foundVideos = [];
      for (var i = 0; i < categories.length; i++) {
        for (var j = 0; j < categories[i].videos.length; j++) {
          if (categories[i].videos[j].name_es.indexOf(searchString) !== -1) {
            foundVideos.push(categories[i].videos[j]);
          }
        }
      }
      this.setState({query: searchString, videos: foundVideos});
    } else {
      this.setState({query: "", videos: []});
    }
  }

}
