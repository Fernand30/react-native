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
  Dimensions,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import SegmentControl from 'react-native-segmented-control-tab'
import {Actions,} from 'react-native-router-flux'
import Modal from 'react-native-modal';

const backgroundImage = require('../assets/images/background.png');
const settingIcon = require('../assets/images/settingIcon.png');
const cameraIcon = require('../assets/images/cameraIcon.png');
const backIcon = require('../assets/images/backIcon.png');
const camera = require('../assets/images/camera.png');
const gallery = require('../assets/images/gallery.png');

export default class Measurement extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedIndex:0,
          isModalVisible:false
        };
      }

  handleIndexChange = (index) => {
      this.setState({
        selectedIndex: index,
      });
    }
  goTutorial(){
    Actions.tutorial();
  }
  onCamera(){
    this.setState({
      isModalVisible:false,
    })
    Actions.cameraform();
  }
  cameraGallery(){
    this.setState({
      isModalVisible:true,
    })
  }
  modalRemove(){
    this.setState({isModalVisible:false})
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
                    <TouchableOpacity onPress={this.goTutorial.bind(this)} style={{width:20,height:20,borderRadius:10,borderWidth:1,justifyContent:'center',alignItems:'center',marginRight:10,}}>
                      <Text style={{backgroundColor:'transparent'}}>!</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flex:40}}>
              <View style={{flex:1,}}>
                <View style={{padding:20}}>
                    <SegmentControl
                      tabStyle = {{marginTop:10,height:50,backgroundColor:'#144f97'}}
                      tabTextStyle = {{color:'#53bee7'}}
                      activeTabStyle = {{backgroundColor:'#06366f'}}
                      activeTabTextStyle = {{color:'white'}}
                      values={['PHOTOS', 'FOLDER']}
                      selectedIndex={this.state.selectedIndex}
                      onTabPress = {this.handleIndexChange}
                    />
                </View>
                <View>

                </View>
              </View>
              <View style={{height:70,backgroundColor:'#2861a6',flexDirection:'row',alignItems:'flex-end',justifyContent:'space-between'}}>
                  <TouchableOpacity style={{flex:1,alignItems:'center'}}>
                    <Image source={settingIcon} style={{width:30,height:30,resizeMode:'stretch',marginBottom:5}}/>
                    <Text style={{backgroundColor:'transparent',color:'white',marginBottom:5}}>Settings</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.cameraGallery.bind(this)} style={{flex:1,alignItems:'center'}}>
                    <Image source={cameraIcon} style={{width:30,height:30,resizeMode:'stretch',marginBottom:5}}/>
                    <Text style={{backgroundColor:'transparent',color:'white',marginBottom:5}}>Measurement</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{flex:1,alignItems:'center'}}>
                    <Image source={backIcon} style={{width:30,height:30,resizeMode:'stretch',marginBottom:5}}/>
                    <Text style={{backgroundColor:'transparent',color:'white',marginBottom:5}}>Export</Text>
                  </TouchableOpacity>
              </View>
            </View>
        </Image>
        <Modal isVisible={this.state.isModalVisible}>
          <View style={{ flex: 1,}}>
              <View style={{marginTop:200,marginRight:20,marginLeft:20,backgroundColor:'white'}}>
                <Text style={{marginTop:20,textAlign:'center',fontSize:18,}}>TAKE MEASUREMENT PHOTO</Text>
                <View style={{flexDirection:'row',paddingLeft:50,paddingRight:50,justifyContent:'space-between',marginTop:40}}>
                  <TouchableOpacity onPress={this.onCamera.bind(this)}>
                    <Image source={camera} style={{width:50,height:40,resizeMode:'cover'}}/>
                    <Text style={{marginTop:10,textAlign:'center'}}>camera</Text>
                  </TouchableOpacity>
                  <View style={{borderWidth:0.3,width:1}}/>
                  <TouchableOpacity>
                    <Image source={gallery} style={{width:50,height:40,resizeMode:'cover'}}/>
                    <Text style={{marginTop:10,textAlign:'center'}}>gallery</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={this.modalRemove.bind(this)} style={{marginBottom:10,marginTop:40,marginLeft:100,marginRight:100,height:40,backgroundColor:'#2861a6',alignItems:'center',justifyContent:'center'}}>
                  <Text style={{color:'white',fontSize:18}}>CANCEL</Text>
                </TouchableOpacity>
              </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  typeButton: {
    padding: 5,
  },
  flashButton: {
    padding: 5,
  },
  buttonsSpace: {
    width: 10,
  },
});

AppRegistry.registerComponent('Measurement', () => Measurement);
