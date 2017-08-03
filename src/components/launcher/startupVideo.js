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
    backgroundColor: 'red'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});

export default class StartupVideo extends Component {

  navigateToHome() {
    const {navigate} = this.props.navigation;
    navigate(PAGES.PAGE_HOME);
  }

  persistStartupVideoShown = async () => {
    try {
      await AsyncStorage.setItem(StorageKeys.STARTUP_VIDEO_SHOWN, 'true');
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.persistStartupVideoShown().done();
    setTimeout(() => this.navigateToHome(), 500);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>VIDEO!</Text>
        <ActivityIndicator />
      </View>
    );
  }
}
