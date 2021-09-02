import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  full: {
    flex: 1,
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
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'flex-end',
    paddingVertical: 10,
    height: 60,
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width,
    backgroundColor: '#E0E0E0',
  },
  downloadText: {
    textAlign: 'center',
    fontFamily: 'nunito',
  },
  progressBar: {
    zIndex: 100,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 8,
    bottom: 0,
  },
  buttonPosition: {
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  modalMessageDownload: {
    borderColor: '#000000', borderWidth: 1.5, borderStyle: 'solid',
    backgroundColor: '#FFFFFF',marginTop:200,
    marginLeft:10,marginRight:10,borderRadius:15
  },
  textBoldModal: {
    fontSize: 20,
    marginTop:20,
    marginLeft:15,
    color:'#000000',
    textAlign:'left',
    fontWeight:"bold"
  },
  textNormalModal:{
    fontSize: 20,
    marginTop:10,
    marginLeft:15,
    marginRight:15,
    color:'#000000',
    textAlign:'left',
    fontWeight:'100'
  },
  opacityModal: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    position: 'absolute',
    height: '100%', 
    width: '100%',
  },
  textButton: {
    fontSize:20,
    color:'#1AA299',
    fontWeight:'bold'
  },
});
