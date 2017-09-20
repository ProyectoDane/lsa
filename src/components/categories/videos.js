import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Platform,
  ImageBackground
} from 'react-native';

import {deviceIsTablet} from './../../util/deviceUtil';
import {PAGES} from './../../constants/';
import Colors from './../../res/colors';

const videosPerRow = deviceIsTablet() ? 4 : 2;
const videoPaddingVertical = 6;
const videoPaddingHorizontal = 6;
const imagePaddingHorizontal = videoPaddingHorizontal * 2;
const imagePaddingVertical = videoPaddingVertical * 2;

const videoWidth = (Dimensions.get('window').width - 2 * videoPaddingHorizontal) / videosPerRow;

const styles = StyleSheet.create({
  videoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: videoWidth,
    paddingVertical: videoPaddingVertical,
    paddingHorizontal: videoPaddingHorizontal
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: videoWidth - 2 * videoPaddingHorizontal,
    height: videoWidth - 4 * videoPaddingVertical,
    backgroundColor: 'white'
  },
  videoIcon: {
    width: videoWidth - 2 * (videoPaddingHorizontal + imagePaddingHorizontal),
    height: videoWidth - 2 * (videoPaddingVertical + imagePaddingVertical),
    backgroundColor: Colors.CATEGORY_IMAGE_BACKGROUND_GREY
  },
  videoNameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: videoWidth - 2 * videoPaddingHorizontal,
    paddingHorizontal: imagePaddingHorizontal,
    backgroundColor: 'white',
    height: 50
  },
  videoName: {
    textAlign: 'center'
  },
  rowContainer: {
    flexDirection: "row"
  },
  backgroundImageStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: Platform.OS === 'ios' ? 'repeat' : 'stretch'
  },
  videosScrollView: {
    flex: 1,
    paddingVertical: videoPaddingVertical,
    paddingHorizontal: videoPaddingHorizontal
  }
});

export default class Videos extends Component {

  navigateToVideo(video) {
    let page = "";
    Platform.OS === 'ios' ? page = PAGES.PAGE_VIDEO_PLAYER_IOS : page = PAGES.PAGE_VIDEO_PLAYER_ANDROID;
    this.props.navigation.navigate(page, {video: video});
  }

  renderVideo(video) {
    return (
      <TouchableOpacity
        onPress={() => this.navigateToVideo(video)}
        key={video.name_es}
        style={styles.videoContainer}
      >
        <View style={styles.imageContainer} >
          <Image
            style={styles.videoIcon}
            source={video.icon}
          />
        </View>
        <View style={styles.videoNameContainer}>
          <Text style={styles.videoName}>{video.name_es}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderRow(videos, index) {
    let videosRow = [];
    for (var i = index; i < videos.length && i - index < videosPerRow; i++) {
      videosRow.push(this.renderVideo(videos[i]));
    }
    return (
      <View
        key={i}
        style={styles.rowContainer}
      >
        {videosRow}
      </View>
    );
  }

  render() {
    let videos = this.props.videos;
    let rows = [];
    for (var i = 0; i < videos.length; i += videosPerRow) {
      rows.push(this.renderRow(videos, i));
    }
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          style={{flex: 1}}
          imageStyle={styles.backgroundImageStyle}
          source={this.props.background}
        >
          <ScrollView style={styles.videosScrollView}>
            {rows}
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }

}
