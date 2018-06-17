import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  full: {
    flex: 1,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  backgroundImageStyle: {
    resizeMode: Platform.OS === 'ios' ? 'repeat' : 'stretch',
  },
});
