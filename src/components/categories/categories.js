import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Platform
} from 'react-native';

import {deviceIsTablet} from './../../util/deviceUtil';
import {CATEGORIES_INDEX} from './categoriesIndex';
import {PAGES} from './../../constants/';
import Colors from './../../res/colors';

const categoriesPerRow = deviceIsTablet() ? 4 : 2;
const categoryPaddingVertical = 6;
const categoryPaddingHorizontal = 6;
const imagePaddingHorizontal = categoryPaddingHorizontal * 2;
const imagePaddingVertical = categoryPaddingVertical * 2;

const categoryWidth = (Dimensions.get('window').width - 2 * categoryPaddingHorizontal) / categoriesPerRow;

const styles = StyleSheet.create({
  categoryContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: categoryWidth,
    paddingVertical: categoryPaddingVertical,
    paddingHorizontal: categoryPaddingHorizontal
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: categoryWidth - 2 * categoryPaddingHorizontal,
    height: categoryWidth - 4 * categoryPaddingVertical,
    backgroundColor: 'white'
  },
  categoryIcon: {
    width: categoryWidth - 2 * (categoryPaddingHorizontal + imagePaddingHorizontal),
    height: categoryWidth - 2 * (categoryPaddingVertical + imagePaddingVertical),
    backgroundColor: Colors.CATEGORY_IMAGE_BACKGROUND_GREY
  },
  categoryNameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: categoryWidth - 2 * categoryPaddingHorizontal,
    paddingHorizontal: imagePaddingHorizontal,
    backgroundColor: 'white',
    height: 50
  },
  categoryName: {
    textAlign: 'center'
  },
  rowContainer: {
    flexDirection: "row"
  },
  backgroundImageStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: Platform.OS === 'ios' ? 'repeat' : 'stretch'
  },
  categoriesViewContainer: {
    flex: 1,
    paddingVertical: categoryPaddingVertical,
    paddingHorizontal: categoryPaddingHorizontal
  }
});

export default class Categories extends Component {

  navigateToCategory(category) {
    this.props.navigation.navigate(PAGES.PAGE_CATEGORY, {category: category});
  }

  renderCategory(category) {
    return (
      <TouchableOpacity
        onPress={() => this.navigateToCategory(category)}
        key={category.name_es}
        style={styles.categoryContainer}
      >
        <View style={styles.imageContainer} >
          <Image
            style={styles.categoryIcon}
            source={category.icon}
          />
        </View>
        <View style={styles.categoryNameContainer}>
          <Text style={styles.categoryName}>{category.name_es}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderRow(categories, index) {
    let categoriesRow = [];
    for (var i = index; i < categories.length && i - index < categoriesPerRow; i++) {
      categoriesRow.push(this.renderCategory(categories[i]));
    }
    return (
      <View
        key={i}
        style={styles.rowContainer}
      >
        {categoriesRow}
      </View>
    );
  }

  render() {
    let categories = CATEGORIES_INDEX.categories;
    let rows = [];
    for (var i = 0; i < categories.length; i += categoriesPerRow) {
      rows.push(this.renderRow(categories, i));
    }
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          style={{flex: 1}}
          imageStyle={styles.backgroundImageStyle}
          source={require('./../../res/background/fondo-amarillo.jpg')}
        >
          <ScrollView style={styles.categoriesViewContainer}>
            {rows}
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }

}
