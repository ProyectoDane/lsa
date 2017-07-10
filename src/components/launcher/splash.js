import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';

import {PAGES} from './../../constants/'

export default class Splash extends Component {

  navigateToHome() {
    const {navigate} = this.props.navigation;
    navigate(PAGES.PAGE_HOME);
  }

  componentDidMount() {
    setTimeout(() => this.navigateToHome(), 3000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>SPLASH!</Text>
        <ActivityIndicator/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
