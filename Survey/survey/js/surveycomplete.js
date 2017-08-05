import React, { Component } from 'react';
var ReactNative = require('react-native');

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  ScrollView,
  SliderIOs,
  Slider,
} from 'react-native';
import styles from '../css/complete'
import Button from 'react-native-button'

export default   class surveycomplete extends Component {
  constructor(props){
    super(props);
    }
    static navigationOptions = {
      title: 'Back',
      header:null,
    };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.headText}> SURVEY </Text>
        </View>
        <View style={styles.bodyView}>
          <View style={styles.imageView}>
            <Image style={styles.imagestyle}
              source={require('../Assets/CompleteIcon.png')}
            />
          </View>
          <View style={styles.textView}>
              <Text style={{textAlign:'center',fontSize:24,fontWeight:'400',marginTop:60}}>Survey Complete !!</Text>
          </View>
          <View style={styles.buttonView}>
            <View style={{flex:1,marginLeft:20}}>
              <Button style={{fontSize: 20, color: '#000000',fontWeight:'300',}}
                containerStyle={styles.cancleButton}
                onPress={()=>
                    navigate('surveywizard2',{name:'surveywizard2'})
                  }
                  >
                Cancle </Button>
            </View>
            <View style={{flex:1,marginRight:20,marginLeft:3}}>
              <Button style={{fontSize: 20, color: '#000000',fontWeight:'300',}}
                containerStyle={styles.submitButton}
                onPress={()=>
                    navigate('config',{name:'config'})
                  }
                  >
                Submit </Button>
            </View>
          </View>
          <View style={styles.underView}>

          </View>
        </View>
      </View>
    );
  }
}
