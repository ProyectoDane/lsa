import * as React from 'react';
import { Platform, Text, TouchableOpacity, Dimensions, View, StyleSheet } from 'react-native';
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

export default function Register(props) {
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
        <Text>REGISTRAR</Text>
          <TouchableOpacity style={styles.button} onPress={props.onEnd}>
              <Text>REGISTRAR</Text>

          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={props.onEnd}>
              <Text>ABCD</Text>

          </TouchableOpacity>

      </View>
    )

}