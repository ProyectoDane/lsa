import React, { PureComponent } from 'react';
import Video from 'react-native-video';
import { Text, Image, TouchableOpacity, Dimensions, View, ScrollView } from 'react-native';
import Colors from '../../../res/colors';
import I18n from '../../../res/i18n/i18n';
import { styles, margin } from './styles';
import { deviceIsInLandscapeMode } from '../../../util/deviceUtil';
import { getTabNavigatorBarHeight } from '../../../util/layoutUtil';

const playIcon = require('../../../res/icon/play-icon.png');


const videoRatio = 352 / 288;
const tincSource = require('../../../res/image/tinc.png');
const fundasorSource = require('../../../res/image/fundasor.png');
const hexactaSource = require('../../../res/image/hexacta.png');

export class Information extends PureComponent {
  static navigationOptions = () => ({
    title: I18n.t('info_tab_title'),
    headerTintColor: Colors.THEME_SECONDARY,
    headerTitleStyle: {
      fontFamily: 'nunito',
    },
    headerStyle: {
      backgroundColor: Colors.THEME_PRIMARY,
      elevation: 0,
      borderBottomWidth: 1,
      borderBottomColor: Colors.TAB_BAR_ACTIVE_ICON,
    },
  });

  _onLayout = () => {
    this.forceUpdate();
  };

  state = { paused: true };

  _onEnd = () => this.setState({ paused: true });

  render() {
    let videoHeight;
    let videoWidth;
    if (deviceIsInLandscapeMode()) {
      videoHeight = Dimensions.get('window').height - getTabNavigatorBarHeight() - 2 * margin;
      videoWidth = Math.round(videoHeight * videoRatio);
    } else {
      videoWidth = Dimensions.get('window').width - 2 * margin;
      videoHeight = Math.round(videoWidth / videoRatio);
    }
    return (
      <View style={styles.full} onLayout={this._onLayout}>
        <ScrollView>
        <View style={{marginHorizontal: margin}}>
        <Image style={styles.daneImage}  source={require("../../../res/icon/dane_logo_transparencia.png")} />
            <Text style={styles.title}>DANE</Text>
            <Text style={styles.text}>El proyecto DANE propone llevar adelante una
            revolución en la manera de enseñarles contenidos a personas con discapacidad. Creamos
            aplicaciones móviles e integramos la tecnología informática a la educación, aportando con
            tenidos académicos y de la vida cotidiana. El objetivo del proyecto es ayudar a la inclusión
            de las personas con discapacidad y promover en la sociedad la cultura de inclusión.</Text>
            <Text style={styles.coordinacionTitle}>Coordinación del Proyecto</Text>
            <Image style={styles.tincImage} source={tincSource} />
            <Text style={styles.title}>Idea y Contenido</Text>
            <Image style={styles.tincImage} source={fundasorSource} />
            <Text style={styles.title}>Desarrollo</Text>
            <Image style={styles.tincImage} source={hexactaSource} />
            <Text style={styles.title}>Agradecimientos</Text>
            <Text style={styles.subtitle}>A quienes forman parte de Fundasor: </Text><Text>Anahí Alesso, Mariana Reuter, Patricio A. Cabezas y Cristina Alesso.</Text>
            <Text>A Elisa Nudman.</Text>
            <Text style={styles.subtitle}>A los señantes sordos: </Text><Text>Lisandro Rodríguez, Mateo Rodríguez García, Olivia Rodríguez García, Lucía Fauve, Ivana Paola Navarro, Damián Alejandro Scigliano, Sebastián Ariel Cáceres, Rocío María Vidiella, Paula Silvina Costa Gil </Text>
            <Text style={styles.subtitle}>Al staff de Hexacta: </Text><Text>Luis Broeders, Gerardo Cabrera, Javier Fernández, Julieta Fernández, Tomás Franco, Macarena Iriarte, Ezequiel Meijomil, Mariela Morel, Diego Pedro, Jesica Taira y Verónica Vignoni.</Text>

          </View>
          <TouchableOpacity
            style={[
              styles.videoContainer,
              {
                marginHorizontal: deviceIsInLandscapeMode()
                  ? (Dimensions.get('window').width - videoWidth) / 2
                  : margin,
                width: videoWidth,
                height: videoHeight
              }
            ]}
            onPress={() => {
              if (this.video) {
                this.video.seek(0);
              }
              this.setState({ paused: !this.state.paused });
            }}
          >
            {this.state.paused ? (
              <Image style={styles.playIcon} source={playIcon} />
            ) : (
              <Video
                ref={ref => {
                  this.video = ref;
                }}
                source={{uri: 'https://dane-videos.s3.us-east-2.amazonaws.com/presentacion_LSA.mp4'}}
                style={[
                  styles.video,
                  {
                    width: videoWidth,
                    height: videoHeight
                  }
                ]}
                rate={1}
                paused={this.state.paused}
                muted
                resizeMode="contain"
                onEnd={this._onEnd}
              />
            )}
          </TouchableOpacity>
          
          

        </ScrollView>
      </View>
    );
  }
}
