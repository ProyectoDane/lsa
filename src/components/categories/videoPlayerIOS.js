import React, {
  Component
} from 'react';

import {
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Platform,
  View,
  Image
} from 'react-native';

import Video from 'react-native-video';
import Colors from './../../res/colors';

const margin = 12;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const cardSize = 150;
const cardPadding = 6;

const videoWidth = windowWidth - 2 * margin;
const videoRatio = 352 / 288;
const videoHeight = Math.round(videoWidth / videoRatio);

export default class VideoPlayerIOS extends Component {

  static navigationOptions = ({navigation, screenProps}) => ({
    title: navigation.state.params.video.name_es,
    headerTintColor: Colors.THEME_SECONDARY,
    headerStyle: {
      backgroundColor: Colors.THEME_PRIMARY,
      elevation: 0
    }
  });

  constructor(props) {
    super(props);
    this.onEnd = this.onEnd.bind(this);
  }

  state = { paused: true };

  onEnd() {
    this.setState({ paused: true});
  };

  render() {
    const {params} = this.props.navigation.state;
    let video = params.video;

    return (
      <ImageBackground
        style={{flex: 1}}
        imageStyle={styles.backgroundImageStyle}
        source={require('./../../res/background/fondo-amarillo.jpg')}
      >
        <TouchableOpacity
          style={styles.videoContainer}
          onPress={() => {
            this.video.seek(0);
            this.setState({paused: !this.state.paused});
          }}
        >
          <Video
            ref={(ref: Video) => { this.video = ref; }}
            source={video.video}
            style={styles.video}
            rate={1}
            paused={this.state.paused}
            muted={true}
            resizeMode={'contain'}
            onEnd={this.onEnd}
          />
        </TouchableOpacity>

        <View style={styles.cardContainer}>
          <Image
            style={styles.cardImage}
            source={video.image}
          />
        </View>

      </ImageBackground>
    );
  }

}

const styles = StyleSheet.create({
  backgroundImageStyle: {
    width: windowWidth,
    height: windowHeight,
    resizeMode: Platform.OS === 'ios' ? 'repeat' : 'stretch'
  },
  videoContainer: {
    width: videoWidth,
    height: videoHeight,
    marginHorizontal: margin,
    marginTop: margin,
    marginBottom: margin * 3,
    backgroundColor: 'transparent'
  },
  video: {
    width: videoWidth,
    height: videoHeight,
    backgroundColor: 'transparent'
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: cardSize,
    height: cardSize,
    padding: cardPadding,
    backgroundColor: 'white',
    marginLeft: (windowWidth - cardSize) / 2
  },
  cardImage: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: cardSize - 2 * cardPadding,
    height: cardSize - 2 * cardPadding
  }
});
