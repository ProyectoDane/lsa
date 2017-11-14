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

const styles = StyleSheet.create({
  videoContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'white'
  },
  videoIcon: {
    backgroundColor: Colors.CATEGORY_IMAGE_BACKGROUND_GREY
  },
  videoNameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 50
  },
  videoName: {
    textAlign: 'center',
    fontFamily: 'nunito'
  },
  rowContainer: {
    flexDirection: "row"
  },
  lastRowContainer: {
    flexDirection: "row"
  },
  backgroundImageStyle: {
    resizeMode: Platform.OS === 'ios' ? 'repeat' : 'stretch'
  },
  videosScrollView: {
    flex: 1
  }
});

export default class Videos extends Component {

  navigateToVideo(video) {
    this.props.navigation.navigate(PAGES.PAGE_VIDEO_PLAYER, {video: video});
  }

  scrollToTop() {
    this.scrollView.scrollTo({x: 0, y: 0, animated: true});
  }

  renderVideo(video, imagePaddingHorizontal, imagePaddingVertical) {
    return (
      <TouchableOpacity
        onPress={() => this.navigateToVideo(video)}
        key={video.name_es}
        style={[styles.videoContainer,
          {
            width: getCardWidth(),
            paddingVertical: getCardPadding(),
            paddingHorizontal: getCardPadding()
          }
        ]}
      >
        <View style={[styles.imageContainer,
          {
            width: getCardWidth() - 2 * getCardPadding(),
            height: getCardWidth() - 4 * getCardPadding()
          }]}
        >
          <Image
            style={[styles.videoIcon,
              {
                width: getCardWidth() - 2 * (getCardPadding() + imagePaddingHorizontal),
                height: getCardWidth() - 2 * (getCardPadding() + imagePaddingVertical)
              }
            ]}
            source={video.image}
          />
        </View>
        <View style={[styles.videoNameContainer,
          {
            width: getCardWidth() - 2 * getCardPadding(),
            paddingHorizontal: imagePaddingHorizontal
          }]}
        >
          <Text style={styles.videoName}>{video.name_es}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderRow(videos, index, imagePaddingHorizontal, imagePaddingVertical) {
    let videosRow = [];
    for (var i = index; i < videos.length && i - index < getCardsPerRow(); i++) {
      videosRow.push(this.renderVideo(videos[i], imagePaddingHorizontal, imagePaddingVertical));
    }
    return (
      <View
        key={i}
        style={i === videos.length ? [styles.lastRowContainer, {marginBottom: getCardPadding() * 2}] : styles.rowContainer}
      >
        {videosRow}
      </View>
    );
  }

  onLayout() {
    this.forceUpdate();
  }

  render() {
    const imagePaddingHorizontal = getCardPadding() * 2;
    const imagePaddingVertical = getCardPadding() * 2;
    let videos = this.props.videos;
    let rows = [];
    for (var i = 0; i < videos.length; i += getCardsPerRow()) {
      rows.push(this.renderRow(videos, i, imagePaddingHorizontal, imagePaddingVertical));
    }
    return (
      <View style={{flex: 1}} onLayout={this.onLayout.bind(this)}>
        <ImageBackground
          style={{flex: 1}}
          imageStyle={[styles.backgroundImageStyle,
            {
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height
            }
          ]}
          source={this.props.background}
        >
          <ScrollView
            ref={scrollView => this.scrollView = scrollView}
            style={[styles.videosScrollView,{ paddingVertical: getCardPadding(), paddingHorizontal: getCardPadding() }]}
          >
            {rows}
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }

}
