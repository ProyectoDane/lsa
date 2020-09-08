/* eslint-disable react-native/no-inline-styles */
import * as Progress from 'react-native-progress';
import React, {PureComponent} from 'react';
import {View, Alert, ScrollView, Text, Modal} from 'react-native';
import ImageBackground from '../shared/ImageBackground';
import {SelectableCard} from '../shared/Card';
import List from '../shared/List';
import {BaseHeader} from '../shared/BaseHeader';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNFS from 'react-native-fs';
import {PAGES} from './../../constants';
import Colors from './../../res/colors';
import I18n from './../../res/i18n/i18n';
import {styles} from './styles';
// Analytics
import analytics from '@react-native-firebase/analytics';
const Analytics = analytics();

const categoryVideosBackground = require('./../../res/background/fondo-amarillo.jpg');
const listaSlider = [
  require('./../../res/image/1-como-se-usa.png'),
  require('./../../res/image/2-como-se-usa.png'),
  require('./../../res/image/3-como-se-usa.png'),
  require('./../../res/image/4-como-se-usa.png'),
  require('./../../res/image/5-como-se-usa.png'),
  require('./../../res/image/6-como-se-usa.png'),
];

export class Category extends PureComponent {
  static navigationOptions = ({navigation, route}) => ({
    ...BaseHeader,
    title: route.params.category.name_es,
    headerTruncatedBackTitle: '',
    //headerTruncatedBackTitle: I18n.t('back'),
    headerRight: () =>
      !route.params.categoryFull ? (
        <MaterialIcons
          name="cloud-download"
          size={30}
          style={styles.downloadIcon}
          onPress={() => navigation.setParams({showDialog: true})}
        />
      ) : (
        <MaterialIcons
          name="delete"
          size={30}
          style={styles.downloadIcon}
          onPress={() => navigation.setParams({deleteDialog: true})}
        />
      ),
  });

  state = {
    activeSlide: 0,
    downloadedVideos: 0,
    showBar: false,
    videos: [],
    initialAmount: 0,
    refresh: false,
    firstCategory: false,
  };

  _isFirstCategory = async () => {
    const isFirstCategory = await AsyncStorage.getItem('firstCategory');
    isFirstCategory === 'false'
      ? this.setState({firstCategory: false})
      : this.setState({firstCategory: true});
  };

  componentDidMount() {
    const {navigation} = this.props;
    this._isFirstCategory();
    navigation.addListener('didFocus', payload => {
      this.setState(prevState => {
        this.reload();
      });
    });
    this.reload();
  }

  reload() {
    const {navigation, route} = this.props;
    const videos = route.params.category.videos.map(video => ({
      ...video,
      name: video.video.split('/').pop(),
    }));
    Promise.all(this._checkVideos(videos)).then(result => {
      const amount = result.filter(v => !v.downloaded).length;
      const downloaded = result.filter(v => v.downloaded).length;
      if (videos.length === downloaded) {
        navigation.setParams({categoryFull: true});
      }
      this.setState({
        videos: result,
        initialAmount: amount,
        downloadedVideos: downloaded,
      });
    });
  }

  _checkVideos(videos) {
    return videos.map(video => {
      const path = `${RNFS.DocumentDirectoryPath}/${video.name}`;
      return RNFS.exists(path).then(existingFile => ({
        ...video,
        downloaded: existingFile,
      }));
    });
  }

  _deleteVideos = () => {
    const {navigation} = this.props;
    this.state.videos.forEach(video => {
      if (video.downloaded) {
        const videoFile = `${RNFS.DocumentDirectoryPath}/${video.name}`;
        RNFS.unlink(videoFile);
      }
    });
    navigation.setParams({categoryFull: false});

    this.setState({initialAmount: 0, downloadedVideos: 0});

    this.reload();
  };

  _downloadVideos = () => {
    const {navigation, route} = this.props;
    const {name_es} = route.params.category;
    this.setState({showBar: true});

    this.state.videos.forEach((video, index) => {
      if (!video.downloaded) {
        RNFS.downloadFile({
          fromUrl: video.video,
          toFile: `${RNFS.DocumentDirectoryPath}/${video.name}`,
        }).promise.then(() => {
          const changingVideos = [...this.state.videos];
          changingVideos[index].downloaded = true;
          this.setState(prevState => {
            if (
              (prevState.initialAmount === 0 &&
                changingVideos.length === prevState.downloadedVideos) ||
              (prevState.initialAmount === 1 &&
                changingVideos.length ===
                  prevState.downloadedVideos + prevState.initialAmount)
            ) {
              navigation.setParams({categoryFull: true});
              Analytics.logEvent('category_download', {category: name_es});
              return {
                downloadedVideos: changingVideos.length,
                initialAmount: 0,
                showBar: false,
              };
            }
            return {
              downloadedVideos: prevState.downloadedVideos + 1,
              initialAmount: prevState.initialAmount - 1,
              videos: changingVideos,
            };
          });
        });
      } else {
        this.setState(prevState => ({
          downloadedVideos: prevState.downloadedVideos + 1,
          initialAmount: prevState.initialAmount - 1,
        }));
      }
    });
  };
  _onLayout = () => this.forceUpdate();
  _onChangeSlide = ({nativeEvent}) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    if (slide !== this.state.activeSlide) {
      this.setState({activeSlide: slide});
    }
  };
  _onCloseModal = async () => {
    await AsyncStorage.setItem('firstCategory', 'false');
    this.setState({firstCategory: false});
  };
  _getTutorialLayout = () => {
    return (
      <View style={styles.full} onLayout={this._onLayout}>
        <Modal
          visible={this.state.firstCategory}
          onRequestClose={this._onCloseModal}>
          <ScrollView
            horizontal
            pagingEnabled
            onScroll={this._onChangeSlide}
            showsHorizontalScrollIndicator={false}
            style={styles.image}>
            {listaSlider.map((i, k) => (
              <ImageBackground src={i} style={styles.image} key={k} />
            ))}
          </ScrollView>
          <View style={styles.iconStyle}>
            <Ionicons
              name="ios-close-outline"
              size={70}
              style={{color: '#fff'}}
              onPress={this._onCloseModal}
            />
          </View>
          <View style={styles.buttonModal}>
            {listaSlider.map((i, k) => (
              <Text
                style={
                  k === this.state.activeSlide
                    ? styles.activeCircle
                    : styles.inactiveCircle
                }
                key={k}>
                ⬤
              </Text>
            ))}
          </View>
        </Modal>
      </View>
    );
  };

  _navigateToVideo(video) {
    const {navigation} = this.props;
    navigation.navigate(PAGES.PAGE_VIDEO_PLAYER, {video});
  }

  _renderVideo = ({item}) => (
    <SelectableCard
      key={item.name_es}
      onPress={() => this._navigateToVideo(item)}
      src={item.image}
      name={item.name_es}
      selected={item.downloaded}
      color={'#1AA299'}
    />
  );

  render() {
    const {navigation, route} = this.props;
    const params = route.params;
    const videosAmount = params.category.videos.length;
    const amount = videosAmount - this.state.initialAmount;
    return this.state.firstCategory ? (
      this._getTutorialLayout()
    ) : (
      <View style={styles.full} onLayout={this._onLayout}>
        <ImageBackground src={categoryVideosBackground}>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: Colors.TAB_BAR_ACTIVE_ICON,
            }}>
            <Text style={styles.headerText}>
              {amount} VIDEOS DESCARGADOS DE {videosAmount}
            </Text>
          </View>
          <List renderItem={this._renderVideo} data={this.state.videos} />
          {params.showDialog &&
            Alert.alert(
              'DESCARGA VIDEOS',
              `VAS A DESCARGAR ${
                this.state.initialAmount
              } DE ${videosAmount} VIDEOS. ESTA ACCIÓN PUEDE DEMORAR.`,
              [
                {
                  text: 'CANCELAR',
                  onPress: () => navigation.setParams({showDialog: false}),
                },
                {
                  text: 'OK',
                  onPress: () => {
                    navigation.setParams({showDialog: false});
                    this._downloadVideos();
                  },
                },
              ],
              {cancelable: false},
            )}
          {params.deleteDialog &&
            Alert.alert(
              'BORRAR VIDEOS DE LA CATEGORÍA',
              'VAS A BORRAR LOS VIDEOS DE ESTA CATEGORÍA. ESTA ACCIÓN PUEDE DEMORAR.',
              [
                {
                  text: 'CANCELAR',
                  onPress: () => navigation.setParams({deleteDialog: false}),
                },
                {
                  text: 'OK',
                  onPress: () => {
                    navigation.setParams({deleteDialog: false});
                    this._deleteVideos();
                  },
                },
              ],
              {cancelable: false},
            )}
          {this.state.showBar && (
            <View>
              <Progress.Bar
                color="green"
                width={null}
                progress={this.state.downloadedVideos / videosAmount}
              />
              <Text style={styles.downloadText}>{`${
                this.state.downloadedVideos
              } de ${videosAmount}`}</Text>
            </View>
          )}
        </ImageBackground>
      </View>
    );
  }
}
