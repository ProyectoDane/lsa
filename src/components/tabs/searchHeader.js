import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  TextInput,
  Platform
} from 'react-native';

const styles = StyleSheet.create({
  searchInput: {
    position: 'absolute',
    left: Dimensions.get('window').width * 0.1,
    height: 30,
    width: Dimensions.get('window').width - 125,
    paddingBottom: (Platform.OS === 'android') ? 6 : 0,
    fontSize: 14,
    backgroundColor: 'white'
  }
});

export default class SearchHeader extends Component {

  render() {
    return (
      <TextInput
        ref={r => this.searchInputRef = r}
        style={styles.searchInput}
        underlineColorAndroid={'transparent'}
        placeholder={'Buscar'}
        placeholderTextColor='#53A31888'
        autoFocus={true}
        onChangeText={(text) => this.searchVideos(text)}
      />
    );
  }

  searchVideos(searchString) {
    console.log("HOLIS");
  }

};
