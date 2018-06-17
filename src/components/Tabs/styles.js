import { StyleSheet, Platform } from 'react-native';
import Colors from './../../res/colors';

const infoIconMagin = 10;
const searchInputMaginLeft = 10;
const searchIconSize = 26;
const searchIconMaginRight = searchInputMaginLeft;
const searchInputMaginRight = searchIconMaginRight + searchIconSize + searchInputMaginLeft;
const noResultsMessageHorizontalMargin = 30;

const styles = StyleSheet.create({
  infoIcon: {
    color: Colors.THEME_SECONDARY,
    margin: infoIconMagin,
  },
  mainContainer: {
    flex: 1,
  },
  searchInput: {
    marginVertical: 10,
    marginLeft: searchInputMaginLeft,
    marginRight: searchInputMaginRight,
    height: 30,
    paddingBottom: Platform.OS === 'android' ? 6 : 0,
    paddingHorizontal: 5,
    fontSize: 14,
    color: 'black',
    backgroundColor: 'whitesmoke',
  },
  videosMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  videosFoundMessage: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.THEME_PRIMARY,
    marginLeft: noResultsMessageHorizontalMargin,
    marginRight: noResultsMessageHorizontalMargin,
    fontFamily: 'nunito',
  },
  backgroundImageStyle: {
    resizeMode: Platform.OS === 'ios' ? 'repeat' : 'stretch',
  },
  searchIcon: {
    color: Colors.THEME_SECONDARY,
    marginRight: searchIconMaginRight,
  },
  full: {
    flex: 1,
  },
});

export { styles, searchInputMaginLeft, searchInputMaginRight };
