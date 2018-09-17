import * as React from 'react';
import { Image, StyleSheet, ImageBackground } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        flex: 0.45
    }
})

export default function SplashScreen() {
    return (
        <ImageBackground
            style={styles.container}
            source={require("../../res/background/fondo-amarillo.jpg")}
            resizeMode="cover"
        >
            <Image
                style={styles.logo}
                source={require("../../res/icon/logo-app.png")}
                resizeMode="contain"
            />

        </ImageBackground>
    )
}