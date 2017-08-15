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
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    flex: 1
  },
  title: {
    textAlign: 'center',
    fontSize: 20
  },
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

export default class Category extends Component {

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
    const {params} = this.props.navigation.state;
    let videos = params.category.videos;
    let rows = [];
    for (var i = 0; i < videos.length; i += videosPerRow) {
      rows.push(this.renderRow(videos, i));
    }
    return (
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{params.category.name_es}</Text>
        <ScrollView style={{flex: 1}}>
          {rows}
        </ScrollView>
      </View>
    );
  }

}
