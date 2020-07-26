import React from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { getCardWidth, getCardPadding } from './../../util/layoutUtil';
import styles from './styles';

const imagePaddingHorizontal = getCardPadding() * 2;
const imagePaddingVertical = getCardPadding() * 2;

export const CategoryCard = ({ category, navigateToCategory }) => (
  <TouchableOpacity
    onPress={() => navigateToCategory(category)}
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
