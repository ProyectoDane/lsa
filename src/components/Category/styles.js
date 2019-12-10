import { StyleSheet } from 'react-native';
import Colors from './../../res/colors';

const downloadIconMaginRight = 10;

const styles = StyleSheet.create({
    full: {
        flex: 1,
    },
    headerText:{
        zIndex: 100,
        fontFamily: 'nunito',
        color: Colors.THEME_SECONDARY,
        backgroundColor:'white',
        paddingHorizontal: 10,
        paddingVertical: 8,
        textAlign:'center', 
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