import React, { PureComponent } from 'react';
import { View, FlatList, Dimensions, ImageBackground } from 'react-native';
import _ from 'lodash';

import CATEGORIES_INDEX from './../../categoriesIndex';
import { PAGES } from './../../constants/';
import { getCardsPerRow, getCardPadding } from './../../util/layoutUtil';
import { CategoryCard } from './CategoryCard';
import styles from './styles';
// Analytics
import firebase from 'react-native-firebase';

const fondoAmarillo = require('./../../res/background/fondo-amarillo.jpg');

const Analytics = firebase.analytics();

export class Categories extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      categoriesChunks: this._getCategoriesChunks(),
    };
  }

  componentDidMount() {
    Dimensions.addEventListener('change', () => {
      this.setState({
        categoriesChunks: this._getCategoriesChunks(),
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    const { dispatchCategoriesRestarted } = this.props;
    if (nextProps.shouldRestartCategories) {
      this.list.scrollToOffset({ offset: 0, animated: true });
      dispatchCategoriesRestarted();
    }
  }

  _getCategoriesChunks() {
    return _.chunk(CATEGORIES_INDEX.categories, getCardsPerRow());
  }

  _navigateToCategory = _.debounce(category => {
    const { navigation } = this.props;
    Analytics.logEvent('category_view', { category: category.name_es });
    navigation.navigate(PAGES.PAGE_CATEGORY, { category });
  }, 500);

  _keyExtractor = (item, index) => `CATEGORY${this.props.albumId}ROW${index}`;

  _renderRow = ({ item, index }) => {
    const isLastRow = index === this.state.categoriesChunks.length - 1;
    return (
      <View
        style={
          isLastRow
            ? [styles.lastRowContainer, { marginBottom: getCardPadding() * 2 }]
            : styles.rowContainer
        }
      >
        {item.map(category => (
          <CategoryCard
            category={category}
            navigateToCategory={this._navigateToCategory}
            key={category.name_es}
          />
        ))}
      </View>
    );
  };

  render() {
    return (
      <View
        style={styles.full}
        onLayout={() => {
          this.forceUpdate();
        }}
      >
        <ImageBackground
          style={styles.full}
          imageStyle={[
            styles.backgroundImageStyle,
            { width: Dimensions.get('window').width, height: Dimensions.get('window').height },
          ]}
          source={fondoAmarillo}
        >
          <FlatList
            ref={list => {
              this.list = list;
            }}
            style={[
              styles.categoriesViewContainer,
              { paddingVertical: getCardPadding(), paddingHorizontal: getCardPadding() },
            ]}
            removeClippedSubviews
            data={this.state.categoriesChunks}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderRow}
          />
        </ImageBackground>
      </View>
    );
  }
}
