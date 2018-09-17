import * as React from 'react';
import { Platform, Text, TouchableOpacity, Dimensions, View, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import { deviceIsInLandscapeMode } from '../../util/deviceUtil';
import { getTabNavigatorBarHeight } from '../../util/layoutUtil';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    video: {
        backgroundColor: 'transparent'
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
      }
})

const videoRatio = 352 / 288;
const margin = 12;

export default function VideoSplash(props) {
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
                source={{uri: 'presentacion_LSA', mainVer: 1, patchVer: 0}}
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
                onEnd={props.onEnd}
            />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={props.onEnd}>
                <Text>OMITIR</Text>

            </TouchableOpacity>

        </View>
    )

}