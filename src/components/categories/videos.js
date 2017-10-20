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

import {PAGES} from './../../constants/';
import Colors from './../../res/colors';
import {getCardWidth, getCardsPerRow, getCardPadding} from './../../util/layoutUtil';

const imagePaddingHorizontal = getCardPadding() * 2;
const imagePaddingVertical = getCardPadding() * 2;

const styles = StyleSheet.create({
  videoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: getCardWidth(),
    paddingVertical: getCardPadding(),
    paddingHorizontal: getCardPadding()
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: getCardWidth() - 2 * getCardPadding(),
    height: getCardWidth() - 4 * getCardPadding(),
    backgroundColor: 'white'
  },
  videoIcon: {
    width: getCardWidth() - 2 * (getCardPadding() + imagePaddingHorizontal),
    height: getCardWidth() - 2 * (getCardPadding() + imagePaddingVertical),
    backgroundColor: Colors.CATEGORY_IMAGE_BACKGROUND_GREY
  },
  videoNameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: getCardWidth() - 2 * getCardPadding(),
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
    paddingVertical: getCardPadding(),
    paddingHorizontal: getCardPadding()
  }
});

export default class Videos extends Component {

  navigateToVideo(video) {
    this.props.navigation.navigate(PAGES.PAGE_VIDEO_PLAYER, {video: video});
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
            source={video.image}
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
    for (var i = index; i < videos.length && i - index < getCardsPerRow(); i++) {
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
    for (var i = 0; i < videos.length; i += getCardsPerRow()) {
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
