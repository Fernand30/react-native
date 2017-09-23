import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  TextInput,
  Slider,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import { Actions } from 'react-native-router-flux';
import Switch from 'react-native-customisable-switch';
import TimerEnhance from 'react-native-smart-timer-enhance'
import PullToRefreshListView from 'react-native-smart-pull-to-refresh-listview'
import metalcalc from '../calculator/metalcalc.js'
var marginFlag = 0;
const backGroundImage = require('../../assets/images/background.png');
export default class settings extends Component {
  constructor(props){
    super(props);
    if(!global.Value) global.Value = 0;
    this.state = {
      value: global.Value,
      textValue: String(global.Value),
      marginValue:global.marginFlag,
    };
  }
  componentDidMount(){

  }
  getVal(val){
    this.setState({value:val,textValue:String(val)});
    global.globalVariabl = val;
    global.Value = val;
  }
  troyOZ(val){
    if(val)
      global.troyOZ = 0.3;
    else global.troyOZ = 1;
  }
  inputTextChange(text){
    this.setState({textValue:text,value:Number.parseInt(text)});
    global.globalVariabl = Number.parseInt(text);
  }
  passwordLayout(){
    var returnLayout = <View style={{flexDirection:'row',justifyContent:'space-between',}}>
                          <Text style={styles.passwordLayout}>Change Password</Text>
                          <TouchableOpacity>
                            <Text style={styles.passwordLayoutText}>&#62;</Text>
                          </TouchableOpacity></View>
    if(global.loginCheck)
        return returnLayout;
    else return <View/>
  }
  logoutLayout(){
    var returnLayout = <View style={{flexDirection:'row',justifyContent:'space-between',}}>
                        <Text style={styles.passwordLayout}>Logout</Text>
                        <TouchableOpacity>
                          <Text style={styles.passwordLayout}>&#62;</Text>
                        </TouchableOpacity></View>
    if(global.loginCheck)
        return returnLayout;
    else return <View/>
  }
  render() {
    const titleConfig = {
      title: 'SETTINGS',
      tintColor:'#ffffff',
      style:{fontSize:20,fontWeight:'700'}
    }
    const leftButtonConfig = {
      title: 'BACK',
      tintColor:'#808080',
      style: {backgroundColor:'transparent',height:12},
      handler: () => {this.props.onPressBack()},
    };
    return (
    <View style={styles.container}>
    <NavigationBar
        style={{backgroundColor:'#272727',}}
        title={titleConfig}
        leftButton={leftButtonConfig}/>
      <Image source={backGroundImage} style={styles.image}>

        <View style={styles.marginSettings}>
          <Text style={styles.marginSettingsText}>
            Margin Settings
            </Text>
        </View >
        <View style={styles.addMarkup}>
          <Text style={styles.addMarkupText}>
          Add Markup Margin:
            </Text>
            <View style={{alignSelf:'flex-start'}}>
                <Switch
                        activeBackgroundColor={'#fcc900'}
                        inactiveBackgroundColor={'transparent'}
                        activeButtonBackgroundColor={'rgba(255, 255, 255, 1)'}
                        inactiveButtonBackgroundColor={'rgba(255, 255, 255, 1)'}
                        switchWidth={50}
                        switchHeight={30}
                        switchBorderRadius={15}
                        switchBorderColor={'rgba(200, 200, 200, 1)'}
                        switchBorderWidth={1}
                        buttonWidth={30}
                        buttonHeight={30}
                        buttonBorderWidth={1}
                        buttonBorderColor={'rgba(200, 200, 200, 1)'}
                        buttonBorderRadius={15}
                        animationTime={10}
                        padding={false}
                        value={this.state.marginValue}
                        onChangeValue={(value) => {
                          if(value) global.marginFlag = 1; else global.marginFlag = 0;
                              var keys = Object.keys(global.tempArray);
                              for(var i = 0; i<keys.length;i++){
                                global.tempArray[keys[i]] = global.tempArray[keys[i]] / 2;
                              }
                        }}
                />
            </View>
        </View>
        <View style={styles.setMarkupAmount}>
            <View style={styles.setMarkupBody}>
                  <Text style={styles.setMarkupText}>
                      Set Markup Amount
                  </Text>
                <View>
                  <TextInput style={styles.setMarkupValue} onChangeText={(text) => this.inputTextChange(text)} value={this.state.textValue}/>
                  <Text style={styles.setMarkupProLabel}> % </Text>
                </View>
            </View>
            <View style={styles.sliderLabel}>
              <Text style={styles.sliderLabelText}>0%</Text>
              <Text style={styles.sliderLabelText}>50%</Text>
              <Text style={styles.sliderLabelText}>100%</Text>
            </View>
            <View style={styles.sliderView}>
                <View style={styles.sliderStartVerticalLine}/>
                <View style={{flex:80}}>
                <Slider
                   style={{ }}
                   step={1}
                   minimumTrackTintColor='#fcc900'
                   maximumTrackTintColor='#fcc900'
                   minimumValue={0}
                   maximumValue={100}
                   value={this.state.value}
                   onValueChange={val => this.getVal(val)}
                   onSlidingComplete={ val => this.getVal(val)}
                />
                </View>
                <View style={styles.sliderEndVerticalLine}/>
            </View>
        </View>
        <View style={styles.unitedSettins}>
            <Text style={styles.unitedSettingsText}>
              United Settings
              </Text>
        </View>
        <View style={styles.userTroyView}>
          <View style={styles.userTroyTextView}>
            <Text style={styles.userTroyText}>
              User Troy Oz (toxz)
              </Text>
              <View style={{alignSelf:'flex-start'}}>
                  <Switch
                          activeBackgroundColor={'#fcc900'}
                          inactiveBackgroundColor={'transparent'}
                          activeButtonBackgroundColor={'rgba(255, 255, 255, 1)'}
                          inactiveButtonBackgroundColor={'rgba(255, 255, 255, 1)'}
                          switchWidth={50}
                          switchHeight={30}
                          switchBorderRadius={17}
                          switchBorderColor={'rgba(200, 200, 200, 1)'}
                          switchBorderWidth={1}
                          buttonWidth={30}
                          buttonHeight={30}
                          buttonBorderWidth={1}
                          buttonBorderColor={'rgba(200, 200, 200, 1)'}
                          buttonBorderRadius={15}
                          animationTime={10}
                          padding={false}
                          onChangeValue={(value) => {
                            this.troyOZ(value);
                          }}
                  />
              </View>
          </View>
          <Text style={styles.myAccountText}>My Account</Text>
        </View>
        <View style={styles.passwordView}>
            {this.passwordLayout()}
        </View>
        <View style={styles.logoutView}>
            {this.logoutLayout()}
        </View>
        <View style={{flex:0.7}}>
        </View>
      </Image>
    </View>
    );
  }
}
const styles =  StyleSheet.create({
  container: {
    flex: 1,
  },
  image:{
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'stretch'
  },
  passwordLayout:{fontSize:18,fontWeight:'500'},
  passwordLayoutText:{fontSize:18,fontWeight:'500'},
  marginSettings:{
    marginLeft:30,
    marginRight:30,
    flex:0.6,
    borderBottomColor:'#fcc900',
    borderBottomWidth:2
  },
  marginSettingsText:{
    marginTop:10,
    fontSize:20,
    fontWeight:'700',
    color:'#ffffff',
    backgroundColor:'transparent'
  },
  addMarkup:{
    justifyContent: 'space-between',
    paddingTop:25,
    flexDirection:'row',
    marginLeft:30,
    marginRight:30,
    flex:0.5,
    borderBottomColor:'#fcc900',
    borderBottomWidth:1
  },
  addMarkupText:{
    fontSize:18,
    fontWeight:'500',
    color:'#ffffff',
    backgroundColor:'transparent'
  },
  setMarkupAmount:{
    paddingTop:15,
    marginLeft:30,
    marginRight:30,
    flex:1.8,
    borderBottomColor:'#fcc900',
    borderBottomWidth:1
  },
  setMarkupBody:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  setMarkupText:{
    marginTop:5,
    fontSize:18,
    fontWeight:'500',
    color:'#ffffff',
    backgroundColor:'transparent'
  },
  setMarkupValue:{
    backgroundColor:'#9e9fa0',
    width:70,
    height:30,
    borderRadius:13,
    borderWidth:1,
    borderColor:'#a1a1a2',
    paddingLeft:10,
    paddingRight:15
  },
  setMarkupProLabel:{
    backgroundColor:'transparent',
    position:'absolute',
    marginTop:5,
    marginLeft:50,
    fontSize:16,
    fontWeight:'600'
  },
  sliderLabel:{
    paddingBottom:20,
    paddingLeft:10,
    flex:0.5,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  sliderLabelText:{
    fontSize:18,
    fontWeight:'400',
    color:'#ffffff',
    backgroundColor:'transparent'
  },
  sliderView:{
    flexDirection:'row',
    justifyContent:'flex-end',
    paddingBottom:20,
    paddingLeft:20,
    paddingRight:10,
    flex:0.7,
  },
  sliderStartVerticalLine:{
    flex:0.05,
    marginTop:15,
    height:10,
    borderRightWidth:1,
    borderRightColor:'#fcc900'
  },
  sliderEndVerticalLine:{
    flex:0.05,
    marginTop:15,
    height:10,
    borderLeftWidth:1,
    borderLeftColor:'#fcc900'
  },
  unitedSettins:{
    marginLeft:30,
    marginRight:30,
    flex:0.8,
    borderBottomColor:'#fcc900',
    borderBottomWidth:2
  },
  unitedSettingsText:{
    marginTop:20,
    fontSize:22,
    fontWeight:'700',
    color:'#ffffff',
    backgroundColor:'transparent'
  },
  userTroyView:{
    marginLeft:30,
    marginRight:30,
    flex:1.5,
    borderBottomColor:'#fcc900',
    borderBottomWidth:2
  },
  userTroyTextView:{
    justifyContent: 'space-between',
    flexDirection:'row',
    marginTop:20,
    flex:1,
  },
  userTroyText:{
    fontSize:18,
    fontWeight:'500',
    color:'#ffffff',
    backgroundColor:'transparent'
  },
  myAccountText:{
    marginBottom:5,
    fontSize:22,
    fontWeight:'700',
    color:'#ffffff',
    backgroundColor:'transparent'
  },
  passwordView:{
    paddingTop:20,
    marginLeft:30,
    marginRight:30,
    flex:0.7,
    borderBottomColor:'#fcc900',
    borderBottomWidth:2
  },
  logoutView:{
    paddingTop:20,
    marginLeft:30,
    marginRight:30,
    flex:0.7,
    borderBottomColor:'#fcc900',
    borderBottomWidth:2
  },
})

AppRegistry.registerComponent('settings', () => settings);
