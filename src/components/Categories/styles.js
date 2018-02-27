import { StyleSheet, Platform } from 'react-native';
import Colors from './../../res/colors';

export default StyleSheet.create({
  categoryContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'white'
  },
  categoryIcon: {
    backgroundColor: Colors.CATEGORY_IMAGE_BACKGROUND_GREY
  },
  categoryNameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 50
  },
  categoryName: {
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
  categoriesViewContainer: {
    flex: 1
  }
});
