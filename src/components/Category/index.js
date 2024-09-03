import React, { PureComponent } from 'react';
import { View, ScrollView, Text, Modal, TouchableOpacity } from 'react-native';
import ImageBackground from '../shared/ImageBackground';
import { BaseHeader } from '../shared/BaseHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import List from '../shared/List';
import { PAGES } from './../../constants';
import { styles } from './styles';
import { CloseButton } from '../shared/Buttons';

const categoryVideosBackground = require('./../../res/background/fondo-amarillo.jpg');
const listaSlider = [
  require('./../../res/wizard-ios/1-text.jpg'),
  require('./../../res/wizard-ios/2-text.jpg'),
  require('./../../res/wizard-ios/3-text.jpg'),
  require('./../../res/wizard-ios/4-text.jpg'),
  require('./../../res/wizard-ios/5-text.jpg'),
  require('./../../res/wizard-ios/6-text.jpg'),
];

export class Category extends PureComponent {
  static navigationOptions = ({ route }) => ({
    ...BaseHeader,
    title: route.params.category.name_es,
    headerTruncatedBackTitle: '',
  });

  state = {
    activeSlide: 0,
    firstCategory: false,
    subcategories: [],
  };

  _isFirstCategory = async () => {
    const isFirstCategory = await AsyncStorage.getItem('firstCategory');
    if (isFirstCategory === 'false') {
      this.setState({ firstCategory: false });
      this._hasNoSubcategories();
    } else this.setState({ firstCategory: true });
  };

  _hasNoSubcategories = () => {
    const { navigation, route } = this.props;
    const { category } = route.params;

    if (category.hasSubcategories) {
      const subs = category.videos.map(v => v.subcategory);
      const uniques = [...new Set(subs)];
      this.setState({ subcategories: uniques });
    } else navigation.navigate(PAGES.PAGE_SUBCATEGORY, { category });
  };

  componentDidMount() {
    this._isFirstCategory();
  }
  _onLayout = () => this.forceUpdate();

  _onChangeSlide = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    if (slide !== this.state.activeSlide) {
      this.setState({ activeSlide: slide });
    }
  };

  _onCloseModal = async () => {
    await AsyncStorage.setItem('firstCategory', 'false');
    this.setState({ firstCategory: false });
    this._hasNoSubcategories();
  };

  _getTutorialLayout = () => (
    <View style={styles.full} onLayout={this._onLayout}>
      <Modal style={styles.categoryModal} onRequestClose={this._onCloseModal}>
        <View style={styles.categoryScrollContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            onScroll={this._onChangeSlide}
            showsHorizontalScrollIndicator={false}
          >
            {listaSlider.map((i, k) => (
              <ImageBackground
                src={i}
                style={styles.sliderImage}
                key={k}
                resizeMode="contain"
              />
            ))}
          </ScrollView>
        </View>
        <View style={styles.sliderButtonsContainer}>
          <View style={styles.sliderButtons}>
            {listaSlider.map((i, k) => (
              <Text
                style={
                  k === this.state.activeSlide
                    ? styles.activeCircle
                    : styles.inactiveCircle
                }
                key={k}
              >
                ⬤
              </Text>
            ))}
          </View>
        </View>
        <View style={styles.categoryCloseButtonContainer}>
          <CloseButton onPress={this._onCloseModal} text="Saltar Intro" />
        </View>
      </Modal>
    </View>
  );

  _renderSubCategories = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() =>
        this._navigateToSubcategory(this.props.route.params.category, item)
      }
    >
      <View>
        <Text>{item}</Text>
      </View>
    </TouchableOpacity>
  );

  _navigateToSubcategory(category, subcategory) {
    const { navigation } = this.props;
    navigation.navigate(PAGES.PAGE_SUBCATEGORY, { category, subcategory });
  }

  render() {
    const { subcategories } = this.state;

    return this.state.firstCategory ? (
      this._getTutorialLayout()
    ) : (
      <View style={styles.full} onLayout={this._onLayout}>
        <ImageBackground src={categoryVideosBackground}>
          <List
            renderItem={this._renderSubCategories}
            data={subcategories}
            columns={1}
          />
        </ImageBackground>
      </View>
    );
  }
}
