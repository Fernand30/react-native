import React from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  StatusBar,
  Platform,
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import { Actions } from 'react-native-router-flux';
const backGroundImage = require('../../assets/images/firstGround.png');

export default class Launch extends React.Component{
  goToSignup(){
     Actions.home()
  }
  goToHome(){
     Actions.launch()
  }

  render() {
    const titleConfig = {
      title:'Welcome',
      tintColor:'#ffffff',
      style:{fontSize:22,fontWeight:'600',backgroundColor:'transparent'}
    }
    const MyStatusBar = ({backgroundColor, ...props}) => (
      <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </View>
    );
    return (
        <View style={styles.container}>
        <MyStatusBar backgroundColor="#000000" barStyle="light-content" />
        <Image source={backGroundImage} style={styles.image}>
        <View style={styles.header}>
            <Text style={styles.welcome}>Welcome</Text>
        </View>
          <View style={styles.buttonview}>
            <TouchableOpacity onPress = {this.goToHome} style={styles.loginbutton}>
              <Text style={styles.signintext}>JEWELLERY</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress = {this.goToSignup} style={styles.gotosignupbutton}>
              <Text style={styles.noacount}>INDUSTRIAL</Text>
            </TouchableOpacity>
          </View>
          </Image>
      </View>
   )
 }
}

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const styles =  StyleSheet.create({
  container: {
    flex: 1,
    alignSelf:'stretch',
    justifyContent:'flex-end',
  },
  header: {
    flex: 0.07,
    backgroundColor:'#272727',
  },
  welcome: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
    marginTop: 5,
    color: '#ffffff',
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  image:{
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
  },
  buttonview: {
    flex:1,
    alignItems:'center',
    justifyContent:'flex-end',
    paddingBottom:70,
  },
  signintext: {
    fontWeight:'300',
    fontFamily:'GothamBold',
    opacity: 0.9,
  },
  noacount: {
    fontWeight:'300',
    fontFamily:'GothamBold',
    opacity: 0.9,
    marginTop:3,
  },
  loginbutton: {
    padding: 10,
    width:200,
    height: 30,
    backgroundColor: '#fcc900',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth:0,
    borderColor:'#615a40',
  },
  gotosignupbutton: {
    margin: 10,
    width:200,
    height: 30,
    backgroundColor: '#fcc900',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderWidth:0,
    borderColor:'#615a40',
  }
})
module.exports = Launch;
