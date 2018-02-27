import React, { Component } from 'react';
import {
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  View,
  Image,
  ScrollView
} from 'react-native';

import Video from 'react-native-video';
import Colors from './../../res/colors';
import { deviceIsInLandscapeMode } from './../../util/deviceUtil';
import {
  getCardWidth,
  getTabNavigatorBarHeight,
  getCardPadding
} from './../../util/layoutUtil';
import { styles, margin } from './styles';

const background = require('./../../res/background/fondo-amarillo.jpg');

const videoRatio = 352 / 288;
const playIcon = require('./../../res/icon/play-icon.png');

export default class VideoPlayer extends Component {

  constructor(props) {
    super(props);
    this.onEnd = this.onEnd.bind(this);
  }

  static navigationOptions = ({navigation, screenProps}) => ({
    title: navigation.state.params.video.name_es,
    headerTintColor: Colors.THEME_SECONDARY,
    headerTitleStyle: {
      fontFamily: 'nunito'
    },
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
          source={background}
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
                if (this.video) {
                  this.video.seek(0);
                }
                this.setState({paused: !this.state.paused});
              }}
            >
              {this.state.paused ?
                <Image style={styles.playIcon} source={playIcon} /> :
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
              }
            </TouchableOpacity>
            {deviceIsInLandscapeMode() ? null :
              (
                <View style={[styles.cardContainer,
                  {
                    width: getCardWidth(),
                    height: getCardWidth(),
                    padding: getCardPadding(),
                    marginLeft: (Dimensions.get('window').width - getCardWidth()) / 2,
                    marginBottom: getCardPadding() * 2
                  }]}
                >
                  <Image
                    style={[styles.cardImage,
                      {
                        width: getCardWidth() - 2 * getCardPadding(),
                        height: getCardWidth() - 2 * getCardPadding()
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
