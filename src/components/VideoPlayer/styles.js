import { StyleSheet, Platform } from 'react-native';

const margin = 12;
const playIconSize = 100;

const styles = StyleSheet.create({
  backgroundImageStyle: {
    resizeMode: Platform.OS === 'ios' ? 'repeat' : 'stretch',
  },
  videoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: margin,
    marginBottom: margin,
    backgroundColor: 'white',
  },
  video: {
    backgroundColor: 'transparent',
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  cardImage: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  playIcon: {
    height: playIconSize,
    width: playIconSize,
  },
  full: {
    flex: 1,
  },
  loader: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
});

export { styles, margin };
