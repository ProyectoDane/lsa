import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  full: {
    flex: 1,
    paddingVertical: 15,
  },
  categoryModal: {
    flex: 1,
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
  sliderButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: Dimensions.get('window').width,
  },
  sliderButtonsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#E0E0E0',
  },
  categoryScrollContainer: {
    flex: 11,
  },
  sliderImage: {
    width: Dimensions.get('window').width,
    backgroundColor: '#757575',
    flex: 1,
  },
  categoryCloseButtonContainer: {
    flex: 1,
  },
  categoryCard: {
    flex: 1,
    padding: 16,
    fontSize: 20,
    backgroundColor: '#FFF',
    marginVertical: 8,
  },
});

export { styles };
