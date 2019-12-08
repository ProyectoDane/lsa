import React, { Component } from 'react';
import {
  Platform,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  Picker,
  Button,
  Linking,
  ScrollView
} from 'react-native';
import I18n from '../../res/i18n/i18n';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollStyle:{
      flexGrow: 1
    },
    video: {
        backgroundColor: 'transparent'
    },
    headerText:{
      margin:10,
    },
    labelText:{
      flex:1,
      marginHorizontal:10
    },
    tinput:{
      marginHorizontal:10,
      height:40
    },
    formContainer: {
    },
    buttonContainer:{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom:10,
    },
    button: {
      flex: 1,
      backgroundColor: '#FFB54C',
      alignItems: "center",
      marginTop: "auto",
      padding: 20, 
      marginHorizontal: 10
    },
    backgroundImageStyle: {
        resizeMode: Platform.OS === 'ios' ? 'repeat' : 'stretch',
      }
})
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: " ", 
      email: " ",
      app_user: " ", 
      age: " "
    };
  }
  _loadTersm(){
    const url = 'https://tinc.org.ar/terminos/';
    Linking.openURL(url)
    //  .catch(err => console.error("NO SE PUDO CARGAR LA PÁGINA", err));
  }
  _register(){
    const bdata = { ...this.state};
    fetch('https://ux2i5nx836.execute-api.us-east-2.amazonaws.com/production/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'x-api-key': "BjiDNiFwFv7VnroObnPHv9X6Ic3RsSqQaFd4fjNV",
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bdata),
    })
    .then(() => {
      this.props.onRegister();
    })
    .catch(( error ) => {
      // console.error(error);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView 
        keyboardShouldPersistTaps='always'
        contentContainerStyle={styles.scrollStyle}
        >
          <View style={styles.formContainer}>
            <Text style={
              styles.headerText
            }
            >PARA MEJORAR LAS APPS Y SEGUIR DESARROLLANDO OTRAS NOS AYUDARIA QUE COMPLETES ESTAS CUATRO PREGUNTAS.
    ES MUY IMPORTANTE PARA NOSOTROS. ¡GRACIAS!</Text>
            <Text style={styles.labelText}>
              NOMBRE Y APELLIDO
            </Text>
            <TextInput
              style={styles.tinput}
              onChangeText={( text ) => this.setState({name: text})}
            />
            <Text style={styles.labelText}
            >
              EMAIL
            </Text>
            <TextInput
              style={styles.tinput}
              keyboardType='email-address'
              onChangeText={(text) => this.setState({email: text})}
            />
            <Text style={styles.labelText}>
             ¿QUIÉN ESTÁ DESCARGANDO LA APP (MARCÁ LA OPCIÓN CON LA QUE MÁS TE IDENTIFIQUES)
            </Text>
            <Picker
              selectedValue={this.state.app_user}
              onValueChange={(itemValue) => this.setState({app_user: itemValue})}
            >
              <Picker.Item label={I18n.t('select')} value="" />
              <Picker.Item label={I18n.t('deaf_person')} value="PERSONA_SORDA" />
              <Picker.Item label={I18n.t('family')} value="FAMILIAR" />
              <Picker.Item label={I18n.t('teacher')} value="DOCENTE" />
              <Picker.Item label={I18n.t('interpreter')} value="INTERPRETE" />
              <Picker.Item label={I18n.t('profesional')} value="PROFESIONAL" />
              <Picker.Item label={I18n.t('other')} value="OTRO" />
            </Picker>
            <Text style={styles.labelText}>
              TU EDAD
            </Text>
            <Picker
              selectedValue={this.state.age}
              onValueChange={(itemValue) => this.setState({age: itemValue})}
            >
              <Picker.Item label={I18n.t('select')} value="" />
              <Picker.Item label={I18n.t('up_to_7')} value="HASTA_7" />
              <Picker.Item label={I18n.t('from_8_to_15')} value="8_A_15" />
              <Picker.Item label={I18n.t('from_16_to_30')} value="16_A_30" />
              <Picker.Item label={I18n.t('from_31_to_55')} value="31_A_55" />
              <Picker.Item label={I18n.t('more_than_55')} value="MAYOR_55" />
            </Picker>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={this._register()}>
              <Text>REGISTRAR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={this.props.onEnd}>
              <Text>OMITIR</Text>
            </TouchableOpacity>
        </View>
        <Button title="POLÍTICA DE PRIVACIDAD" onPress={this._loadTersm} />
        </ScrollView>
        
      </View>
    )
  }
}