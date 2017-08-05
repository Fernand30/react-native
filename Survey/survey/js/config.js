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
import styles from '../css/configCss'
import Button from 'react-native-button'
import Switch from 'react-native-customisable-switch';
import ListViewSelect from 'react-native-list-view-select';
import _ from 'lodash';
export default   class config extends Component {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      text: '0',
      Hnumber: 1,
      Mnumber: 1,
      ap:"AM",
      soundText:"Sonar",
      dataSource: ds.cloneWithRows(['Sonar', 'Mission impossible', 'Other', 'Other', 'Other', 'Other', 'Other', 'Other', 'Other']),
    };
  }
  static navigationOptions = {
    title: ' ',
  };

  HplusButton(){
    if(this.state.Hnumber<12)
    {
      this.setState({
        Hnumber: ++this.state.Hnumber,
      })
    }
  }
  HminuseButton(){
    if(this.state.Hnumber>0)
    {
      this.setState({
        Hnumber: --this.state.Hnumber,
      })
    }
  }
  MplusButton(){
    if(this.state.Mnumber<60)
    {
      this.setState({
        Mnumber: ++this.state.Mnumber,
      })
    }
  }
  MminuseButton(){
    if(this.state.Mnumber>0)
    {
      this.setState({
        Mnumber: --this.state.Mnumber,
      })
    }
  }
  APButton(){
    if(this.state.ap=="AM")
    {
      this.setState({
        ap:"PM"
      })
    }else {
      {
        this.setState({
          ap:"AM"
        })
      }
    }
  }
  showText(rowData){
    this.setState({soundText:rowData})
  }
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
          <View style={{flex:1.1,backgroundColor:'transparent',alignItems:'center',}}>
                <Image style={styles.alarmIconstyle}
                  source={require('../Assets/AlarmIcon.png')}
                />
          </View>
          <View style={{flex:0.8,backgroundColor:'transparent'}}>
              <View style={{flexDirection:'row',flex:1,marginTop:30,marginLeft:100,marginRight:100,marginBottom:15,borderWidth:1,borderColor:'#ffffff',}}>
                  <Text style={{color:'#ffffff',marginTop:10,marginLeft:40,fontSize:14,fontWeight:'300'}}>
                      Alarm
                      </Text>
                  <View style={{width:30,marginTop:5,marginLeft:10,}}>
                      <Switch
                              defaultValue={true}
                              activeText={'ON'}
                              inactiveText={'OFF'}
                              fontSize={14}
                              activeTextColor={'rgba(255, 255, 255, 1)'}
                              inactiveTextColor={'rgba(255, 255, 255, 1)'}
                              activeBackgroundColor={'rgba(0, 0, 255, 1)'}
                              inactiveBackgroundColor={'rgba(137, 137, 137, 1)'}
                              activeButtonBackgroundColor={'rgba(255, 255, 255, 1)'}
                              inactiveButtonBackgroundColor={'rgba(255, 255, 255, 1)'}
                              switchWidth={60}
                              switchHeight={30}
                              switchBorderRadius={10}
                              switchBorderColor={'rgba(0, 0, 0, 1)'}
                              switchBorderWidth={0}
                              buttonWidth={25}
                              buttonHeight={25}
                              buttonBorderRadius={20}
                              buttonBorderColor={'rgba(0, 0, 0, 1)'}
                              buttonBorderWidth={0}
                              animationTime={10}
                              padding={true}
                              onChangeValue={(value) => {
                                console.log(value);
                              }}
                              style={{width:10,height:5,}}
                      />
                  </View>
              </View>
          </View>
          <View style={{flex:1.2,backgroundColor:'transparent'}}>
              <View style={{flex:1,marginLeft:20,marginRight:20,marginBottom:10,borderWidth:2,borderColor:'#ffffff'}}>
                  <View style={{flex:2,flexDirection:'row',}}>
                      <Text style={{width:70,height:30,fontWeight:'400',fontSize:22,color:'#ffffff',marginTop:20,marginLeft:30,}}>
                          Time:
                      </Text>
                      <View style={{flexDirection:'column',marginTop:10,}}>
                          <TouchableOpacity activeOpacity={0.9} onPress={()=>this.HplusButton()}>
                              <Image style={styles.buttonupstyle}
                                  source={require('../Assets/button+.png')}
                                  />
                          </TouchableOpacity>
                          <Image style={styles.buttonImagestyle}
                              source={require('../Assets/button.png')}
                            >
                            <Text style={{textAlign:'center'}}>{this.state.Hnumber}</Text>
                            </Image>
                          <TouchableOpacity activeOpacity={0.9} onPress={()=>this.HminuseButton()}>
                              <Image style={styles.buttondownstyle}
                                  source={require('../Assets/button-.png')}
                                  />
                          </TouchableOpacity>
                      </View>
                      <View style={{flexDirection:'column',marginTop:10,marginLeft:10,}}>
                          <TouchableOpacity activeOpacity={0.9} onPress={()=>this.MplusButton()}>
                              <Image style={styles.buttonupstyle}
                                  source={require('../Assets/button+.png')}
                                  />
                          </TouchableOpacity>
                          <Image style={styles.buttonImagestyle}
                              source={require('../Assets/button.png')}
                            >
                            <Text style={{textAlign:'center'}}>{this.state.Mnumber}</Text>
                            </Image>
                          <TouchableOpacity activeOpacity={0.9} onPress={()=>this.MminuseButton()}>
                              <Image style={styles.buttondownstyle}
                                  source={require('../Assets/button-.png')}
                                  />
                          </TouchableOpacity>
                      </View>
                      <TouchableOpacity style={{marginLeft:20,marginTop:20,height:30,width:40,backgroundColor:'#d6d6d6',}} activeOpacity={0.8} onPress={()=>this.APButton()}>
                          <Text style={{marginTop:5,textAlign:'center',}}>{this.state.ap}</Text>
                      </TouchableOpacity>
                  </View>
                  <View style={{flex:1,flexDirection:'row'}}>
                      <Text style={{fontWeight:'300',fontSize:16,color:'#ffffff',marginTop:10,marginLeft:30,}}>
                          Snooz:
                      </Text>
                      <TextInput
                            style={{height: 20, width: 30, marginLeft: 30,marginTop: 10,borderColor: '#000000', borderWidth: 1, backgroundColor: '#ffffff'}}
                            onChangeText={(text) => this.setState({text})}
                            value={this.state.text}
                      />
                      <Text style={{fontWeight:'300',fontSize:16,color:'#ffffff',marginTop:10,marginLeft:20,}}>
                          minutes
                      </Text>
                  </View>
              </View>
          </View>
          <View style={{flex:1.4,backgroundColor:'transparent'}}>
              <View style={{flexDirection:'row',flex:1,marginLeft:20,marginRight:20,marginBottom:10,borderWidth:2,borderColor:'#ffffff'}}>
                  <Text style={{fontWeight:'300',fontSize:16,color:'#ffffff',marginTop:10,marginLeft:30,}}> Sound:</Text>
                  <View style={{marginBottom:10,marginRight:20,flex:1,marginTop:10,marginLeft:10,backgroundColor:'transparent'}}>
                    <Text style={{borderWidth:1,height:25,borderColor:'#000000',backgroundColor:'#ffffff'}}>{this.state.soundText}</Text>
                    <ListView style={{flex:1,backgroundColor:'#ffffff'}}
                      dataSource={this.state.dataSource}
                      renderRow={(rowData) => <TouchableHighlight onPress={()=>this.showText(rowData)}><Text>{rowData}</Text></TouchableHighlight>}
                    />
                  </View>
              </View>
          </View>
          <View style={{flex:1,flexDirection:'row',backgroundColor:'transparent'}}>
              <Button style={{fontSize: 20, color: '#4a90e2',fontWeight:'300',}}
                containerStyle={styles.cancel}
                  >
                Cancel </Button>
                <Button style={{fontSize: 20, color: '#4a90e2',fontWeight:'300',}}
                  containerStyle={styles.save}
                  onPress={()=>
                      navigate('configt',{name:'config2'})
                    }
                    >
                  Save </Button>
          </View>
      </View>
    );
  }
}
