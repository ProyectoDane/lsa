import { StyleSheet } from 'react-native';
import Colors from './../../res/colors';

const downloadIconMaginRight = 10;

const styles = StyleSheet.create({
  full: {
    flex: 1,
    paddingVertical: 15,
  },
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.TAB_BAR_ACTIVE_ICON,
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
  buttonPosition: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonCancel: {
    backgroundColor: '#FFFFFF',
    marginLeft: 70,
    marginBottom: 10,
    marginTop: 10,
  },
  buttonOk: {
    backgroundColor: '#FFFFFF',
    marginLeft: 90,
    marginBottom: 10,
    marginTop: 10,
  },
  modalMessageDownload: {
    borderColor: '#000000',
    borderWidth: 1.5,
    borderStyle: 'solid',
    backgroundColor: '#FFFFFF',
    marginTop: 200,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 15,
  },
  textBoldModal: {
    fontSize: 20,
    marginTop: 20,
    marginLeft: 15,
    color: '#000000',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  textNormalModal: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    color: '#000000',
    textAlign: 'left',
    fontWeight: '100',
  },
  opacityModal: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  textButton: {
    fontSize: 20,
    color: '#1AA299',
    fontWeight: 'bold',
  },
});

export { styles };
