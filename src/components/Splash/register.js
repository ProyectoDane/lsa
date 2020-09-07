import React, {Component} from 'react';
import {
  Text,
  Alert,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  Linking,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import ImageBackground from '../shared/ImageBackground';
import {Picker} from '@react-native-community/picker';
import I18n from '../../res/i18n/i18n';

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
    fontSize: 20,
    textAlign: 'center',
    paddingHorizontal: 30,
    marginVertical: 20,
  },
  labelText: {
    flex: 1,
    fontFamily: 'nunito',
    marginBottom: 5,
  },
  tinput: {
    height: 40,
    backgroundColor: 'white',
    borderRadius: 6,
    marginBottom: 10,
    paddingLeft: 10,
  },
  pinputContainer: {
    backgroundColor: 'white',
    borderRadius: 6,
    borderColor: '#bdc3c7',
    overflow: 'hidden',
    marginBottom: 10,
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
      showRegister: false,
    };
  }
  _loadTerms() {
    const url = 'https://tinc.org.ar/terminos/';
    Linking.openURL(url);
    //  .catch(err => console.error("NO SE PUDO CARGAR LA PÁGINA", err));
  }
  _register() {
    const {name, email, app_user, age, app_name} = this.state;
    if (name === '' || email === '' || app_user === '' || age === '') {
      this.setState({showRegister: true});
    } else {
      const bdata = {
        name,
        email,
        app_user,
        age,
        app_name,
      };
      fetch(
        'https://w33g97vrag.execute-api.sa-east-1.amazonaws.com/production/register',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'x-api-key': 'fKPYI3tpakaIUOpQGaXHM1blfpcLbb5Z7aFqGAtQ',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bdata),
        },
      )
        .then(() => {
          this.props.onRegister();
        })
        .catch(error => {
          // console.error(error);
        });
    }
  }
  onChangeText(text) {}
  render() {
    const {showRegister} = this.state;
    return (
      <View style={styles.container}>
        <ImageBackground src={categoryVideosBackground}>
          <SafeAreaView style={styles.scrollParentContainer}>
            <ScrollView
              keyboardShouldPersistTaps="always"
              contentContainerStyle={styles.scrollStyle}>
              {showRegister &&
                Alert.alert(
                  'REGISTRAR',
                  'PARA FINALIZAR EL REGISTRO DEBES COMPLETAR TODOS LOS CAMPOS.',
                  [
                    {
                      text: 'OK',
                      onPress: () => this.setState({showRegister: false}),
                    },
                  ],
                  {cancelable: false},
                )}
              <View style={styles.formContainer}>
                <Text style={styles.headerText}>
                  {
                    'PARA MEJORAR LAS APPS Y SEGUIR DESARROLLANDO OTRAS NOS AYUDARIA QUE CONTESTES ESTAS CUATRO PREGUNTAS. \n\nES MUY IMPORTANTE PARA NOSOTROS. ¡GRACIAS!'
                  }
                </Text>
                <Text style={styles.labelText}>NOMBRE Y APELLIDO</Text>
                <TextInput
                  style={styles.tinput}
                  underlineColorAndroid="transparent"
                  onChangeText={text => this.setState({name: text})}
                />
                <Text style={styles.labelText}>EMAIL</Text>
                <TextInput
                  style={styles.tinput}
                  keyboardType="email-address"
                  underlineColorAndroid="transparent"
                  onChangeText={text => this.setState({email: text})}
                />
                <Text style={styles.labelText}>
                  ¿QUIÉN ESTÁ DESCARGANDO LA APP ? (SELECCIONÁ LA OPCIÓN CON LA
                  QUE MÁS TE IDENTIFIQUES)
                </Text>
                <View style={styles.pinputContainer}>
                  <Picker
                    selectedValue={this.state.app_user}
                    onValueChange={itemValue =>
                      this.setState({app_user: itemValue})
                    }>
                    <Picker.Item label={I18n.t('select')} value="" />
                    <Picker.Item
                      label={I18n.t('deaf_person')}
                      value="PERSONA_SORDA"
                    />
                    <Picker.Item label={I18n.t('family')} value="FAMILIAR" />
                    <Picker.Item label={I18n.t('teacher')} value="DOCENTE" />
                    <Picker.Item
                      label={I18n.t('interpreter')}
                      value="INTERPRETE"
                    />
                    <Picker.Item
                      label={I18n.t('profesional')}
                      value="PROFESIONAL"
                    />
                    <Picker.Item label={I18n.t('other')} value="OTRO" />
                  </Picker>
                </View>
                <Text style={styles.labelText}>TU EDAD</Text>
                <View style={styles.pinputContainer}>
                  <Picker
                    selectedValue={this.state.age}
                    onValueChange={itemValue =>
                      this.setState({age: itemValue})
                    }>
                    <Picker.Item label={I18n.t('select')} value="" />
                    <Picker.Item label={I18n.t('up_to_7')} value="HASTA_7" />
                    <Picker.Item
                      label={I18n.t('from_8_to_15')}
                      value="8_A_15"
                    />
                    <Picker.Item
                      label={I18n.t('from_16_to_30')}
                      value="16_A_30"
                    />
                    <Picker.Item
                      label={I18n.t('from_31_to_55')}
                      value="31_A_55"
                    />
                    <Picker.Item
                      label={I18n.t('more_than_55')}
                      value="MAYOR_55"
                    />
                  </Picker>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.redButton]}
              onPress={this.props.onNotRegistered}>
              <Text style={[styles.textColor, styles.buttonText]}>OMITIR</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.greenButton]}
              onPress={this._register.bind(this)}>
              <Text style={[styles.textColor, styles.buttonText]}>
                REGISTRAR
              </Text>
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
