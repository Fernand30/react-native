/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Video,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import SegmentControl from 'react-native-segmented-control-tab'
import {Actions,} from 'react-native-router-flux'
import VideoPlayer from 'react-native-video-controls';

const backgroundImage = require('../assets/images/background.png');
const videoPlayButton = require('../assets/images/videoPlayButton.png');
const tutorial = require('../assets/videos/tutorial.mp4');
export default class Measurement extends Component {

  constructor(props){
    super(props);
    this.state={selectedIndex:0,isVideo:0,}
  }

  handleIndexChange = (index) => {
      this.setState({
        selectedIndex: index,
      });
    }
  close(){
    Actions.pop();
  }
  videoPlay(){
    this.setState({isVideo:1,})
  }
  render() {
    return (
      <View style={styles.container}>
        <Image source={backgroundImage} style={{flex:1,width:null,height:null,resizeMode:'cover'}}>
            <View style={{flex:1,backgroundColor:'white'}}/>
            <View style={{flex:3,alignItems:'center',flexDirection:'row',backgroundColor:'white'}}>
                <View style={{flex:1}}/>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontSize:18}}> Measurment</Text>
                </View>
                <View style={{flex:1,alignItems:'flex-end'}}>
                    <TouchableOpacity style={{width:20,height:20,borderRadius:10,borderWidth:1,justifyContent:'center',alignItems:'center',marginRight:10,}}>
                      <Text style={{backgroundColor:'transparent'}}>!</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flex:40}}>
                <View style={{flex:1,}}>
                  <Text style={{marginTop:20,textAlign:'center',fontSize:24,color:'white',backgroundColor:'transparent'}}>TUTORIAL</Text>
                  <View style={{marginTop:30,height:200,marginLeft:20,marginRight:20,backgroundColor:'#2b2b2b',alignItems:'center',justifyContent:'center'}}>
                      {(this.state.isVideo == 0)?<TouchableOpacity onPress={this.videoPlay.bind(this)} style={{width:50,height:50,borderRadius:25,backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
                          <Image source={videoPlayButton} style={{marginLeft:5,width:15,height:20,resizeMode:'cover'}}/>
                      </TouchableOpacity>:<VideoPlayer
                          source={tutorial}
                          volume={12}
                      />}
                  </View>
                  <Text style={{backgroundColor:'transparent',color:'white',marginTop:20,textAlign:'center'}}>You can view the tutorial again at any time on</Text>
                  <Text style={{backgroundColor:'transparent',color:'white',textAlign:'center'}}>the start screen</Text>
                </View>
              <View style={{height:70,backgroundColor:'#2861a6',alignItems:'center',justifyContent:'center'}}>
                  <TouchableOpacity onPress={this.close.bind(this)} style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{backgroundColor:'transparent',fontSize:18,color:'white'}}>CLOSE</Text>
                  </TouchableOpacity>
              </View>
            </View>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('Measurement', () => Measurement);
