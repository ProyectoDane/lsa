import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Videos from './videos';
import Colors from './../../res/colors';

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    flex: 1
  },
  title: {
    textAlign: 'center',
    fontSize: 20
  }
});

export default class Category extends Component {

  static navigationOptions = ({navigation, screenProps}) => ({
    headerTintColor: Colors.THEME_SECONDARY,
    headerStyle: {
      backgroundColor: Colors.THEME_PRIMARY,
      elevation: 0
    }
  });

  render() {
    const {params} = this.props.navigation.state;
    return (
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{params.category.name_es}</Text>
        <Videos
          navigation={this.props.navigation}
          videos={params.category.videos}
        />
      </View>
    );
  }

}
