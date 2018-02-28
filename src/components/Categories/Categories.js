import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import CATEGORIES_INDEX from './../../categoriesIndex';
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

  _keyExtractor = (item, index) => `CATEGORY${this.props.albumId}ROW${index}`;

  _renderItem = ({item, index}) => {
    const isLastRow = index === this.rowsCount - 1;
    return (
      <View
        style={isLastRow ? [styles.lastRowContainer, {marginBottom: getCardPadding() * 2}] : styles.rowContainer}
      >
        {
          item.map((item, index) => {
            return this.renderCategory(item, this.imagePaddingHorizontal, this.imagePaddingVertical);
          })
        }
      </View>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldRestartCategories) {
      this.list.scrollToOffset({offset: 0, animated: true});
      this.props.dispatchCategoriesRestarted();
    }
  }

  onLayout() {
    this.forceUpdate();
  }

  render() {
    this.imagePaddingHorizontal = getCardPadding() * 2;
    this.imagePaddingVertical = getCardPadding() * 2;
    let categoriesChunks = _.chunk(CATEGORIES_INDEX.categories, getCardsPerRow());
    this.rowsCount = categoriesChunks.length;
    return (
      <View style={{flex: 1}} onLayout={this.onLayout.bind(this)}>
        <ImageBackground
          style={{flex: 1}}
          imageStyle={[styles.backgroundImageStyle, {width: Dimensions.get('window').width, height: Dimensions.get('window').height}]}
          source={require('./../../res/background/fondo-amarillo.jpg')}
        >
          <FlatList
            ref={list => this.list = list}
            style={[styles.categoriesViewContainer, {paddingVertical: getCardPadding(), paddingHorizontal: getCardPadding()}]}
            data={categoriesChunks}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
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
