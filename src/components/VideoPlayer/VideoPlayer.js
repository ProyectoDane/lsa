import * as Progress from 'react-native-progress';
import React, { PureComponent } from 'react';
import {
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  View,
  Image,
  ScrollView,
  Text
} from 'react-native';
import RNFS from 'react-native-fs';
import Video from 'react-native-video';
import Colors from './../../res/colors';
import { deviceIsInLandscapeMode } from './../../util/deviceUtil';
import { getCardWidth, getTabNavigatorBarHeight, getCardPadding } from './../../util/layoutUtil';
import { styles, margin } from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { PAGES } from './../../constants/';

// Analytics
import firebase from 'react-native-firebase';
import categoriesIndex from './../../categoriesIndex';

const Analytics = firebase.analytics();


const background = require('./../../res/background/fondo-amarillo.jpg');

const videoRatio = 352 / 288;
const playIcon = require('./../../res/icon/play-icon.png');
const videoName = "";

export class VideoPlayer extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    return ({
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
  } 

  state = { paused: true, show: false, progress: 0, indexVideo: 0 };

  _onEnd = () => {
    Analytics.logEvent("video_played", {video:videoName});
    this.setState({ paused: true })
  };

  _onLayout = () => {
    this.forceUpdate();
  };
  componentDidMount() {
    const { params } = this.props.navigation.state;
    const { video } = params;
    
    videoName = video.video.split('/').pop();
    const firstVideo = categoriesIndex.categories.find(cat => cat.videos.some(cvideo => cvideo.video === video.video));
    const indexVideo = firstVideo.videos.findIndex(v => v.video === video.video);
    this.setState({indexVideo: indexVideo});
    const path = `${RNFS.DocumentDirectoryPath}/${videoName}`;
    RNFS.exists(path).then(existingFile => {
      if (!existingFile) {
        RNFS.downloadFile({
          fromUrl: video.video,
          toFile: `${RNFS.DocumentDirectoryPath}/${videoName}`,
          progress: res => {
            const percent = (res.bytesWritten / res.contentLength);
            this.setState({progress: percent});
          }
        },
       ).promise.then(() => this.setState({show: true, progress: 0}));
      } else {
        this.setState({show: true});
      }
    });
    
  }

  _goToPreviousVideo = () => {
    const { navigation } = this.props;
    const videoA = categoriesIndex.categories.find(cat => cat.videos.some(cvideo => cvideo.video === navigation.state.params.video.video));
    const prevVideo = videoA.videos[this.state.indexVideo-1];
    navigation.navigate(PAGES.PAGE_VIDEO_PLAYER, { video: prevVideo });
  }

  _goToNextVideo = () => {
    const { navigation } = this.props;
    const videoA = categoriesIndex.categories.find(cat => cat.videos.some(cvideo => cvideo.video === navigation.state.params.video.video));
    const nextVideo = videoA.videos[this.state.indexVideo+1];
    navigation.navigate(PAGES.PAGE_VIDEO_PLAYER, { video: nextVideo });
  }

  _checkIfLastVideo = () => {
    const { navigation } = this.props;
    const videoA = categoriesIndex.categories.find(cat => cat.videos.some(cvideo => cvideo.video === navigation.state.params.video.video));
    const postVideo = videoA.videos[this.state.indexVideo+1];
    return postVideo !== undefined;
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
    videoName = video.video.split('/').pop();
   
    return this.state.show ? (
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
              <View style={{alignContent: 'space-between'}}>
                <View style={{position:'absolute', bottom: 40, left: 30}}>{this.state.indexVideo !== 0 && <MaterialCommunityIcons name="arrow-left-bold-circle" size={60} style={{color: '#5D5D5D'}} onPress={this._goToPreviousVideo}/>}</View>
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
              <View style={{position:'absolute', bottom: 40, right: 30}}>{this._checkIfLastVideo() && <MaterialCommunityIcons name="arrow-right-bold-circle" size={60} style={{color: '#5D5D5D'}} onPress={this._goToNextVideo}/>}</View>

              </View>
              
            )}
          </ScrollView>
        </ImageBackground>
      </View>
    ) : (
      <View style={styles.loader}>
        <Progress.Circle color='green' progress={this.state.progress} size={150} showsText/>
      </View>
    );
  }
}
