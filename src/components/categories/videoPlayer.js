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
  Image,
  ScrollView
} from 'react-native';

import Video from 'react-native-video';
import Colors from './../../res/colors';
import {deviceIsInLandscapeMode} from './../../util/deviceUtil';
import {getCardWidth, getTabNavigatorBarHeight} from './../../util/layoutUtil';

const margin = 12;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height - getTabNavigatorBarHeight();
const cardSize = getCardWidth();
const cardPadding = 6;
const videoRatio = 352 / 288;

export default class VideoPlayer extends Component {

  constructor(props) {
    super(props);
    if (deviceIsInLandscapeMode()) {
      this.videoHeight = windowHeight - 2 * margin;
      this.videoWidth = Math.round(this.videoHeight * videoRatio);
    } else {
      this.videoWidth = windowWidth - 2 * margin;
      this.videoHeight = Math.round(this.videoWidth / videoRatio);
    }
    this.onEnd = this.onEnd.bind(this);
  }

  static navigationOptions = ({navigation, screenProps}) => ({
    title: navigation.state.params.video.name_es,
    headerTintColor: Colors.THEME_SECONDARY,
    headerStyle: {
      backgroundColor: Colors.THEME_PRIMARY,
      elevation: 0,
      borderBottomWidth: 1,
      borderBottomColor: Colors.TAB_BAR_ACTIVE_ICON
    }
  });

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
        <ScrollView>
          <TouchableOpacity
            style={[styles.videoContainer,
              {
                marginHorizontal: deviceIsInLandscapeMode() ? (windowWidth - this.videoWidth) / 2 : margin,
                width: this.videoWidth,
                height: this.videoHeight
              }
            ]}
            onPress={() => {
              this.video.seek(0);
              this.setState({paused: !this.state.paused});
            }}
          >
            <Video
              ref={(ref: Video) => { this.video = ref; }}
              source={video.video}
              style={[styles.video,
                {
                  width: this.videoWidth,
                  height: this.videoHeight
                }
              ]}
              rate={1}
              paused={this.state.paused}
              muted={true}
              resizeMode={'contain'}
              onEnd={this.onEnd}
            />
          </TouchableOpacity>
          {deviceIsInLandscapeMode() ? null :
            (
              <View style={styles.cardContainer}>
                <Image
                  style={styles.cardImage}
                  source={video.image}
                />
              </View>
            )
          }
          </ScrollView>
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
    marginTop: margin,
    marginBottom: margin,
    backgroundColor: 'white'
  },
  video: {
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
