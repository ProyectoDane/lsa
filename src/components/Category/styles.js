import { StyleSheet } from 'react-native';
import Colors from './../../res/colors';

const downloadIconMaginRight = 10;

const styles = StyleSheet.create({
    full: {
        flex: 1,
    },
    downloadIcon: {
        color: Colors.THEME_SECONDARY,
        marginRight: downloadIconMaginRight,
        fontWeight: 'bold'
    },
    downloadText: {
        textAlign: 'center',
        fontFamily: 'nunito',
    }
})

export { styles };