import { StyleSheet, Platform } from 'react-native';
import Colors from './../../res/colors';

export default StyleSheet.create({
  videoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
  },
  videoIcon: {
    backgroundColor: Colors.CATEGORY_IMAGE_BACKGROUND_GREY,
  },
  videoNameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 50,
  },
  videoName: {
    textAlign: 'center',
    fontFamily: 'nunito',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  lastRowContainer: {
    flexDirection: 'row',
  },
  backgroundImageStyle: {
    resizeMode: Platform.OS === 'ios' ? 'repeat' : 'stretch',
  },
  videosViewContainer: {
    flex: 1,
  },
  full: {
    flex: 1,
  },
  videoIconDownload: {
    position: 'absolute', top: 0, left: 0, zIndex: 100
  }
});
