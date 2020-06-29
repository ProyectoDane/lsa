import React, { Component } from 'react';
import * as Progress from 'react-native-progress';
import { Platform, Text, TouchableOpacity, Dimensions, View, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import { deviceIsInLandscapeMode } from '../../util/deviceUtil';
import { getTabNavigatorBarHeight } from '../../util/layoutUtil';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    videoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: margin,
        marginBottom: margin,
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: '#FFB54C',
        alignItems: "center",
        marginTop: "auto",
        padding: 20, 
        marginHorizontal: 10, 
        marginBottom: 20
    },
    backgroundImageStyle: {
        resizeMode: Platform.OS === 'ios' ? 'repeat' : 'stretch',
    },
    loader: {
      alignItems: 'center',
      justifyContent: 'center',
      flexGrow: 1
    }
})

const videoRatio = 352 / 288;
const margin = 12;

export default class VideoSplash extends Component {
  constructor(props) {
    super(props);
    
    this.state = { isLoading: false };
  }

  onLoadStart = () => { 
    this.setState({ isLoading: true });
  }

  onReady = () => { 
    this.setState({ isLoading: false });
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
    
    return (
        <View style={styles.container}>

          { this.state.isLoading &&
            <View style={styles.loader}>
              <Progress.Circle color="#FFB54C" indeterminate/>
            </View>
          }

         <TouchableOpacity
            style={[
              styles.videoContainer,
              {
                marginHorizontal: deviceIsInLandscapeMode()
                  ? (Dimensions.get('window').width - videoWidth) / 2
                  : margin,
                width: videoWidth,
                height: videoHeight
              }
            ]}
            onPress={() => {
              if (this.video) {
                this.video.seek(0);
              }
            }}
          >
            <Video 
                ref={ref => {
                    this.video = ref;
                }}
                source={{uri: 'https://dane-videos.s3.us-east-2.amazonaws.com/presentacion_LSA.mp4'}}
                style={[
                    styles.video,
                    {
                        width: videoWidth,
                        height: videoHeight
                    }
                ]}
                rate={1}
                paused={false}
                muted
                resizeMode="contain"
                onEnd={this.props.onEnd}
                onLoadStart={this.onLoadStart}
                onReadyForDisplay={this.onReady}
            />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={this.props.onEnd}>
                <Text>OMITIR</Text>
            </TouchableOpacity>

        </View>
    )
  }
}