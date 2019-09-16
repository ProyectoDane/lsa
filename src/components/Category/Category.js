import * as Progress from 'react-native-progress';
import React, { PureComponent } from 'react';
import { View, Alert, ScrollView, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
        name="ios-download-outline"
        size={26}
        style={styles.downloadIcon}
        onPress={() => navigation.setParams({ showDialog: true })}
      />
    ),
  });

  state = { downloadedVideos: 0, showBar: false, videos: [], initialAmount: 0 };

  componentDidMount() {
    const videos = this.props.navigation.state.params.category.videos.map(video => ({...video, name: video.video.split('/').pop()}));
    Promise.all(this._checkVideos(videos)).then(result => {
      const amount = result.filter(v => !v.downloaded).length;
      this.setState({videos: result, initialAmount: amount});
    })
  }

  _checkVideos(videos) {
    return videos.map(video => {
      const path = `${RNFS.DocumentDirectoryPath}/${video.name}`;
      return RNFS.exists(path).then(existingFile => ({...video, downloaded: existingFile}));
    });
  }
  
  _downloadVideos = () => {
    this.setState({showBar: true});
    this.state.videos.forEach((video, index) => {
      if (!video.downloaded) {
        RNFS.downloadFile({
          fromUrl: video.video,
          toFile: `${RNFS.DocumentDirectoryPath}/${video.name}`,
        }).promise.then(() => {
          const changingVideos = [...this.state.videos];
          changingVideos[index].downloaded = true;
          this.setState(prevState => ({downloadedVideos: prevState.downloadedVideos + 1, videos: changingVideos}));
        });
      } else {
        this.setState(prevState => ({downloadedVideos: prevState.downloadedVideos + 1}))
      }
    })
  }

  render() {
    const { navigation } = this.props;
    const { params } = navigation.state;
    return (
      <View style={styles.full}>
        <ScrollView >
          <Videos
            navigation={navigation}
            videos={this.state.videos}
            background={categoryVideosBackground}
          />{
            navigation.state.params &&
            navigation.state.params.showDialog &&
            Alert.alert(
              'Descarga videos',
              `Vas a descargar ${this.state.initialAmount} videos. Esta acción puede demorar un poco.`,
              [{ text: 'CANCELAR', onPress: () => navigation.setParams({ showDialog: false }) }, { text: 'OK', onPress: () => { navigation.setParams({ showDialog: false }); this._downloadVideos(); }}],
              { cancelable: false }
            )
          }
          
        </ScrollView>
        {this.state.showBar && 
          <View>
           <Progress.Bar color='green' width={null} progress={this.state.downloadedVideos / params.category.videos.length}/>
           <Text style={styles.downloadText}>{`${this.state.downloadedVideos} de ${this.state.initialAmount}`}</Text>
         </View>
        }
      </View>
    );
  }
}
