import { StyleSheet, Platform, Dimensions } from 'react-native';
import Colors from './../../../../res/colors';

export default StyleSheet.create({
  categoryContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
  },
  categoryIcon: {
    backgroundColor: Colors.CATEGORY_IMAGE_BACKGROUND_GREY,
  },
  categoryNameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 50,
  },
  categoryName: {
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
  categoriesViewContainer: {
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
  },
  button: {
    flex: 1,
    backgroundColor: '#FFB54C',
    alignItems: 'center',
    marginTop: 'auto',
    paddingVertical: 10,
    height: 40,
    marginHorizontal: 10,
    borderRadius: 6,
  },
  redButton: {
    backgroundColor: '#E2574C',
  },
  greenButton: {
    backgroundColor: '#1AA299',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'flex-end',
    paddingVertical: 10,
    height: 60,
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width,
    backgroundColor: '#E0E0E0',
  },
  downloadText: {
    textAlign: 'center',
    fontFamily: 'nunito',
},
headerText: {zIndex: 100,
  backgroundColor:'white',
  paddingHorizontal: 10,
  paddingVertical: 8,
  bottom: 55}
});
