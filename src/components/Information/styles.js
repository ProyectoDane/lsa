import {StyleSheet} from 'react-native';

const margin = 12;

const styles = StyleSheet.create({
  full: {
    flex: 1,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  tincImage: {
    height: 100,
    width: 300,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  daneImage: {
    height: 150,
    width: 300,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 17,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  coordinacionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 2,
    fontWeight: 'bold',
  },
  text: {
    marginBottom: 10,
  },
  textLink: {
    color: 'blue',
  },
});

export {styles, margin};
