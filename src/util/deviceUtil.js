import {Dimensions} from 'react-native';

const windowsWidth = Dimensions.get('window').width;
const windowsHeight = Dimensions.get('window').height;

export const deviceIsInLandscapeMode = () => {
  return windowsWidth > windowsHeight;
};

export const deviceIsTablet = () => {
  return Dimensions.get('window').width > 600;
};
