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
const cardPadding = 6;
const videoRatio = 352 / 288;

export default class VideoPlayer extends Component {

  constructor(props) {
    super(props);
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

  onLayout() {
    this.forceUpdate();
  }

  render() {
    let videoHeight, videoWidth;
    if (deviceIsInLandscapeMode()) {
      videoHeight = Dimensions.get('window').height - getTabNavigatorBarHeight() - 2 * margin;
      videoWidth = Math.round(videoHeight * videoRatio);
    } else {
      videoWidth = Dimensions.get('window').width - 2 * margin;
      videoHeight = Math.round(videoWidth / videoRatio);
    }
    const {params} = this.props.navigation.state;
    let video = params.video;
    return (
      <View
        onLayout={this.onLayout.bind(this)}
        style={{flex: 1}}
      >
        <ImageBackground
          style={{flex: 1}}
          imageStyle={[styles.backgroundImageStyle,
            {
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height - getTabNavigatorBarHeight()
            }]}
          source={require('./../../res/background/fondo-amarillo.jpg')}
        >
          <ScrollView>
            <TouchableOpacity
              style={[styles.videoContainer,
                {
                  marginHorizontal: deviceIsInLandscapeMode() ? (Dimensions.get('window').width - videoWidth) / 2 : margin,
                  width: videoWidth,
                  height: videoHeight
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
                    width: videoWidth,
                    height: videoHeight
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
                <View style={[styles.cardContainer,
                  {
                    width: getCardWidth(),
                    height: getCardWidth(),
                    marginLeft: (Dimensions.get('window').width - getCardWidth()) / 2
                  }]}
                >
                  <Image
                    style={[styles.cardImage,
                      {
                        width: getCardWidth() - 2 * cardPadding,
                        height: getCardWidth() - 2 * cardPadding
                      }]}
                    source={video.image}
                  />
                </View>
              )
            }
            </ScrollView>
        </ImageBackground>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  backgroundImageStyle: {
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
    padding: cardPadding,
    backgroundColor: 'white'
  },
  cardImage: {
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
});
