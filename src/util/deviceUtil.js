import {Dimensions} from 'react-native';

const deviceIsTablet = () => {
  return Dimensions.get('window').width > 600;
};

export {deviceIsTablet};
