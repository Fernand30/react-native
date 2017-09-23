import React from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  TabBarIOS,
  StatusBar
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import { Actions } from 'react-native-router-flux';
import Metalcalc from '../calculator/metalcalc.js';
import Scrap from '../scrap/scrap.js';
const unSelectCal = require('../../assets/images/unselectedCalc.png');
const selectedCal = require('../../assets/images/selectedCalc.png');
const unSelectScrape = require('../../assets/images/unselectedScrap.png');
const selectedScrape = require('../../assets/images/selectedScrap.png');
const selectedFixes = require('../../assets/images/selectedFixes.png');
const unselectedFixes = require('../../assets/images/fixes.png');
const selectedAccount = require('../../assets/images/selectedAccountFixes.png');
const unselectedAccount = require('../../assets/images/myAccount.png');
const selectedMore = require('../../assets/images/selectedMore.png');
const unselectedMore = require('../../assets/images/more.png');

const backGroundImage = require('../../assets/images/background.png');
global.loginCheck = 0;
export default class Home extends React.Component{
  constructor() {
    super();
    this.state={
      selectedTab: 'calc'
    };
  }
  render() {
    const titleConfig = {
      title:'Metal Calculator'
    }

    return (
      <View style={styles.container}>
        <TabBarIOS
          unselectedTintColor="white"
          tintColor="yellow"
          barTintColor="#272727"
        >
          <TabBarIOS.Item
              icon={unSelectCal}
              selectedIcon={selectedCal}
              selected={this.state.selectedTab === 'calc'}
              onPress={() => {
                this.setState({
                  selectedTab: 'calc',
                });
              }}
              title='Calculator'
              >
              <Metalcalc />
          </TabBarIOS.Item>

          <TabBarIOS.Item
              icon = {unSelectScrape}
              selectedIcon = {selectedScrape}
              selected = {this.state.selectedTab === 'scrap'}
              onPress={() => {
                this.setState({
                  selectedTab: 'scrap',
                });
              }}
              title='Scrap'>
              <Scrap />
          </TabBarIOS.Item>

          <TabBarIOS.Item
              icon={unselectedFixes}
              selectedIcon = {selectedFixes}
              selected={this.state.selectedTab === 'fixes'}
              onPress={() => {
                this.setState({
                  selectedTab: 'fixes',
                });
              }}
              title='Fixes'>
              <View style={styles.text}>
                  <Text >Fixes</Text>
              </View>
          </TabBarIOS.Item>

          <TabBarIOS.Item
              icon = {unselectedAccount}
              selectedIcon = {selectedAccount}
              selected={this.state.selectedTab === 'acc'}
              onPress={() => {
                this.setState({
                  selectedTab: 'acc',
                });
              }}
              title='My Account'>
              <View style={styles.text}>
                  <Text >My Account</Text>
              </View>
          </TabBarIOS.Item>

          <TabBarIOS.Item
              systemIcon = "more"
              selected={this.state.selectedTab === 'more'}
              onPress={() => {
                this.setState({
                  selectedTab: 'more',
                });
              }}
              title='More'>
              <View style={styles.text}>
                  <Text >More</Text>
              </View>
          </TabBarIOS.Item>
        </TabBarIOS>
      </View>
   )
 }
}
const styles =  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5f5f5f',
  },
  image:{
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'stretch'
  },
  tabbar: {
  },
})
module.exports = Home;
