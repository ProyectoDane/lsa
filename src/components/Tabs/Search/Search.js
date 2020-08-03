import React, {useState, useRef} from 'react';
import {useFocusEffect, useScrollToTop} from '@react-navigation/native';
import {
  Dimensions,
  TextInput,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {PAGES} from './../../../constants/';
import Colors from '../../../res/colors';
import I18n from '../../../res/i18n/i18n';
import CATEGORIES_INDEX from '../../../categoriesIndex';

import {styles, searchInputMaginLeft, searchInputMaginRight} from '../styles';
import ImageBackground from '../../shared/ImageBackground';
import {Card} from '../../shared/Card';
import List from '../../shared/List';
const searchVideosBackground = require('../../../res/background/fondo-verde.jpg');

export const NavigationOptions = ({navigation, route}) => ({
  title: '',
  headerTintColor: Colors.THEME_SECONDARY,
  headerStyle: {
    backgroundColor: Colors.THEME_PRIMARY,
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.TAB_BAR_ACTIVE_ICON,
  },
  headerLeft: () => (
    <TextInput
      style={[
        styles.searchInput,
        {
          width:
            Dimensions.get('window').width -
            searchInputMaginLeft -
            searchInputMaginRight,
        },
      ]}
      autoCapitalize="characters"
      underlineColorAndroid="transparent"
      placeholder={I18n.t('search_video').toUpperCase()}
      placeholderTextColor={Colors.THEME_SECONDARY}
      autoFocus={false}
      onChangeText={text => navigation.setParams({searchQuery: text})}
      value={route.params?.searchQuery || ''}
    />
  ),
  headerRight: () => (
    <Ionicons
      name={
        route.params?.searchQuery
          ? 'ios-close-circle-outline'
          : 'ios-search-outline'
      }
      size={26}
      style={styles.searchIcon}
      onPress={() => navigation.setParams({searchQuery: ''})}
    />
  ),
});

export function Search({navigation, route}) {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const scrollRef = useRef(null);

  useScrollToTop(scrollRef);

  useFocusEffect(
    React.useCallback(() => {
      const searchQuery = (route.params?.searchQuery || '').toUpperCase();
      setQuery(searchQuery);
      setVideos(searchVideos(searchQuery));
    }, [route.params]),
  );

  const _navigateToVideo = video => {
    navigation.navigate(PAGES.PAGE_VIDEO_PLAYER, {video});
  };

  const renderItem = ({item}) => (
    <Card
      key={item.name_es}
      src={item.image}
      onPress={() => _navigateToVideo(item)}
      name={item.name_es}
    />
  );

  return (
    <View style={styles.full}>
      <TouchableWithoutFeedback
        style={styles.mainContainer}
        onPressIn={() => Keyboard.dismiss()}>
        {query !== '' && videos.length > 0 ? (
          <ImageBackground src={searchVideosBackground}>
            <List data={videos} scrollRef={scrollRef} renderItem={renderItem} />
          </ImageBackground>
        ) : (
          <ImageBackground src={searchVideosBackground}>
            {query.length < 1 ? (
              <Message>{I18n.t('find_a_video').toUpperCase()}</Message>
            ) : (
              query.length > 1 &&
              videos.length === 0 && (
                <Message>{I18n.t('no_videos_found').toUpperCase()}</Message>
              )
            )}
          </ImageBackground>
        )}
      </TouchableWithoutFeedback>
    </View>
  );
}

function Message(props) {
  return (
    <View pointerEvents="none" style={styles.videosMessageContainer}>
      <Text style={styles.videosFoundMessage}>{props.children}</Text>
    </View>
  );
}

const removeAccents = string => {
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

const searchVideos = searchString => {
  if (searchString && searchString.length > 1) {
    searchString = removeAccents(searchString);
    const {categories} = CATEGORIES_INDEX;
    const foundVideos = [];
    for (let i = 0; i < categories.length; i++) {
      for (let j = 0; j < categories[i].videos.length; j++) {
        if (
          categories[i].videos[j].search_name_es.indexOf(searchString) !== -1
        ) {
          foundVideos.push(categories[i].videos[j]);
        }
      }
    }
    return foundVideos;
  } else {
    return [];
  }
};
