import { StyleSheet, Platform } from 'react-native';
import Colors from './../../res/colors';

export default StyleSheet.create({
  videoContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'white'
  },
  videoIcon: {
    backgroundColor: Colors.CATEGORY_IMAGE_BACKGROUND_GREY
  },
  videoNameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 50
  },
  videoName: {
    textAlign: 'center',
    fontFamily: 'nunito'
  },
  rowContainer: {
    flexDirection: "row"
  },
  lastRowContainer: {
    flexDirection: "row"
  },
  backgroundImageStyle: {
    resizeMode: Platform.OS === 'ios' ? 'repeat' : 'stretch'
  },
  videosScrollView: {
    flex: 1
  }
});
