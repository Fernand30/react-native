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
import styles from '../css/second'
import Button from 'react-native-button'

var DEFAULT_VALUE = 0.2;
var SliderContainer = React.createClass({
  getInitialState() {
    return {
      value: DEFAULT_VALUE,
    };
  },

  render() {
    var value = this.state.value;

    return (
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.caption} numberOfLines={1}>{this.props.caption}</Text>
          <Text style={styles.value} numberOfLines={1}>{value}</Text>
        </View>
        {this._renderChildren()}
      </View>
    );
  },

  _renderChildren() {
    return React.Children.map(this.props.children, (child) => {
      if (child.type === Slider
          || child.type === ReactNative.Slider) {
        var value = this.state.value;
        return React.cloneElement(child, {
          value: value,
          onValueChange: (val) => this.setState({value: val}),
        });
      } else {
        return child;
      }
    });
  },
});
export default   class surveysecond extends Component {
  constructor(props){
    super(props);
    var payment = [];

    for(let i = 0; i <= 10; i++){
      payment.push(
        <Text style ={{marginLeft:21,fontSize:8,fontWeight:'100',color:"#bfbfbf"}}>{i}</Text>
      )
    }
    this.state = {
      age: 10
    }

    }
    static navigationOptions = {
      title: 'Back',
      header:null,
    };
    getVal(val){
      //console.warn(val);
    };
    getInitialState()
    {
      return{
        value:2,
      };
    };
    showTextArray(){
      var payment = [];
      for(let i = 0; i <= 10; i++){
        //payment.push(<Text style = {{marginLeft:22,fontSize:12,fontWeight:'200',color:'#bfbfbf'}}>{i}</Text>)
      }
      return payment;
    }

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
              source={require('../Assets/bodyCheck.png')}
            />
          </View>
          <View style={styles.textView}>
              <Text style={{textAlign:'center',fontSize:24,fontWeight:'400',marginTop:25}}>What your overall health status?</Text>
          </View>
          <View style={styles.smallTextView}>
            <View style={{flex:1,}}>
                <Text style={{textAlign:'left',fontSize:12,fontWeight:'500',marginTop:35,marginLeft:20,}}>Worst</Text>
            </View>
            <View style={{flex:1,alignItems:'flex-end',}}>
                <Text style={{fontSize:12,fontWeight:'200',marginTop:35,marginRight:20,}}>Best</Text>
            </View>
          </View>
          <View style={styles.sliderView}>
              <Image source={require('../Assets/ruler.png')} style={{opacity:0.4,position:'absolute',marginTop:5,marginLeft:30,width:300,resizeMode:'contain'}}>
              </Image>
              <View style={{flex:1,marginTop:20,marginLeft:15,marginRight:20,}}>
                <Slider
                     style={12}
                     step={1}
                     thumb=''
                     minimumValue={18}
                     maximumValue={71}
                     vertical='ture'
                     track='height:30,borderRadius:10'
                     value={this.state.age}
                     onValueChange={val => this.setState({ age: val })}
                     onSlidingComplete={ val => this.getVal(val)}
                />
              </View>

          </View>
          <View style={styles.underView}>
            <View style={{flex:1,alignItems:'flex-start'}}>
              <Button style={styles.leftButton}
                      containerStyle={{backgroundColor:'transparent'}}
                      onPress={()=>
                          navigate('Home',{name:'home'})
                        }
              > &#60; Back</Button>
            </View>
            <View style={{flex:2,}}>
                <View style={{flexDirection:'row',flex:1.2,alignItems:'flex-end'}}>
                  <View style={{alignItems:'center',flex:1}}>
                    <View style={styles.circle1} />
                  </View>
                  <View style={{alignItems:'center',flex:1}}>
                    <View style={styles.circle2} />
                  </View>
                  <View style={{alignItems:'center',flex:1}}>
                    <View style={styles.circle3} />
                  </View>
                  <View style={{alignItems:'center',flex:1}}>
                    <View style={styles.circle4} />
                  </View>
                  <View style={{alignItems:'center',flex:1}}>
                    <View style={styles.circle5} />
                  </View>
                </View>
                <View style={{flex:1,}}>
                      <Text style={{textAlign:'center',fontWeight:8,fontWeight:'300',color:'#bcbec0',marginTop:5}}>
                        4 of 5
                      </Text>
                </View>
            </View>
            <View style={{alignItems:'center',flex:1,alignItems:'flex-end',}}>
              <Button style={styles.rightButton}
                      containerStyle={{backgroundColor:'transparent'}}
                      onPress={()=>
                          navigate('surveywizard2',{name:'surveywizard2'})
                        }
              > Next &#62;</Button>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
