/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry,View} from 'react-native';
import Routes from './src/routes/routes.js'

export default class Presmans extends Component {
  render() {
    return (
      <Routes />
    );
  }
}


AppRegistry.registerComponent('Presmans', () => Presmans);
