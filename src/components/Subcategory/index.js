import * as Progress from 'react-native-progress';
import React, { PureComponent } from 'react';
import {
  View,
  Alert,
  Text,
  Modal,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import { HeaderBackButton } from '@react-navigation/elements';
import ImageBackground from '../shared/ImageBackground';
import { SelectableCard } from '../shared/Card';
import List from '../shared/List';
import { BaseHeader } from '../shared/BaseHeader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RNFS from 'react-native-fs';
import { PAGES } from './../../constants';
import { styles } from './styles';

// Analytics
import analytics from '@react-native-firebase/analytics';
const Analytics = analytics();

const categoryVideosBackground = require('./../../res/background/fondo-amarillo.jpg');

export class Subcategory extends PureComponent {
  static navigationOptions = ({ navigation, route }) => ({
    ...BaseHeader,
    title: route.params.subcategory
      ? route.params.subcategory
      : route.params.category.name_es,
    headerTruncatedBackTitle: '',
    headerLeft: props => {
      const { subcategory } = route.params;
      const button = subcategory ? (
        <HeaderBackButton {...props} onPress={() => navigation.goBack()} />
      ) : (
        <HeaderBackButton
          {...props}
          onPress={() => {
            navigation.pop();
            navigation.goBack();
          }}
        />
      );
      return button;
    },
    headerRight: () => {
      const icon = !route.params.categoryFull ? (
        <MaterialIcons
          name="cloud-download"
          size={30}
          style={styles.downloadIcon}
          onPress={() => navigation.setParams({ showDialog: true })}
        />
      ) : (
        <MaterialIcons
          name="delete"
          size={30}
          style={styles.downloadIcon}
          onPress={() => navigation.setParams({ deleteDialog: true })}
        />
      );

      return icon;
    },
  });

  state = {
    downloadedVideos: 0,
    showBar: false,
    videos: [],
    initialAmount: 0,
    refresh: false,
    showDownloadModal: false,
  };

  componentDidMount() {
    this.props.navigation.addListener('focus', payload => {
      this.reload();
    });
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    this.reload();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick = () => {
    const { navigation, route } = this.props;
    if (route.params.subcategory) navigation.goBack(null);
    else {
      navigation.pop();
      navigation.goBack();
    }
    return true;
  };

  reload() {
    const { navigation, route } = this.props;
    const videos = route.params.category.videos
      .map(video => ({
        ...video,
        name: video.video.split('/').pop(),
      }))
      .filter(video => video.subcategory === route.params.subcategory);
    Promise.all(this._checkVideos(videos)).then(result => {
      const amount = result.filter(v => !v.downloaded).length;
      const downloaded = result.filter(v => v.downloaded).length;
      if (videos.length === downloaded) {
        navigation.setParams({ categoryFull: true });
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
    const { navigation } = this.props;
    this.state.videos.forEach(video => {
      if (video.downloaded) {
        const videoFile = `${RNFS.DocumentDirectoryPath}/${video.name}`;
        RNFS.unlink(videoFile);
      }
    });
    navigation.setParams({ categoryFull: false });

    this.setState({ initialAmount: 0, downloadedVideos: 0 });

    this.reload();
  };

  _downloadVideos = () => {
    const { navigation, route } = this.props;
    const { name_es } = route.params.category;
    this.setState({ showBar: true });

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
              navigation.setParams({ categoryFull: true });
              Analytics.logEvent('category_download', { category: name_es });
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

  _navigateToVideo(video) {
    const { navigation } = this.props;
    navigation.navigate(PAGES.PAGE_VIDEO_PLAYER, { video });
  }

  _renderVideo = ({ item }) => (
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
    const { videos, downloadedVideos, initialAmount } = this.state;
    const { navigation, route } = this.props;
    const { params } = route;

    return (
      <View style={styles.full} onLayout={this._onLayout}>
        <ImageBackground src={categoryVideosBackground}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>
              {downloadedVideos} VIDEOS DESCARGADOS DE {videos.length}
            </Text>
          </View>
          <List renderItem={this._renderVideo} data={this.state.videos} />

          {params.showDialog && (
            <Modal transparent={true} visible={true}>
              <View style={styles.opacityModal}>
                <View style={styles.modalMessageDownload}>
                  <Text style={styles.textBoldModal}>DESCARGA VIDEOS</Text>
                  <Text style={styles.textNormalModal}>
                    VAS A DESCARGAR {initialAmount} DE {videos.length} VIDEOS.
                  </Text>
                  <Text style={styles.textNormalModal}>
                    ESTA ACCION PUEDE DEMORAR Y LA DESCARGA DE LOS VIDEOS SERÁ
                    INTERRUMPIDA SI SE CIERRA LA APLICACION.
                  </Text>
                  <View style={styles.buttonPosition}>
                    <TouchableOpacity
                      style={styles.buttonCancel}
                      onPress={() => {
                        navigation.setParams({ showDialog: false });
                      }}
                    >
                      <Text style={styles.textButton}>CANCEL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.buttonOk}
                      onPress={() => {
                        navigation.setParams({ showDialog: false });
                        this._downloadVideos();
                      }}
                    >
                      <Text style={styles.textButton}>OK</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          )}

          {params.deleteDialog &&
            Alert.alert(
              'BORRAR VIDEOS DE LA CATEGORÍA',
              'VAS A BORRAR LOS VIDEOS DE ESTA CATEGORÍA. ESTA ACCIÓN PUEDE DEMORAR.',
              [
                {
                  text: 'CANCELAR',
                  onPress: () => navigation.setParams({ deleteDialog: false }),
                },
                {
                  text: 'OK',
                  onPress: () => {
                    navigation.setParams({ deleteDialog: false });
                    this._deleteVideos();
                  },
                },
              ],
              { cancelable: false },
            )}
          {this.state.showBar && (
            <View>
              <Progress.Bar
                color="green"
                width={null}
                progress={downloadedVideos / videos.length}
              />
              <Text
                style={styles.downloadText}
              >{`${downloadedVideos} de ${videos.length}`}</Text>
            </View>
          )}
        </ImageBackground>
      </View>
    );
  }
}
