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
  TextInput,
  Picker,
  TouchableOpacity,
  TouchableHighlight,
  ListView,
} from 'react-native';
import styles from '../css/config2Css'
import Button from 'react-native-button'
import Switch from 'react-native-customisable-switch';
import ListViewSelect from 'react-native-list-view-select';
import _ from 'lodash';
export default   class config extends Component {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      isActive: 0,
      isActive1: 0,
      isActive2: 0,
      isActive3: 0,
      isActive4: 0,
    };
    this.activeImage = <Image style={{flex:1,marginTop:5,marginLeft:70,width:20,height:20,resizeMode:'contain'}} source={require('../Assets/check.png')}/>;
    this.inactiveImage = <Image style={{flex:1,marginTop:5,marginLeft:70,width:20,height:20,resizeMode:'contain'}} source={require('../Assets/uncheck.png')}/>;
  }
goBack(){
  this.props.navigation.goBack();
}
  static navigationOptions  = ({navigation}) => {
  return {
    headerLeft: (
      <Button
        onPress={() => navigation.goBack()}
      >&#60; Back</Button>
    ),
  };
};

  imageUrl(){
    this.setState({
      isActive: ! this.state.isActive
    })
  }
  imageUrl1(){
    this.setState({
      isActive1: ! this.state.isActive1
    })
  }
  imageUrl2(){
    this.setState({
      isActive2: ! this.state.isActive2
    })
  }
  imageUrl3(){
    this.setState({
      isActive3: ! this.state.isActive3
    })
  }
  imageUrl4(){
    this.setState({
      isActive4: ! this.state.isActive4
    })
  }
  showText(rowData){
    this.setState({soundText:rowData})
  }
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
          <View style={{flex:1.1,backgroundColor:'transparent',alignItems:'center',}}>
                <Image style={styles.manstyle}
                  source={require('../Assets/man.png')}
                />
          </View>
          <View style={{flex:0.7,backgroundColor:'transparent'}}>
              <Text style={{marginTop:0,marginLeft:60,fontSize:22,color:'#ffffff',}}> User ID:</Text>
              <TextInput
                    style={{height: 50, fontSize:16,width: 280, marginLeft: 50,marginTop: 10,borderColor: '#000000', borderWidth: 1, backgroundColor: '#ffffff'}}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
              />
          </View>
          <View style={{alignItems:'center',flex:2,backgroundColor:'transparent'}}>
            <Text style={{marginTop:20,color:'#ffffff',fontSize:22,}}>
            Select Questions To Ask
            </Text>
            <View style={{flex:1,padding:3,marginTop:5,width:250,backgroundColor:'#ffffff',borderRadius:7,borderWidth:1,borderColor:'#000000',}}>
            <TouchableOpacity style={{flex:1,backgroundColor:'#ffffff',borderWidth:1,borderColor:'#000000',borderRadius:7,}} activeOpacity={1} onPress={()=>this.imageUrl()}>
                <View style={{flex:1,flexDirection:'row'}}>
                    <Text style={{marginTop:5,marginLeft:10,}}>Question1 .......</Text>
                    {(this.state.isActive)? this.activeImage: this.inactiveImage}
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{flex:1,backgroundColor:'#ffffff',borderWidth:1,borderColor:'#000000',borderRadius:7,}} activeOpacity={1} onPress={()=>this.imageUrl1()}>
                <View style={{flex:1,flexDirection:'row'}}>
                    <Text style={{marginTop:5,marginLeft:10,}}>Question1 .......</Text>
                    {(this.state.isActive1)? this.activeImage: this.inactiveImage}
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{flex:1,backgroundColor:'#ffffff',borderWidth:1,borderColor:'#000000',borderRadius:7,}} activeOpacity={1} onPress={()=>this.imageUrl2()}>
                <View style={{flex:1,flexDirection:'row'}}>
                    <Text style={{marginTop:5,marginLeft:10,}}>Question1 .......</Text>
                    {(this.state.isActive2)? this.activeImage: this.inactiveImage}
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{flex:1,backgroundColor:'#ffffff',borderWidth:1,borderColor:'#000000',borderRadius:7,}} activeOpacity={1} onPress={()=>this.imageUrl3()}>
                <View style={{flex:1,flexDirection:'row'}}>
                    <Text style={{marginTop:5,marginLeft:10,}}>Question1 .......</Text>
                    {(this.state.isActive3)? this.activeImage: this.inactiveImage}
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{flex:1,backgroundColor:'#ffffff',borderWidth:1,borderColor:'#000000',borderRadius:7,}} activeOpacity={1} onPress={()=>this.imageUrl4()}>
                <View style={{flex:1,flexDirection:'row'}}>
                    <Text style={{marginTop:5,marginLeft:10,}}>Question1 .......</Text>
                    {(this.state.isActive4)? this.activeImage: this.inactiveImage}
                </View>
            </TouchableOpacity>
            </View>
          </View>
          <View style={{flex:0.8,flexDirection:'row',backgroundColor:'transparent'}}>
              <Button style={{fontSize: 20, color: '#4a90e2',fontWeight:'300',}}
                containerStyle={styles.cancel}
                  >
                Cancel </Button>
                <Button style={{fontSize: 20, color: '#4a90e2',fontWeight:'300',}}
                  containerStyle={styles.save}
                  onPress={()=>
                      navigate('config2',{name:'config2'})
                    }
                    >
                  Save </Button>
          </View>
      </View>
    );
  }
}
