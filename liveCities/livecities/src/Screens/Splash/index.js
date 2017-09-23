import React, { Component } from 'react';
import { Image, ActivityIndicator , View , Text, StyleSheet, TouchableHighlight} from 'react-native';
import { connect } from 'react-redux';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import CommonWidgets from '@CommonWidgets';
import {Colors, Fonts, Icons, Images, Metrics, Styles } from '@Themes';
import Utils from '@src/utils';

let netStateTimer;

const localStyles = StyleSheet.create({
  mainContainer : {
    width : responsiveWidth(100),
    height : responsiveHeight(100),
  },
  backgroundImage : {
    width : responsiveWidth(100),
    height : responsiveHeight(100),
    resizeMode : 'stretch'
  },
  ic_log_container : {
    width : responsiveWidth(100),
    height : responsiveHeight(25),
    alignItems : 'center',
    justifyContent : 'center',
  },
  ic_logo : {
    width : responsiveWidth(25),
    height : responsiveHeight(10),
    resizeMode : 'contain'
  }
});
class Splash extends Component {

  componentDidMount() {
    netStateTimer = setInterval(this.onTimer.bind(this), 1000);
     // this.gotoNext();
  }
  componentWillUnmount() {
    clearInterval(netStateTimer);
  }
  onTimer() {
    // if (this.props.globals.networkState) {
    clearInterval(netStateTimer);
    this.gotoNext();
    // }
    // CommonWidgets.showNetworkError();
  }

  async gotoNext() {
      clearInterval(netStateTimer);
      setTimeout(() => {
          this.props.navigation.dispatch(Utils.getResetAction('initialScreen'));
      }, 500);
  }

  render() {
    return (
        <View style={localStyles.mainContainer}>
          {
            CommonWidgets.renderHiddenStatusBar()
          }

          <Image style={localStyles.backgroundImage} source={Images.background}>
            <TouchableHighlight onPress={() => { }} underlayColor = 'transparent'>
              <View style={localStyles.ic_log_container}>
                <Image source={Images.catlabs.ic_logo} style={localStyles.ic_logo}/>
              </View>
            </TouchableHighlight>
          </Image>

        </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  console.log(dispatch);
  return {
    dispatch,
  };
}

function mapStateToProps(state) {
  const loginStatus = state.states;
  return loginStatus;
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
