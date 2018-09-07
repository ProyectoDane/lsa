import * as React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    containterTop: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    },
    logoTransferencia: {
        flex: 2,
        height: "100%",
        width: "100%"
    },
    logoTINC: {
        flex: 1.5,
        width: "75%",
        height: "100%"
    },
    proyecto: {
        flex: 0.3
    },
    imageContainer: {
        flex: 1.5,
        flexDirection: "row",
        alignItems: "center"
    },
    fundasor: {
        flex: 1,
        height: "50%"
    },
    hexacta: {
        flex: 1,
        marginHorizontal: 15
    }
})

export default function DaneSplashScreen() {
    return (
        <View style={styles.containterTop}>
                <Image
                    style={styles.logoTransferencia}
                    source={require("../../res/icon/dane_logo_transparencia.png")}
                    resizeMode="contain"
                />
                <Text style={styles.proyecto}>UN PROYECTO DE</Text>
                <Image style={styles.logoTINC} 
                    source={require("../../res/image/tinc.png")}
                    resizeMode="contain"
                />
                <Text>CON LA COLABORACIÓN DE</Text>
                <View style={styles.imageContainer}>
                    <Image style={styles.fundasor}
                        source={require("../../res/image/fundasor.png")}
                        resizeMode="contain"
                    />
                    <Image style={styles.hexacta}
                        source={require("../../res/image/hexacta.png")}
                        resizeMode="contain"
                    />
                </View>
           
        </View>
    )
}   