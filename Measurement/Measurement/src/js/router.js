/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Router, Route, Schema, Animations, Scene,TabBar,ActionConst} from 'react-native-router-flux'

import Home from './home.js'
import Tutorial from './tutorial.js'
import CameraFrom from './camera.js'
import EditImage from './editImage.js'

const Routes = () => (
  <Router hideNavBar={true}>
    <Scene key = "root">
      <Scene key = "home" component = {Home} hideNavBar={true} {...this.props} initial />
      <Scene key = "tutorial" component = {Tutorial} hideNavBar={true} type={ActionConst.POP} panHandlers={null} />
      <Scene key = "cameraform" component = {CameraFrom} hideNavBar={true} panHandlers={null} />
      <Scene key = "editimage" component = {EditImage} hideNavBar={true} panHandlers={null} />
    </Scene>
 </Router>
);

export default Routes
