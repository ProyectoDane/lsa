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
    borderWidth: 2,
    height:40,
    width: 40,
    borderRadius: 40,
    borderColor: 'white',
    backgroundColor: 'white',
    position: 'absolute', top: 12, right: 12, zIndex: 100
  }
});
