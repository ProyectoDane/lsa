import * as Progress from 'react-native-progress';
import React, { PureComponent } from 'react';
import { View, Alert, ScrollView, Text, Dimensions, ImageBackground } from 'react-native';
import Ionicons from 'react-native-vector-icons/MaterialIcons';
import RNFS from 'react-native-fs';
import Videos from './../Videos';
import Colors from './../../res/colors';
import { styles } from './styles';

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
    headerRight: (
      <Ionicons
        name="cloud-download"
        size={30}
        style={styles.downloadIcon}
        onPress={() => navigation.setParams({ showDialog: true })}
      />
    ),
  });

  state = { downloadedVideos: 0, showBar: false, videos: [], initialAmount: 0, refresh: false };

  componentDidMount() {
    const { navigation } = this.props;
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
      // console.log(downloaded, amount);
      this.setState({ videos: result, initialAmount: amount, downloadedVideos: downloaded });
    });
  }

  _checkVideos(videos) {
    return videos.map(video => {
      const path = `${RNFS.DocumentDirectoryPath}/${video.name}`;
      return RNFS.exists(path).then(existingFile => ({ ...video, downloaded: existingFile }));
    });
  }

  _downloadVideos = () => {
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
            console.log(prevState.downloadedVideos, prevState.initialAmount);
            if (prevState.initialAmount == 0) {
              return { showBar: false };
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
          downloadedVideos: prevState.downloadedVideos,
          initialAmount: prevState.initialAmount - 1,
        }));
      }
    });
  };
  _onLayout = () => this.forceUpdate();

  render() {
    const { navigation } = this.props;
    const { params } = navigation.state;
    const videosAmount = params.category.videos.length;
    const amount = videosAmount - this.state.initialAmount;
    return (
      <View style={styles.full} onLayout={this._onLayout}>
        <ImageBackground
          style={styles.full}
          imageStyle={[
            styles.backgroundImageStyle,
            { width: Dimensions.get('window').width, height: Dimensions.get('window').height },
          ]}
          source={categoryVideosBackground}
        >
          <View style={{borderBottomWidth:1,borderBottomColor:Colors.TAB_BAR_ACTIVE_ICON}}>
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
