import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Linking,
  Dimensions,
} from 'react-native';
import { WebView } from 'react-native-webview';
import ImageBackground from '../shared/ImageBackground';

const pkg = require('../../../app.json');

const categoryVideosBackground = require('./../../res/background/fondo-amarillo.jpg');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollStyle: {
    flexGrow: 1,
  },
  scrollParentContainer: {
    height: Dimensions.get('window').height - 130,
  },
  video: {
    backgroundColor: 'transparent',
  },
  headerText: {
    fontFamily: 'nunito',
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  labelText: {
    flex: 1,
    fontFamily: 'nunito',
    marginBottom: 5,
  },
  tinput: {
    height: 37,
    backgroundColor: 'white',
    borderRadius: 6,
    margin: 5,
    paddingLeft: 10,
    color: '#000000',
  },
  pinputContainer: {
    backgroundColor: 'white',
    borderRadius: 6,
    borderColor: '#bdc3c7',
    overflow: 'hidden',
    marginBottom: 30,
  },
  formContainer: {
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  textColor: {
    color: '#FFFFFF',
    fontFamily: 'nunito',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'flex-end',
    paddingVertical: 10,
    height: 60,
    position: 'absolute',
    bottom: 44,
    width: Dimensions.get('window').width,
    backgroundColor: '#E0E0E0',
  },
  button: {
    flex: 1,
    backgroundColor: '#FFB54C',
    alignItems: 'center',
    marginTop: 'auto',
    paddingVertical: 10,
    height: 40,
    marginHorizontal: 10,
    borderRadius: 6,
  },
  redButton: {
    backgroundColor: '#E2574C',
  },
  greenButton: {
    backgroundColor: '#1AA299',
  },
  blueButton: {
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width,
    backgroundColor: '#01A0C6',
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
  },
  blueButtonText: {
    fontSize: 10,
  },
  formPicker: {
    height: 100,
    fontSize: 15,
  },
});

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      app_user: '',
      age: '',
      app_name: pkg.name,
      registered: false,
    };
    this.refWebView = React.createRef();
  }

  _loadTerms() {
    const url = 'https://tinc.org.ar/terminos/';
    Linking.openURL(url);
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground src={categoryVideosBackground}>
          <WebView
            style={styles.scrollParentContainer}
            startInLoadingState={true}
            ref={this.refWebView}
            source={{
              uri:
                'https://docs.google.com/forms/d/e/1FAIpQLSfV52qo8PxuFiANDwTTfnCVe6G0fG81mzpDLvHdVp9LREVasw/viewform',
            }}
            onNavigationStateChange={navState => {
              if (navState.canGoBack) {
                this.refWebView.current.stopLoading();
                this.props.onRegister();
              }
            }}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.redButton]}
              onPress={this.props.onSkipped}>
              <Text style={[styles.textColor, styles.buttonText]}>OMITIR</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.blueButton} onPress={this._loadTerms}>
            <Text style={[styles.textColor, styles.blueButtonText]}>
              POLÍTICA DE PRIVACIDAD
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}
