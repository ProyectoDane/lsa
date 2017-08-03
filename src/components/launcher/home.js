import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';
import Categories from './../categories/categories';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});

export default class Splash extends Component {

  render() {
    return (
      <Categories
        navigation={this.props.navigation}
      />
    );
  }

}
