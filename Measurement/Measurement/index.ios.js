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
  View
} from 'react-native';
import Router from './src/js/router.js'
export default class Measurement extends Component {
  render() {
    return (
      <Router />
    );
  }
}

AppRegistry.registerComponent('Measurement', () => Measurement);
