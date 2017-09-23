import React, { Component } from 'react';
import { Animated, Image, ActivityIndicator , View , Text, StyleSheet, TouchableHighlight} from 'react-native';
import { connect } from 'react-redux';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import I18n from 'react-native-i18n';
import FadeInView from 'react-native-fade-in-view';

import CommonWidgets from '@CommonWidgets';
import {Colors, Fonts, Icons, Images, Metrics, Styles } from '@Themes';
import Utils from '@src/utils';

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
    ic_logo_container : {
      width : responsiveWidth(100),
      height : responsiveHeight(25),
      alignItems : 'center',
      justifyContent : 'center',
    },
    ic_logo : {
        marginTop : 10,
        width : 180,
        height : 90,
        resizeMode : 'contain'
    },
    heading_container : {
        width : responsiveWidth(100),
        height : responsiveHeight(50),
        alignItems : 'center',
        justifyContent : 'center'
    },
    button_container : {
        width : responsiveWidth(100),
        height : responsiveHeight(25),
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
    },

    signupbutton : {
        width : responsiveWidth(30),
        height : 40,
        borderRadius :40,
        backgroundColor : Colors.buttonPrimary,
        alignItems : 'center',
        justifyContent : 'center'
    },

    loginbutton : {
        width : responsiveWidth(30),
        height : 40,
        borderRadius :40,
        borderWidth : 1,
        borderColor : 'rgba(255,255,255,0.3)',
        backgroundColor : 'transparent',
        alignItems : 'center',
        justifyContent : 'center'
    }
});

class InitialScreen extends Component {
    constructor(props){
        super(props);
    }
    static navigationOptions = {
        header: null,
    };
    componentDidMount() {

    }
    render() {
        return (
            <View style={localStyles.mainContainer}>
                {
                    CommonWidgets.renderHiddenStatusBar()
                }

                <Image style={localStyles.backgroundImage} source={Images.background}>
                    <TouchableHighlight onPress={() => { }} underlayColor = 'transparent'>
                        <View style={localStyles.ic_logo_container}>
                            <Image source={Images.catlabs.ic_logo} style={localStyles.ic_logo}/>
                        </View>
                    </TouchableHighlight>

                    <FadeInView
                        style = {localStyles.heading_container}
                        duration={1500}
                        >
                        <Text style={{
                            width : responsiveWidth(70),
                            textAlign : 'center',
                            fontFamily : Fonts.varelaroundregular,
                            backgroundColor : 'transparent',
                            color : 'white',
                            fontSize : responsiveFontSize(3)}}>
                            {I18n.t('HEADING1')}
                        </Text>
                        <Text style={{
                            marginTop : 30,
                            width : responsiveWidth(80),
                            textAlign : 'center',
                            fontFamily : Fonts.varelaroundregular,
                            backgroundColor : 'transparent',
                            color : 'rgba(255,255,255,0.5)',
                            fontSize : responsiveFontSize(2)}}>
                            {I18n.t('HEADING2')}
                        </Text>
                    </FadeInView>

                    <FadeInView style={localStyles.button_container}>
                        <TouchableHighlight
                            onPress={() => {
                                this.props.navigation.dispatch(Utils.getResetAction('signup1'));
                            }}
                            underlayColor = 'transparent'
                            style={{marginRight : 20}}
                            >
                            <View style={localStyles.signupbutton}>
                                <Text style={{
                                         color : 'white',
                                         fontFamily : Fonts.varelaroundregular,
                                         fontSize : responsiveFontSize(1.5)
                                        }}>
                                    {I18n.t('SIGNUP')}
                                </Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight
                            onPress = {() => {
                                this.props.navigation.dispatch(Utils.getResetAction('login1'));
                             }}
                            underlayColor = 'transparent'
                            >
                            <View style={localStyles.loginbutton}>
                                <Text style={{
                                         color : 'white',
                                         fontFamily : Fonts.varelaroundregular,
                                         fontSize : responsiveFontSize(1.5)
                                        }}>
                                        {I18n.t('LOGIN')}
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </FadeInView>
                </Image>

            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

function mapStateToProps(state) {
    return { state };
}

export default connect(mapStateToProps,mapDispatchToProps)(InitialScreen);
