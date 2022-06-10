import React from 'react'
import {Text,TouchableOpacity,StyleSheet,Dimensions} from 'react-native'



export function CloseButton(props){

    const { onPress,text } = props
    return(
        <TouchableOpacity
            style = {{
                ...styles.button,
                backgroundColor: '#01A0C6'
            }}
            onPress = {onPress}
        >
            <Text
                style = {{
                    ...styles.buttonText,
                    color: '#FFFFFF'
                }}
            >
                {text}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    button: {
        position: 'absolute',
        bottom: 0,
        width: Dimensions.get('window').width,
        paddingVertical: 10,
        alignItems: 'center',
        zIndex: 100,
    },
    buttonText:{
        textAlign: 'center',
        fontFamily: 'nunito',
        fontSize: Dimensions.get('window').width / 20,
    },
})