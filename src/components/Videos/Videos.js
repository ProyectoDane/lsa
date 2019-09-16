import React, { PureComponent } from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native';
import _ from 'lodash';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PAGES } from './../../constants/';
import { getCardWidth, getCardsPerRow, getCardPadding } from './../../util/layoutUtil';

import styles from './styles';

export class Videos extends PureComponent {
  navigateToVideo(video) {
    const { navigation } = this.props;
    navigation.navigate(PAGES.PAGE_VIDEO_PLAYER, { video });
  }

  scrollToTop = () => this.list.scrollToOffset({ offset: 0, animated: true });

  _renderVideo = (video, imagePaddingHorizontal, imagePaddingVertical) => (
    <TouchableOpacity
      onPress={() => this.navigateToVideo(video)}
      key={video.name_es}
      style={[
        styles.videoContainer,
        {
          width: getCardWidth(),
          paddingVertical: getCardPadding(),
          paddingHorizontal: getCardPadding(),
        },
      ]}
    >
     
      <View
        style={[
          styles.imageContainer,
          {
            width: getCardWidth() - 2 * getCardPadding(),
            height: getCardWidth() - 4 * getCardPadding(),
          },
        ]}
      >
         {
      video.downloaded &&
      <Ionicons
      name="ios-arrow-dropdown-circle"
      size={26}
      style={styles.videoIconDownload}
      color='green'
    />
    }
        <Image
          style={[
            styles.videoIcon,
            {
              width: getCardWidth() - 2 * (getCardPadding() + imagePaddingHorizontal),
              height: getCardWidth() - 2 * (getCardPadding() + imagePaddingVertical),
            },
          ]}
          source={video.image}
        />
      </View>
      <View
        style={[
          styles.videoNameContainer,
          {
            width: getCardWidth() - 2 * getCardPadding(),
            paddingHorizontal: imagePaddingHorizontal,
          },
        ]}
      >
        <Text style={styles.videoName}>{video.name_es}</Text>
      </View>
    </TouchableOpacity>
  );

  _renderItem = ({ item, index }) => {
    const isLastRow = index === this.rowsCount - 1;
    return (
      <View
        style={
          isLastRow
            ? [styles.lastRowContainer, { marginBottom: getCardPadding() * 2 }]
            : styles.rowContainer
        }
      >
        {item.map(itemTwo => {
          return this._renderVideo(itemTwo, this.imagePaddingHorizontal, this.imagePaddingVertical);
        })}
      </View>
    );
  };

  _onLayout = () => this.forceUpdate();

  _keyExtractor = (item, index) => `VIDEO${this.props.albumId}ROW${index}`;

  render() {
    const { videos, background } = this.props;
    this.imagePaddingHorizontal = getCardPadding() * 2;
    this.imagePaddingVertical = getCardPadding() * 2;

    const videosChunks = _.chunk(videos, getCardsPerRow());
    this.rowsCount = videosChunks.length;
    return (
      <View style={styles.full} onLayout={this._onLayout}>
        <ImageBackground
          style={styles.full}
          imageStyle={[
            styles.backgroundImageStyle,
            {
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
            },
          ]}
          source={background}
        >
          <FlatList
            ref={list => {
              this.list = list;
            }}
            style={[
              styles.videosViewContainer,
              { paddingVertical: getCardPadding(), paddingHorizontal: getCardPadding() },
            ]}
            data={videosChunks}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </ImageBackground>
      </View>
    );
  }
}
