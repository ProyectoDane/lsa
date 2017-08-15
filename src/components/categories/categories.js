import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import {deviceIsTablet} from './../../util/deviceUtil';
import {CATEGORIES_INDEX} from './categoriesIndex';
import {PAGES} from './../../constants/';

const categoriesPerRow = deviceIsTablet() ? 4 : 2;
const categoryPaddingVertical = 5;
const categoryPaddingHorizontal = 5;

const categoryWidth = Dimensions.get('window').width / categoriesPerRow;

const styles = StyleSheet.create({
  categoryContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: categoryWidth,
    paddingVertical: categoryPaddingVertical,
    paddingHorizontal: categoryPaddingHorizontal
  },
  categoryIcon: {
    width: categoryWidth - 2 * categoryPaddingHorizontal * categoriesPerRow,
    height: categoryWidth - 2 * categoryPaddingHorizontal * categoriesPerRow
  },
  categoryNameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    width: categoryWidth - 2 * categoryPaddingHorizontal * categoriesPerRow,
    height: 50,
    backgroundColor: 'white'
  },
  categoryName: {
    textAlign: 'center'
  },
  rowContainer: {
    flexDirection: "row"
  }
});

export default class Categories extends Component {

  navigateToCategory(category) {
    this.props.navigation.navigate(PAGES.PAGE_CATEGORY, {category: category});
  }

  renderCategory(category) {
    console.log("WIDTH ", Dimensions.get('window').width);
    return (
      <TouchableOpacity
        onPress={() => this.navigateToCategory(category)}
        key={category.name_es}
        style={styles.categoryContainer}
      >
        <Image
          style={styles.categoryIcon}
          source={category.icon}
        />
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
      <ScrollView style={{flex: 1}}>
        {rows}
      </ScrollView>
    );
  }

}
