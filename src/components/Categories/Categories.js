import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { connect } from 'react-redux';

import { CATEGORIES_INDEX } from './categoriesIndex';
import { PAGES } from './../../constants/';
import { getCardWidth, getCardsPerRow, getCardPadding } from './../../util/layoutUtil';
import { categoriesRestarted } from './../../actions/restartPage';
import styles from './styles';

class Categories extends Component {

  navigateToCategory(category) {
    this.props.navigation.navigate(PAGES.PAGE_CATEGORY, {category: category});
  }

  renderCategory(category, imagePaddingHorizontal, imagePaddingVertical) {
    return (
      <TouchableOpacity
        onPress={() => this.navigateToCategory(category)}
        key={category.name_es}
        style={[styles.categoryContainer,
          {
            width: getCardWidth(),
            paddingVertical: getCardPadding(),
            paddingHorizontal: getCardPadding()
          }
        ]}
      >
        <View style={[styles.imageContainer,
          {
            width: getCardWidth() - 2 * getCardPadding(),
            height: getCardWidth() - 4 * getCardPadding()
          }]}
        >
          <Image
            style={[styles.categoryIcon,
              {
                width: getCardWidth() - 2 * (getCardPadding() + imagePaddingHorizontal),
                height: getCardWidth() - 2 * (getCardPadding() + imagePaddingVertical)
              }
            ]}
            source={category.icon}
          />
        </View>
        <View style={[styles.categoryNameContainer,
          {
            width: getCardWidth() - 2 * getCardPadding(),
            paddingHorizontal: imagePaddingHorizontal
          }]}
        >
          <Text style={styles.categoryName}>{category.name_es}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderRow(categories, index, imagePaddingHorizontal, imagePaddingVertical) {
    let categoriesRow = [];
    for (var i = index; i < categories.length && i - index < getCardsPerRow(); i++) {
      categoriesRow.push(this.renderCategory(categories[i], imagePaddingHorizontal, imagePaddingVertical));
    }
    return (
      <View
        key={i}
        style={i === categories.length ? [styles.lastRowContainer, {marginBottom: getCardPadding() * 2}] : styles.rowContainer}
      >
        {categoriesRow}
      </View>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldRestartCategories) {
      this.scrollView.scrollTo({x: 0, y: 0, animated: true});
      this.props.dispatchCategoriesRestarted();
    }
  }

  onLayout() {
    this.forceUpdate();
  }

  render() {
    const imagePaddingHorizontal = getCardPadding() * 2;
    const imagePaddingVertical = getCardPadding() * 2;
    let categories = CATEGORIES_INDEX.categories;
    let rows = [];
    for (var i = 0; i < categories.length; i += getCardsPerRow()) {
      rows.push(this.renderRow(categories, i, imagePaddingHorizontal, imagePaddingVertical));
    }
    return (
      <View style={{flex: 1}} onLayout={this.onLayout.bind(this)}>
        <ImageBackground
          style={{flex: 1}}
          imageStyle={[styles.backgroundImageStyle, {width: Dimensions.get('window').width, height: Dimensions.get('window').height}]}
          source={require('./../../res/background/fondo-amarillo.jpg')}
        >
          <ScrollView
            ref={scrollView => this.scrollView = scrollView}
            style={[styles.categoriesViewContainer, {paddingVertical: getCardPadding(), paddingHorizontal: getCardPadding()}]}
          >
            {rows}
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }

}

function mapStateToProps (state) {
  return {
    shouldRestartCategories: state.restartPage.shouldRestartCategories
  };
}

function mapDispatchToProps (dispatch) {
  return {
    dispatchCategoriesRestarted: () => dispatch(categoriesRestarted())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Categories);
