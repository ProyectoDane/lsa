import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';
import StorageKeys from './../../util/storageKeys';

import {PAGES} from './../../constants/';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontFamily: 'nunito'
  }
});

export default class Splash extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startupVideoShown: false
    };
    this.loadInitialState().done();
  }

  navigateToHome() {
    const {navigate} = this.props.navigation;
    navigate(PAGES.PAGE_HOME);
  }

  navigateToStartupVideo() {
    const {navigate} = this.props.navigation;
    navigate(PAGES.STARTUP_VIDEO);
  }

  loadInitialState = async () => {
    try {
      const startupVideoShown = await AsyncStorage.getItem(StorageKeys.STARTUP_VIDEO_SHOWN);
      if (startupVideoShown !== null) {
        this.setState({startupVideoShown: true});
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.state.startupVideoShown) {
        this.navigateToHome();
      } else {
        this.navigateToStartupVideo();
      }
    }, 500);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>SPLASH!</Text>
        <ActivityIndicator />
      </View>
    );
  }
}
