import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  full: {
    flex: 1,
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
  progressBar: {
    zIndex: 100,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 8,
    bottom: 0,
  },
});
