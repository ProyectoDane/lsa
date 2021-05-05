import {StyleSheet, Dimensions} from 'react-native';
import Colors from './../../res/colors';
import {getScreenHeight} from '../../util/layoutUtil';

const downloadIconMaginRight = 10;

const styles = StyleSheet.create({
  full: {
    flex: 1,
    paddingVertical: 15,
  },
  headerText: {
    zIndex: 100,
    fontFamily: 'nunito',
    color: Colors.THEME_SECONDARY,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 8,
    textAlign: 'center',
  },
  downloadIcon: {
    color: Colors.THEME_SECONDARY,
    marginRight: downloadIconMaginRight,
    fontWeight: 'bold',
  },
  downloadText: {
    textAlign: 'center',
    fontFamily: 'nunito',
  },
  image: {
    width: Dimensions.get('window').width,
    height: getScreenHeight() - 15,
    backgroundColor: '#757575',
  },

  inactiveCircle: {
    fontSize: Dimensions.get('window').width / 20,
    color: '#FFF',
    margin: 3,
  },
  activeCircle: {
    fontSize: Dimensions.get('window').width / 20,
    color: '#FFB54C',
    margin: 3,
  },
  buttonModal: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    height: 60,
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width,
    backgroundColor: '#E0E0E0',
  },
  iconStyle: {
    position: 'absolute',
    right: 15,
    top: 40,
  },
});

export {styles};
