import React, { Component } from 'react';
import * as Progress from 'react-native-progress';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Video from '../shared/Video';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 100,
  },
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#FFB54C',
    alignItems: 'center',
    marginTop: 'auto',
    padding: 20,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 'auto',
  },
  title: {
    fontSize: 17,
    flexGrow: 1,
    fontWeight: 'bold',
  },
});

export default class VideoSplash extends Component {
  constructor(props) {
    super(props);

    this.state = { isLoading: false };
  }

  onLoadStart = () => {
    this.setState({ isLoading: true });
  };

  onReady = () => {
    this.setState({ isLoading: false });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>VIDEO DE BIENVENIDA</Text>
        </View>
        {this.state.isLoading && (
          <View style={styles.loaderContainer}>
            <Progress.Circle color="#FFB54C" indeterminate />
          </View>
        )}

        <Video
          uri={
            'https://dane-videos.s3.us-east-2.amazonaws.com/presentacion_LSA.mp4'
          }
          onEnd={this.props.onEnd}
          onLoadStart={this.onLoadStart}
          onReady={this.onReady}
          autoPlay={true}
        />
        <TouchableOpacity style={styles.button} onPress={this.props.onEnd}>
          <Text>OMITIR</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
