import React, { PureComponent } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import _ from 'lodash';

import CATEGORIES_INDEX from './../../categoriesIndex';
import { PAGES } from './../../constants/';
import { getCardWidth, getCardsPerRow, getCardPadding } from './../../util/layoutUtil';
import styles from './styles';
// Analytics
import firebase from 'react-native-firebase';

const Analytics = firebase.analytics();

export class Categories extends PureComponent {
  componentDidMount (){
    this._navigateToCategory= _.debounce(this._navigateToCategory.bind(this), 500);
  }
  _navigateToCategory = category => {
    const { navigation } = this.props;
    Analytics.logEvent("category_view", {category:category.name_es});
    navigation.navigate(PAGES.PAGE_CATEGORY, { category });
  };

  _renderCategory = (category, imagePaddingHorizontal, imagePaddingVertical) => (
    <TouchableOpacity
      onPress={() => this._navigateToCategory(category)}
      key={category.name_es}
      style={[
        styles.categoryContainer,
        {
          width: getCardWidth(),
          paddingVertical: getCardPadding(),
          paddingHorizontal: getCardPadding(),
        },
      ]}
    >
      <View
        style={[
          styles.imageContainer,
          {
            width: getCardWidth() - 2 * getCardPadding(),
            height: getCardWidth() - 4 * getCardPadding(),
          },
        ]}
      >
        <Image
          style={[
            styles.categoryIcon,
            {
              width: getCardWidth() - 2 * (getCardPadding() + imagePaddingHorizontal),
              height: getCardWidth() - 2 * (getCardPadding() + imagePaddingVertical),
            },
          ]}
          source={category.icon}
        />
      </View>
      <View
        style={[
          styles.categoryNameContainer,
          {
            width: getCardWidth() - 2 * getCardPadding(),
            paddingHorizontal: imagePaddingHorizontal,
          },
        ]}
      >
        <Text style={styles.categoryName}>{category.name_es}</Text>
      </View>
    </TouchableOpacity>
  );

  _keyExtractor = (item, index) => `CATEGORY${this.props.albumId}ROW${index}`;

  _renderItem = ({ item, index }) => {
    const isLastRow = index === this.rowsCount - 1;
    return (
      <View
        style={
          isLastRow
            ? [styles.lastRowContainer, { marginBottom: getCardPadding() * 2 }]
            : styles.rowContainer
        }
      >
        {item.map(itemTwo => {
          return this._renderCategory(
            itemTwo,
            this.imagePaddingHorizontal,
            this.imagePaddingVertical
          );
        })}
      </View>
    );
  };

  componentWillReceiveProps(nextProps) {
    const { dispatchCategoriesRestarted } = this.props;
    if (nextProps.shouldRestartCategories) {
      this.list.scrollToOffset({ offset: 0, animated: true });
      dispatchCategoriesRestarted();
    }
  }

  _onLayout = () => {
    this.forceUpdate();
  };

  render() {
    this.imagePaddingHorizontal = getCardPadding() * 2;
    this.imagePaddingVertical = getCardPadding() * 2;
    const categoriesChunks = _.chunk(CATEGORIES_INDEX.categories, getCardsPerRow());
    this.rowsCount = categoriesChunks.length;
    return (
      <View style={styles.full} onLayout={this._onLayout}>
        <ImageBackground
          style={styles.full}
          imageStyle={[
            styles.backgroundImageStyle,
            { width: Dimensions.get('window').width, height: Dimensions.get('window').height },
          ]}
          source={require('./../../res/background/fondo-amarillo.jpg')}
        >
          <FlatList
            ref={list => {
              this.list = list;
            }}
            style={[
              styles.categoriesViewContainer,
              { paddingVertical: getCardPadding(), paddingHorizontal: getCardPadding() },
            ]}
            removeClippedSubviews={true}
            data={categoriesChunks}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </ImageBackground>
      </View>
    );
  }
}
