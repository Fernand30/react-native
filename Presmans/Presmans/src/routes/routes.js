import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Navigator,
} from 'react-native';
import {Router, Route, Schema, Animations, Scene,TabBar} from 'react-native-router-flux'

import Launch from '../components/register/launch.js';
import Home from '../components/home/home.js';
import settings from '../components/settings/settings.js';

const Routes = () => (

  <Router hideNavBar={true}>
    <Scene key = "root">
      <Scene key = "launch" component = {Launch} hideNavBar={true} {...this.props} initial />
      <Scene key = "home" component = {Home} hideNavBar={true} panHandlers={null} />
    </Scene>
 </Router>


);

const styles = StyleSheet.create({

});

export default Routes
