import * as Progress from 'react-native-progress';
import React, { PureComponent } from 'react';
import {
    Alert,
    Text,
    View,
    Image,
    FlatList,
    Dimensions,
    TouchableOpacity,
    ImageBackground,
  } from 'react-native';
  import _ from 'lodash';
  import RNFS from 'react-native-fs';
  import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
  import CATEGORIES_INDEX from './../../../../categoriesIndex';
  import { getCardWidth, getCardsPerRow, getCardPadding } from './../../../../util/layoutUtil';
  import styles from './styles';


export class CategoriesDownload extends PureComponent {

    state = { amountSelected: 0, categories: CATEGORIES_INDEX.categories.map(c => ({...c, selected: false})), showDownloadDialog: false, initialAmount: 0, modifiedAmount: 0, videosToModify: [], showBar: false, showDeleteAlert: false, showDeleteBar: false };


    _selectCategory = category => {
        const categories = [...this.state.categories];
        const foundIndex = this.state.categories.findIndex(c => c.name_es === category.name_es);
        category.selected = !category.selected;
        categories[foundIndex] = category;
        category.selected ? this.setState(prevState => ({categories, amountSelected: prevState.amountSelected + 1})) : this.setState(prevState => ({categories, amountSelected: prevState.amountSelected - 1}))
    }

    _renderCategory = (category, imagePaddingHorizontal, imagePaddingVertical) => (
    <TouchableOpacity
      onPress={() => this._selectCategory(category)}
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
           {
      category.selected &&
      <MaterialIcons
      name="check-circle"
      size={40}
      style={styles.videoIconDownload}
      color='#FFB44B'
    />
    }
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
    )

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

      _onLayout = () => {
        this.forceUpdate();
      };

      _checkVideos = videos => {
        return videos.map(video => {
          const path = `${RNFS.DocumentDirectoryPath}/${video.name}`;
          return RNFS.exists(path).then(existingFile => ({ ...video, downloaded: existingFile }));
        });
      }

      _onPressDownloadVideos = () => {
        const selectedCategories = this.state.categories.filter(c => c.selected);
        const videos = _.flatten(selectedCategories.map(c => c.videos).map(video => video.map((v => ({...v, name: v.video.split('/').pop()})))))
        Promise.all(this._checkVideos(videos)).then(result => {
            const amount = result.filter(v => !v.downloaded).length;
            this.setState({initialAmount: amount, modifiedAmount: result.length, showDownloadDialog: true, videosToModify: result.filter(v => !v.downloaded)})
        })
      }
      //TODO: Refactor this in order to not repete logic
      _onPressDeleteVideos = () => {
        const selectedCategories = this.state.categories.filter(c => c.selected);
        const videos = _.flatten(selectedCategories.map(c => c.videos).map(video => video.map((v => ({...v, name: v.video.split('/').pop()})))))
        Promise.all(this._checkVideos(videos)).then(result => {
            const amount = result.filter(v => v.downloaded).length;
            this.setState({initialAmount: amount, showDeleteAlert: true, videosToModify: result.filter(v => v.downloaded)})
        })
      }

      _downloadVideos = () => {
        Promise.all(this.state.videosToModify.map((video, index) => {
            return RNFS.downloadFile({
                fromUrl: video.video,
                toFile: `${RNFS.DocumentDirectoryPath}/${video.name}`,
            }).promise.then(() => {
                const changingVideos = [...this.state.videosToModify];
                changingVideos[index].downloaded = true;
                this.setState(prevState =>  ({
                            initialAmount: prevState.initialAmount - 1,
                            videosToModify: changingVideos  
                }))
            })
        })).then(() => {
            if (this.state.videosToModify.every(v => v.downloaded)) {
                this.setState(prevState => ({showBar: false, categories: prevState.categories.map(c => ({...c, selected: false})) }))
            }
        });
      }

      _deleteVideos = () => {
              Promise.all(this.state.videosToModify.map((video, index) => {
                const videoFile = `${RNFS.DocumentDirectoryPath}/${video.name}`
                return RNFS.unlink(videoFile).then(() =>  {
                    const changingVideos = [...this.state.videosToModify];
                    changingVideos[index].downloaded = false;
                    this.setState(prevState =>  ({
                        initialAmount: prevState.initialAmount - 1,
                        videosToModify: changingVideos  
                    }))
                })
              })).then(() => {
                  if (this.state.videosToModify.every(v => !v.downloaded)) {
                      this.setState(prevState => ({showDeleteBar: false, categories: prevState.categories.map(c => ({...c, selected: false}))}))
                  }
              })
      }
    
      render() {
        this.imagePaddingHorizontal = getCardPadding() * 2;
        this.imagePaddingVertical = getCardPadding() * 2;
        const categoriesChunks = _.chunk(this.state.categories, getCardsPerRow());
        this.rowsCount = categoriesChunks.length;
        return (
          <View style={styles.full} onLayout={this._onLayout}>
            <ImageBackground
              style={styles.full}
              imageStyle={[
                styles.backgroundImageStyle,
                { width: Dimensions.get('window').width, height: Dimensions.get('window').height },
              ]}
              source={require('./../../../../res/background/fondo-amarillo.jpg')}
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
            {
                this.state.categories.some(c => c.selected) &&
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.redButton]}
                        onPress={this._onPressDeleteVideos}
                    >
                        <Text style={[styles.textColor, styles.buttonText]}>BORRAR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.greenButton]}
                        onPress={this._onPressDownloadVideos}
                    >
                        <Text style={[styles.textColor, styles.buttonText]}>DESCARGAR</Text>
                    </TouchableOpacity>
                </View>
            }
            {
                this.state.showDownloadDialog &&
                Alert.alert(
                    'DESCARGA VIDEOS',
                    `VAS A DESCARGAR ${
                      this.state.initialAmount
                    } DE ${this.state.modifiedAmount} VIDEOS. ESTA ACCIÓN PUEDE DEMORAR UN POCO.`,
                    [
                      { text: 'CANCELAR', onPress: () => this.setState({ showDownloadDialog: false }) },
                      {
                        text: 'OK',
                        onPress: () => {
                            if (this.state.videosToModify.length) {
                                this.setState({ showDownloadDialog: false, showBar: true });
                              this._downloadVideos();
                            } else {
                                this.setState(prevState => ({ showDownloadDialog: false, categories: prevState.categories.map(c => ({...c, selected: false})) }));
                            }
                        },
                      },
                    ],
                    { cancelable: false }
                  )
            }
            {
                this.state.showDeleteAlert &&
                Alert.alert(
                    'BORRAR VIDEOS DE LA CATEGORÍA',
                    `VAS A BORRAR LOS VIDEOS DE ESTA CATEGORÍA. ESTA ACCIÓN PUEDE DEMORAR UN POCO.`,
                    [
                      { text: 'CANCELAR', onPress: () => this.setState({ showDeleteAlert: false }) },
                      {
                        text: 'OK',
                        onPress: () => {
                            if (this.state.videosToModify.length) {
                                this.setState({ showDeleteAlert: false, showDeleteBar: true });
                              this._deleteVideos();
                            } else {
                                this.setState(prevState => ({ showDeleteAlert: false, categories: prevState.categories.map(c => ({...c, selected: false})) }));
                            }
                        },
                      },
                    ],
                    { cancelable: false }
                  )
            }
            {this.state.showBar && (
            <View style={styles.headerText}>
              <Progress.Bar
                color="green"
                width={null}
                progress={this.state.videosToModify.filter(v => v.downloaded).length / this.state.videosToModify.length}
              />
              <Text style={styles.downloadText}>{`${
                this.state.videosToModify.filter(v => v.downloaded).length
              } de ${this.state.videosToModify.length}`}</Text>
            </View>
          )}
          {
              this.state.showDeleteBar && (
                <View style={styles.headerText}>
                <Progress.Bar
                  color="red"
                  width={null}
                  progress={this.state.videosToModify.filter(v => !v.downloaded).length / this.state.videosToModify.length}
                />
                <Text style={styles.downloadText}>{`${
                  this.state.videosToModify.filter(v => !v.downloaded).length
                } de ${this.state.videosToModify.length}`}</Text>
              </View>
              )
          }
          </View>
        );
      }
}