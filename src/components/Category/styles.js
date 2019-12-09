import { StyleSheet } from 'react-native';
import Colors from './../../res/colors';

const downloadIconMaginRight = 10;

const styles = StyleSheet.create({
    full: {
        flex: 1,
    },
    headerText:{
        flex:1,
        position:'absolute',
        zIndex: 100,
        fontFamily: 'nunito',
        color: Colors.THEME_SECONDARY,
        backgroundColor:'white',
        paddingHorizontal: 10
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