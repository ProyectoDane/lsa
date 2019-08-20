import React, { PureComponent } from 'react';
import {
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  View,
  Image,
  ScrollView,
} from 'react-native';
import RNFS from 'react-native-fs';
import Video from 'react-native-video';
import Colors from './../../res/colors';
import { deviceIsInLandscapeMode } from './../../util/deviceUtil';
import { getCardWidth, getTabNavigatorBarHeight, getCardPadding } from './../../util/layoutUtil';
import { styles, margin } from './styles';

const background = require('./../../res/background/fondo-amarillo.jpg');

const videoRatio = 352 / 288;
const playIcon = require('./../../res/icon/play-icon.png');

export class VideoPlayer extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.video.name_es,
    headerTintColor: Colors.THEME_SECONDARY,
    headerTitleStyle: {
      fontFamily: 'nunito',
    },
    headerStyle: {
      backgroundColor: Colors.THEME_PRIMARY,
      elevation: 0,
      borderBottomWidth: 1,
      borderBottomColor: Colors.TAB_BAR_ACTIVE_ICON,
    },
  });

  state = { paused: true, show: false };

  _onEnd = () => this.setState({ paused: true });

  _onLayout = () => this.forceUpdate();

  componentDidMount() {
    const { params } = this.props.navigation.state;
    const { video } = params;
    const videoName = video.video.split('/').pop();
    const path = `${RNFS.DocumentDirectoryPath}/${videoName}`;
    RNFS.exists(path).then(existingFile => {
      if (!existingFile) {
        RNFS.downloadFile({
          fromUrl: video.video,
          toFile: `${RNFS.DocumentDirectoryPath}/${videoName}`
        }).promise.then(() => this.setState({show: true}));
      }
    });
    
  }

  render() {
    let videoHeight;
    let videoWidth;
    if (deviceIsInLandscapeMode()) {
      videoHeight = Dimensions.get('window').height - getTabNavigatorBarHeight() - 2 * margin;
      videoWidth = Math.round(videoHeight * videoRatio);
    } else {
      videoWidth = Dimensions.get('window').width - 2 * margin;
      videoHeight = Math.round(videoWidth / videoRatio);
    }
    const { params } = this.props.navigation.state;
    const { video } = params;
    const videoName = video.video.split('/').pop();

    return this.state.show && (
    
      <View onLayout={this._onLayout} style={styles.full}>
        <ImageBackground
          style={styles.full}
          imageStyle={[
            styles.backgroundImageStyle,
            {
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height - getTabNavigatorBarHeight(),
            },
          ]}
          source={background}
        >
          <ScrollView>
            <TouchableOpacity
              style={[
                styles.videoContainer,
                {
                  marginHorizontal: deviceIsInLandscapeMode()
                    ? (Dimensions.get('window').width - videoWidth) / 2
                    : margin,
                  width: videoWidth,
                  height: videoHeight,
                },
              ]}
              onPress={() => {
                if (this.video) {
                  this.video.seek(0);
                }
                this.setState({ paused: !this.state.paused });
              }}
            >
              {this.state.paused ? (
                <Image style={styles.playIcon} source={playIcon} />
              ) : (
                <Video
                  ref={ref => {
                    this.video = ref;
                  }}
                  source={{uri: `file://${RNFS.DocumentDirectoryPath}/${videoName}`}}
                  style={[
                    styles.video,
                    {
                      width: videoWidth,
                      height: videoHeight,
                    },
                  ]}
                  rate={1}
                  paused={this.state.paused}
                  muted
                  resizeMode="contain"
                  onEnd={this._onEnd}
                />
              )}
            </TouchableOpacity>
            {deviceIsInLandscapeMode() ? null : (
              <View
                style={[
                  styles.cardContainer,
                  {
                    width: getCardWidth(),
                    height: getCardWidth(),
                    padding: getCardPadding(),
                    marginLeft: (Dimensions.get('window').width - getCardWidth()) / 2,
                    marginBottom: getCardPadding() * 2,
                  },
                ]}
              >
                <Image
                  style={[
                    styles.cardImage,
                    {
                      width: getCardWidth() - 2 * getCardPadding(),
                      height: getCardWidth() - 2 * getCardPadding(),
                    },
                  ]}
                  source={video.image}
                />
              </View>
            )}
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}
