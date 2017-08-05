import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
} from 'react-native';
import styles from '../css/style'
import SoundPlayer from 'react-native-sound-player';
import PercentageCircle from 'react-native-percentage-circle'

import * as Progress from 'react-native-progress';
import TimerMixin from 'react-timer-mixin';
import  moment from 'moment';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import Button from 'react-native-button';
var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];
var dayNames = [
    "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday", "Sunday"
  ];
  var CircularProgressDisplay = require('react-native-progress-circular');
  var sound = require('react-native-sound');
  sound.setCategory('Playback');
  var whoosh = new sound('./alert.mp3',sound.MAIN_BUNDLE,(error)=>{
    if(error){
      console.log('failed o load the sound',error);
      return;
    }
  });
  export default class survey extends Component {

  constructor(props){
    super(props);
    try {
      SoundPlayer.play('./alert.mp3', 'mp3');
    } catch (e) {
      console.log(`cannot play the sound file`, e);
    }
    var date_obj = new Date();
    var minute = date_obj.getMinutes();
    var hour = date_obj.getHours();
    var amPM = (hour > 11) ? "pm" : "am";
    if(hour > 12) {
      hour -= 12;
    } else if(hour == 0) {
      hour = "12";
    }
    if(minute < 10) {
      minute = "0" + minute;
    }
    this.state = {
      progress: 0,
      indeterminate: true,
      curTime:0,
      progressValue:0,
      curDisplayH : hour,
      curDisplayM : minute,
      curDisplayA : amPM,
      curYear : new Date().getFullYear(),
      curDate : new Date().getDate(),
      curDay : new Date().getDay(),
      curMonth : new Date().getMonth(),
    }
  }
  getInitialState(){
    return {progress:0}
  }
  componentDidMount() {

    let progress=0;
    let progressValue =0;
    this.setState({progress});
    setTimeout(()=>{
      this.setState({indeterminate:false});
      setInterval( () => {
        progress+=Math.random()/5;
        if(progress>1){
          progress = 1;
        }
        progressValue ++;
        if(progressValue == 100)
        progressValue = 0;
        var date_obj = new Date();
        var minute = date_obj.getMinutes();
        var hour = date_obj.getHours();
        var amPM = (hour > 11) ? "pm" : "am";
        if(hour > 12) {
          hour -= 12;
        } else if(hour == 0) {
          hour = "12";
        }
        if(minute < 10) {
          minute = "0" + minute;
        }
        this.setState({
          curYear : new Date().getFullYear(),
          curDate : new Date().getDate(),
          curDay : new Date().getDay(),
          curMin : new Date().getMinutes(),
          curMonth : new Date().getMonth(),
          curDisplayH : hour,
          curDisplayM : minute,
          curDisplayA : amPM,
          startAngle:0,
          angleLength:100,
          fill:'',
          pro:progressValue,
        });
      },1000);
    });
  }
  static navigationOptions = {
    title: 'Back',
    header:null,

  };
  _handlePress(event) {
    //this.props.navigator.push({id: "surveysecond"});
  };

  render() {
    const { navigate } = this.props.navigation;
    var progress = this.state.progress;
    // displayed inside of the component
    var innerDisplay = (
      <View style={{width: 200, height: 200, flex:1, justifyContent: 'center',
      alignItems: 'center', backgroundColor: '#036282'}}>
        <Text style={{fontSize: 30}}>{progress + "%"}</Text>
      </View>
    );
    return (
      <View style={styles.container}>
          <View style={styles.maskheader}>

              <Image style={styles.imagestyle}
                source={require('../Assets/LogoSample.png')}
              />
              <Text style ={styles.textstyle}>
                DAILY  SURVEY
              </Text>
          </View>
          <View style={styles.bodycontainer}>
            <View style={{flex:1}}>
              <View style={{flexDirection:'row',justifyContent: 'center',marginTop:20,}}>
                <Text style = {styles.hourText}>{this.state.curDisplayH} : {this.state.curDisplayM}</Text>
                <Text style = {styles.monthText}>{this.state.curDisplayA}</Text>
              </View>
              <Text  style={{textAlign: 'center',marginTop:5,color:'#a8a8a8',}}>{dayNames[this.state.curDay]}, {monthNames[this.state.curMonth]} {this.state.curDate}, {this.state.curYear}</Text>
            </View>
            <View style={{flex:2,alignItems: 'center',marginTop:20,}}>
              <AnimatedCircularProgress
                size={170}
                width={14}
                fill={100}
                tintColor="#f9ca57"
                rotation={0}
                backgroundColor="#f8f8f8"
              >
              {
                (fill) =>(
                  <View style = {styles.pointView}>
                  <Text style = {styles.points1}>Next feedback in</Text>
                  <Text style = {styles.points2}>30</Text>
                  <Text style = {styles.points3}>MINUTES</Text>
                  </View>
                )
              }
              </AnimatedCircularProgress>
            </View>
            <View style={{flex:2,alignItems:'center',marginBottom:0,}}>
              <Button
                style={{fontSize: 19, color: '#ffffff',fontWeight:'200'}}
                containerStyle={{shadowOpacity:1.0,shadowRadius:25,padding:20,marginTop:15,height:60,width:270, overflow:'hidden', borderRadius:35, backgroundColor: '#3c7fce'}}
                onPress={()=>
                    navigate('surveysecond',{name:'surveysecond'})
                  }
              >
                GO TO SURVEY
              </Button>

              <Text  style={styles.lastText}>Last feedback was 4 days ago</Text>
            </View>
          </View>
      </View>
    );
  }
}
