/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-array-index-key */
import * as Progress from 'react-native-progress';
import React, { PureComponent } from 'react';
import { AsyncStorage, View, Alert, ScrollView, Text, Dimensions, ImageBackground, Image, Modal } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNFS from 'react-native-fs';
import Videos from './../Videos';
import Colors from './../../res/colors';
import { styles } from './styles';
// Analytics
import firebase from 'react-native-firebase';

const Analytics = firebase.analytics();

const categoryVideosBackground = require('./../../res/background/fondo-amarillo.jpg');

export class Category extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.category.name_es,
    headerTintColor: Colors.THEME_SECONDARY,
    headerBackTitle: null,
    headerTitleStyle: {
      fontFamily: 'nunito',
    },
    headerStyle: {
      backgroundColor: Colors.THEME_PRIMARY,
      elevation: 0,
      borderBottomWidth: 1,
      borderBottomColor: Colors.TAB_BAR_ACTIVE_ICON,
    },
    headerRight:
      !navigation.state.params.categoryFull || navigation.state.params.categoryFull == undefined ? (
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
      ),
  });

  state = { activeSlide: 0, downloadedVideos: 0, showBar: false, videos: [], initialAmount: 0, refresh: false, firstCategory: false };

  _isFirstCategory = async() => {
    const isFirstCategory = await AsyncStorage.getItem('firstCategory');
    isFirstCategory === 'false' ? this.setState({firstCategory: false }) : this.setState({firstCategory: true});
  }

  componentDidMount() {
    const { navigation } = this.props;
    this._isFirstCategory();
    navigation.addListener('didFocus', payload => {
      this.setState(prevState => {
        this.reload();
      });
    });
    this.reload();
  }

  reload() {
    const { navigation } = this.props;
    const videos = navigation.state.params.category.videos.map(video => ({
      ...video,
      name: video.video.split('/').pop(),
    }));
    // RNFS.getFSInfo().then(result => console.log(result));
    Promise.all(this._checkVideos(videos)).then(result => {
      const amount = result.filter(v => !v.downloaded).length;
      const downloaded = result.filter(v => v.downloaded).length;
      if (videos.length === downloaded) {
        navigation.setParams({ categoryFull: true });
      }
      this.setState({ videos: result, initialAmount: amount, downloadedVideos: downloaded });
    });
  }

  _checkVideos(videos) {
    return videos.map(video => {
      const path = `${RNFS.DocumentDirectoryPath}/${video.name}`;
      return RNFS.exists(path).then(existingFile => ({ ...video, downloaded: existingFile }));
    });
  }

  _deleteVideos = () => {
    const { navigation } = this.props;
    const { name_es } = navigation.state.params.category;
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
    const { navigation } = this.props;
    const { name_es } = navigation.state.params.category;
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
                changingVideos.length === prevState.downloadedVideos ||
                prevState.initialAmount === 1 &&
                changingVideos.length === prevState.downloadedVideos+prevState.initialAmount)
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
  _onChangeSlide = ({nativeEvent}) => {
    const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    if (slide !== this.state.activeSlide) {
      this.setState({activeSlide: slide})
    } 
  }
  _onCloseModal = async() => {
    await AsyncStorage.setItem('firstCategory', 'false');
    this.setState({firstCategory: false});
  }  
  _getTutorialLayout = () => {
    return (
      <View style={styles.full} onLayout={this._onLayout}>
        <Modal
          visible={this.state.firstCategory}
          onRequestClose={this._onCloseModal}
        >
        <ScrollView
          horizontal
          pagingEnabled
          onScroll={this._onChangeSlide}
          showsHorizontalScrollIndicator={false}
          style={styles.image}
        >
          {
            [categoryVideosBackground, categoryVideosBackground, categoryVideosBackground].map((i, k) => (
                  <ImageBackground source={i}
                  style={styles.image}
                  key={k}
              />
            ))
          }
          
        </ScrollView>
        <View style={styles.iconStyle}>
          <Ionicons name='ios-close-outline' size={70}  style={{color: '#fff'}} onPress={this._onCloseModal}/>
          </View>
        <View style={styles.buttonModal}>
          {
            [categoryVideosBackground, categoryVideosBackground, categoryVideosBackground].map((i, k) => (
              <Text style={k === this.state.activeSlide ? styles.activeCircle : styles.inactiveCircle} key={k}>⬤</Text>
            ))
          }
          
        </View>
        </Modal>
      </View>
    )
  }

  render() {
    const { navigation } = this.props;
    const { params } = navigation.state;
    const videosAmount = params.category.videos.length;
    const amount = videosAmount - this.state.initialAmount;
    return (
      this.state.firstCategory ? this._getTutorialLayout() : 
      <View style={styles.full} onLayout={this._onLayout}>
        <ImageBackground
          style={styles.full}
          imageStyle={[
            styles.backgroundImageStyle,
            { width: Dimensions.get('window').width, height: Dimensions.get('window').height },
          ]}
          source={categoryVideosBackground}
        >
          <View style={{ borderBottomWidth: 1, borderBottomColor: Colors.TAB_BAR_ACTIVE_ICON }}>
            <Text style={styles.headerText}>
              {amount} VIDEOS DESCARGADOS DE {videosAmount}
            </Text>
          </View>
          <ScrollView>
            <Videos navigation={navigation} videos={this.state.videos} />
            {navigation.state.params &&
              navigation.state.params.showDialog &&
              Alert.alert(
                'DESCARGA VIDEOS',
                `VAS A DESCARGAR ${
                  this.state.initialAmount
                } DE ${videosAmount} VIDEOS. ESTA ACCIÓN PUEDE DEMORAR UN POCO.`,
                [
                  { text: 'CANCELAR', onPress: () => navigation.setParams({ showDialog: false }) },
                  {
                    text: 'OK',
                    onPress: () => {
                      navigation.setParams({ showDialog: false });
                      this._downloadVideos();
                    },
                  },
                ],
                { cancelable: false }
              )}
            {navigation.state.params &&
              navigation.state.params.deleteDialog &&
              Alert.alert(
                'BORRAR VIDEOS DE LA CATEGORÍA',
                `VAS A BORRAR LOS VIDEOS DE ESTA CATEGORÍA. ESTA ACCIÓN PUEDE DEMORAR UN POCO.`,
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
                { cancelable: false }
              )}
          </ScrollView>
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
