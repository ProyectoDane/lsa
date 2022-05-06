import React, {useState} from 'react';
import {TouchableOpacity, Image, Dimensions, StyleSheet} from 'react-native';
import NativeVideo from 'react-native-video';

const margin = 12;
const playIconSize = 100;

const styles = StyleSheet.create({
  videoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: margin,
    marginBottom: margin,
    backgroundColor: 'white',
  },
  video: {
    //backgroundColor: 'transparent',
  },
  playIcon: {
    height: playIconSize,
    width: playIconSize,
  },
});

const playIcon = require('../../res/icon/play-icon.png');
const videoRatio = 352 / 288;

export default function Video({uri, onEnd, onLoadStart, onReady, autoPlay}) {
  const [paused, setPaused] = useState(!autoPlay);
  const videoRef = null;

  const _onEnd = () => {
    onEnd && onEnd();
  };

  const _onLoadStart = () => {
    onLoadStart && onLoadStart();
  };

  const _onReady = () => {
    onReady && onReady();
  };

  const videoWidth = Dimensions.get('window').width - 2 * margin;
  const videoHeight = Math.round(videoWidth / videoRatio);

  return (
    <TouchableOpacity
      style={[
        styles.videoContainer,
        {
          marginHorizontal: margin,
          width: videoWidth,
          height: videoHeight,
        },
      ]}
      onPress={() => {
        videoRef?.seek(0);
        setPaused(!paused);
      }}>
      {paused ? (
        <Image style={styles.playIcon} source={playIcon} />
      ) : (
        <NativeVideo
          ref={videoRef}
          source={{uri}}
          style={[
            styles.video,
            {
              width: videoWidth,
              height: videoHeight,
            },
          ]}
          rate={1}
          paused={paused}
          muted
          resizeMode="contain"
          repeat={true}
          onEnd={_onEnd}
          onLoadStart={_onLoadStart}
          onReadyForDisplay={_onReady}
        />
      )}
    </TouchableOpacity>
  );
}
