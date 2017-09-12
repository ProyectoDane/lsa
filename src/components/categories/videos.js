import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Platform
} from 'react-native';

import {deviceIsTablet} from './../../util/deviceUtil';
import {PAGES} from './../../constants/';

const videosPerRow = deviceIsTablet() ? 4 : 2;
const videoPaddingVertical = 5;
const videoPaddingHorizontal = 5;

const videoWidth = Dimensions.get('window').width / videosPerRow;

const styles = StyleSheet.create({
  videoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: videoWidth,
    paddingVertical: videoPaddingVertical,
    paddingHorizontal: videoPaddingHorizontal
  },
  videoIcon: {
    width: videoWidth - 2 * videoPaddingHorizontal * videosPerRow,
    height: videoWidth - 2 * videoPaddingHorizontal * videosPerRow
  },
  videoNameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    width: videoWidth - 2 * videoPaddingHorizontal * videosPerRow,
    height: 50,
    backgroundColor: 'white'
  },
  videoName: {
    textAlign: 'center'
  },
  rowContainer: {
    flexDirection: "row"
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
        <Image
          style={styles.videoIcon}
          source={video.icon}
        />
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
    console.log(videos);
    let rows = [];
    for (var i = 0; i < videos.length; i += videosPerRow) {
      rows.push(this.renderRow(videos, i));
    }
    return (
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          {rows}
        </ScrollView>
      </View>
    );
  }

}
