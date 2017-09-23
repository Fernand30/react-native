import React from 'react'
import {
    TouchableOpacity,
    FlatList,
    ScrollView,
    StyleSheet,
    Image,
    Text,
    TextInput,
    Navigator,
    RefreshControl,
    View,
    Easing,
    Keyboard,
    StatusBar,
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import { Actions } from 'react-native-router-flux';
import TabBar from 'react-native-xtabbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { NavigationActions } from 'react-navigation'
import FlipView from 'react-native-flip-view'
import Settings from '../settings/settings.js';

const tennis = require('../../assets/images/master.png');
var SHA256 = require("crypto-js/sha256");
var CryptoJS = require("crypto-js");
var time = "";
var hmac = "";
var responseDataP = "";

export default class Metalcalc extends React.Component{

  constructor(props){
    super(props);
    this.arrayGMS = {};
    global.tempArray= [];
    this.initPrice = [];
    this.state = {
      totalPrice: '0.00',
      isFlipped: false,
      initGMS: [],
      initCost:[],
      initAmount:[],
    };
  }
  _refresh() {
      return new Promise((resolve) => {
        setTimeout(()=>{resolve()}, 500)
      });
    }
onPullRelease(resolve) {
  setTimeout(() => {
          resolve();
      }, 10);
}
  resolve(){
    alert('refresh');
  }
  componentDidMount(){
    time = Date.now();
    global.tempObject = this;
    this.checkApiStatus(time)

  }
  checkApiStatus(time){

          var hmac_key = {"debug":"0","nonce":"9f05655880f0c8a9d45114ea7ed06b33","time":{time},"request": {
                                                    "getRawData": {
                                                                    "UTC": {time},
                                                                    "model": "fix_prices",
                                                                    "action": "getRawData"
                                                                  }
                                       },"endpoint_url": "http://api.mastermeltgroup.com/api/json"};
          hmac = CryptoJS.HmacSHA256(hmac_key,"Jsdb3hSD73hbds");
          var jsonPostData = JSON.stringify({
                   "data": {
                             "debug": "0",
                             "nonce": "9f05655880f0c8a9d45114ea7ed06b33",
                             "time": {time},
                             "request": {
                                         "getRawData": {
                                                         "UTC": {time},
                                                         "model": "fix_prices",
                                                         "action": "getRawData"
                                                       }
                            },
                             "endpoint_url": "http://api.mastermeltgroup.com/api/json"
                  },
                   "shared_key": "Ksdu3jknasd89sd",
                   "hash": {hmac}
                 });

          fetch('http://mmtest.miribase.com/api/json', {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: jsonPostData
              }).then((response) => response.json())
                .then((responseData) => {
                                         console.log("inside responsejson");
                                         console.log('response object:',responseData)
                                         responseDataP = responseData;
                                         //alert(responseData.VSM)
            }).done();
        }
  changeArrayGMS(id){
    this.arrayGMS[id] = {price: this.state.initCost[id], amount: this.state.initAmount[id]};
    this.changeGMS(id);
  }
  changeGMS(id){
    if(!global.Value) global.Value = 0;
    if(!global.troyOZ) global.troyOZ = 1;
    var amount = this.state.initAmount[id];
    var intPrice = 0;
    var floatPrice = 0;
    if(parseFloat(this.state.initCost[id]) > 0 && parseFloat(amount) > 0){
      if(global.marginFlag == 0 || !global.marginFlag){
        floatPrice = parseFloat(this.state.initCost[id]) * parseFloat(amount) * global.troyOZ;
      }
      else{
        floatPrice = parseFloat(this.state.initCost[id]) * parseFloat(amount) * global.Value  * global.troyOZ / 100;
      }
        intPrice = Math.round(floatPrice*100)/100;
    }
    if(intPrice == 0)
      this.initPrice[id] = '0.00';
      else
      this.initPrice[id] = intPrice.toString();
    this.setState({
      totalPrice: this.getTotalPrice(),
    })
  }

  getTotalPrice(){
    var totalPrice = 0;
    var keys = Object.keys(this.arrayGMS);
    for (var i = 0; i < keys.length; i++) {
      var item = this.arrayGMS[keys[i]];
      if(parseFloat(item.price)>0 && parseFloat(item.amount)>0)
      if(global.marginFlag == 0 || !global.marginFlag){
        totalPrice += item.price * item.amount  * global.troyOZ;
      }
      else {
        totalPrice += item.price * item.amount * global.Value  * global.troyOZ / 100;
      }
    }
    var completePrice = Math.round(totalPrice*100)/100;
    if(completePrice == 0)
    return '0.00';
    else
    return completePrice.toString();
  }
  tempFunc(id, text){
    this.state.initAmount[id] = text;
    this.changeArrayGMS(id);
  }
  handle_reset(){
    this.state.initGMS = [];
    this.initPrice = [];
    this.state.initAmount = [];
    this.setState({
      totalPrice: '0.00',
    })
  }

  handle_settings(){
    this.setState({
      isFlipped: true,
    })
  }

  onPressBack(){
    var keys = Object.keys(global.tempArray);
    for (var i = 0; i < keys.length; i++) {
      this.changeGMS(keys[i]);
    }
    this.setState({
      isFlipped: false,
      totalPrice: this.getTotalPrice(),
    });
  }
  renderHome = () => {
    const titleConfig = {
      title:'SCRAP PRICES',
      style:{fontSize:20,fontWeight:'600'},
      tintColor:"#ffffff",
    }
    const rightNavBtnConfig = (
      <View style={styles.rightNavButton}>
        <TouchableOpacity onPress = {this.handle_settings.bind(this)}>
          <Icon name="cog" style={styles.b_settings}/>
        </TouchableOpacity>
      </View>
    )
    const statusBarConfig = {
      style:"light-content",
      tintColor : "white",
      backgroundColor:"black"
    }

    const array_test = {
    "SC": 200,
    "VSM": "OK",
    "getRawData": {
        "response": {
            "scrap_prices": {
                "data": [{
                    "id": "531",
                    "name": "Silver HM",
                    "type": "AGHM",
                    "price": "336.53",
                    "deleted": "0",
                    "created": "1970-01-01 00:00:00",
                    "updated": "2017-07-26 21:12:03"
                }, {
                    "id": "532",
                    "name": "Full Sovereign",
                    "type": "COINSFS",
                    "price": "218.09",
                    "deleted": "0",
                    "created": "1970-01-01 00:00:00",
                    "updated": "2017-07-26 21:12:03"
                }, {
                    "id": "533",
                    "name": "Krugerrand",
                    "type": "COINSKRG",
                    "price": "928.01",
                    "deleted": "0",
                    "created": "1970-01-01 00:00:00",
                    "updated": "2017-07-26 21:12:03"
                }, {
                    "id": "534",
                    "name": "1\/2 QEII Sovereign",
                    "type": "COINSQE2",
                    "price": "109.04",
                    "deleted": "0",
                    "created": "1970-01-01 00:00:00",
                    "updated": "2017-07-26 21:12:03"
                }, {
                    "id": "535",
                    "name": "Palladium 85%",
                    "type": "PD85",
                    "price": "17.60",
                    "deleted": "0",
                    "created": "1970-01-01 00:00:00",
                    "updated": "2017-07-26 21:12:03"
                }, {
                    "id": "536",
                    "name": "HM Platinum",
                    "type": "PTHM",
                    "price": "19.36",
                    "deleted": "0",
                    "created": "1970-01-01 00:00:00",
                    "updated": "2017-07-26 21:12:03"
                }, {
                    "id": "537",
                    "name": "14ct HM Gold",
                    "type": "14CTHM",
                    "price": "17.45",
                    "deleted": "0",
                    "created": "1970-01-01 00:00:00",
                    "updated": "2017-07-26 21:12:03"
                }, {
                    "id": "538",
                    "name": "18ct HM Gold",
                    "type": "18CTHM",
                    "price": "22.37",
                    "deleted": "0",
                    "created": "1970-01-01 00:00:00",
                    "updated": "2017-07-26 21:12:03"
                }, {
                    "id": "539",
                    "name": "22ct HM Gold",
                    "type": "22CTHM",
                    "price": "27.33",
                    "deleted": "0",
                    "created": "1970-01-01 00:00:00",
                    "updated": "2017-07-26 21:12:03"
                }, {
                    "id": "540",
                    "name": "9ct HM Gold",
                    "type": "9CTHM",
                    "price": "11.18",
                    "deleted": "0",
                    "created": "1970-01-01 00:00:00",
                    "updated": "2017-07-26 21:12:03"
                }],
                "SC": "200",
                "VSM": "OK"
                }
            }
        }
    }
    that = this;
    var jsonData = array_test.getRawData.response.scrap_prices.data.map(function(item) {
          that.state.initCost[item.id] = item.price;
          global.tempArray[item.id] = that.state.initCost[item.id];
          return (
                    <View style={styles.v_listitem} key={item.id}>
                        <Text style={styles.t_item_name}>{item.name}</Text>
                        <Text style={styles.t_item_price}>£{item.price}/g</Text>
                        <Text style={styles.t_item_tox_price}>£{item.price}/tox</Text>
                    </View>
                );
  });
  var lastDate = array_test.getRawData.response.scrap_prices.data[0].updated;

    return (

          <View style={styles.container}>
                <NavigationBar
                  style={styles.navbar}
                  title={titleConfig}
                  rightButton = {rightNavBtnConfig}

                />
                      <View style={styles.logo}>
                          <Image source={tennis} style={styles.presmanlogo}/>
                      </View>
                      <View style={styles.v_listupdated}>
                          <Text style={styles.t_lastupdated}>Source London Bullion Market</Text>
                          <Text style={styles.t_lastupdated}>Prices last updated  {lastDate}</Text>
                      </View>

                      <ScrollView style={styles.calc_scrollview}
                          contentInset={{bottom: 0}}
                          refreshControl={
                            <RefreshControl
                                refreshing={false}
                                tintColor="#EBEBEB"
                                title="Waiting..."
                                colors={['#ff0000', '#00ff00', '#0000ff']}
                                progressBackgroundColor="#EBEBEB"
                                contentContainerStyle={[styles.keyboardContainer, {backgroundColor: 'purple'}]}
                            />
                          }
                        >
                          {jsonData}
                        </ScrollView>

                      <View style={styles.notifycation}>
                        <Text style={styles.notifyText_1}>Prices are based on the payable at Presmanss trade counter</Text>
                        <Text style={styles.notifyText_2}>at the date/time shown above</Text>
                      </View>
          </View>
   )
 }

 renderSetting = () => {
   return(
     <Settings onPressBack={()=>this.onPressBack()}/>
   );
 }

 render(){
   return (
      <FlipView style={{flex: 1}}
                front={this.renderHome()}
                back={this.renderSetting()}
                isFlipped={this.state.isFlipped}
                onFlipped={(val) => {console.log('Flipped: ' + val);}}
                flipAxis="y"
                flipEasing={Easing.out(Easing.ease)}
                flipDuration={500}
                perspective={1000}/>
    );
 }
}
const styles =  StyleSheet.create({
  container: {
    flex: 1
  },
  calc_scrollview:{
    marginTop : 0,
    flex:0.8,
  },
jsonMoneyUnit:{
  marginLeft:20,
  marginTop:13,
  backgroundColor:'transparent',
  color:'#ffffff',
  fontWeight:'500',
  fontSize:18,
},
  t_lastupdated: {
    textAlign:'center',
    color:'#ffffff',
  },
  price: {
    marginTop:10,
    marginLeft:60,
    backgroundColor:'transparent',
    fontSize:18,
    fontWeight:'600',
    color:'#ffffff'
  },
  weight: {
    marginTop:10,
    justifyContent:'flex-end',
    backgroundColor:'transparent',
    fontSize:18,
    fontWeight:'600',
    color:'#ffffff'
  },
  navbar: {
    backgroundColor:"#272727",
    height:50
  },
  rightNavButton: {
    padding:10
  },
  b_settings:{
    color: "#787878",
    alignSelf:'center',
    fontSize: 25,
    marginTop:4,
  },
  logo:{
    alignItems:'center',
    height:50,
    paddingTop:5,
    paddingLeft:50,
  },
  presmanlogo:{
    width:250,
    height:40,
    resizeMode:'stretch',
    alignItems:'center',
  },
  v_listupdated:{
    backgroundColor:"transparent",
  },

  t_listupdated:{

  },
  totalCalculation:{
    borderTopWidth:2,
    borderTopColor:'#fcc900',
    marginLeft:20,
    marginRight:20,
    flex:0.1,
    flexDirection:'row',
  },
  notifycation:{
    borderTopWidth:1,
    borderTopColor:'#fcc900',
    marginLeft:23,
    marginRight:23,
    flex:0.35,
    paddingLeft:10,
  },
  v_listitem:{
    height:50,
    flexDirection:"row",
    flex: 1,
    borderBottomWidth:1,
    borderBottomColor:'#fcc900',
    borderStyle:'solid',
    marginLeft:23,
    marginRight:23,
  },
  notifyText_1:{
    backgroundColor:'transparent',
    fontSize:11,fontWeight:'500',
    color:'#ffffff',
    marginTop:55,
  },
  notifyText_2:{
    backgroundColor:'transparent',
    fontSize:11,fontWeight:'500',
    color:'#ffffff',
    marginTop:2,
  },
  t_item_tox_price:{
    paddingTop:15,
    backgroundColor:'transparent',
    color:'#ffffff',
    fontSize:17,
    fontWeight:'600',
    flex: 1.2,
    textAlign:'right',
  },
  t_item_name:{
    paddingTop:15,
    backgroundColor:'transparent',
    color:'#ffffff',
    fontSize:17,
    fontWeight:'600',
    flex: 2,
  },
  t_item_price:{
    paddingTop:15,
    backgroundColor:'transparent',
    color:'#ffffff',
    fontSize:17,
    fontWeight:'600',
    flex: 1.2,
  },
  t_item_input:{
    alignSelf:"center",
    width:120,
    height:36,
    borderRadius:15,
    borderWidth:1,
    borderColor:'#000000',
    backgroundColor:'#9e9e9f',
    paddingTop:5,
    paddingBottom:5,
    paddingRight:5,
    paddingLeft:15,
    color:'#000000',
    fontSize:18,
  },
  t_item_name_total_1:{
    alignSelf:"center",
    padding:5,
    fontWeight:'600',
    color:'#ffffff',
    marginLeft:135,
    backgroundColor:'transparent',
    fontSize:18,
  },
  t_item_name_total_2:{
    alignSelf:"center",
    paddingTop:0,
    marginLeft:2,
    fontWeight:'600',
    color:'#ffffff',
    backgroundColor:'transparent',
    fontSize:18,
  },
  t_item_name_total_3:{
    alignSelf:"center",
    fontWeight:'600',
    color:'#ffffff',
    width:90,
    backgroundColor:'transparent',
    fontSize:18,
    textAlign:'left',
  },
})
module.exports = Metalcalc;
