import React, { Component } from 'react';
import { 
    Animated, 
    Image, 
    ActivityIndicator , 
    View , 
    Text, 
    StyleSheet, 
    TouchableHighlight, 
    TextInput, 
    Alert,
    KeyboardAvoidingView,
    TouchableOpacity,
    Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import I18n from 'react-native-i18n';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import CommonWidgets from '@CommonWidgets';
import {Colors, Fonts, Icons, Images, Metrics, Styles, Constants } from '@Themes';
import Utils from '@src/utils';
import { setCredentialEmail } from '@Actions/Auth';

const localStyles = StyleSheet.create({
    mainContainer : {
        width : responsiveWidth(100),
        height : responsiveHeight(100),
        backgroundColor : Colors.backgroundPrimary,
    },
    
    nav_container : {
        width : responsiveWidth(100),
        height : Constants.Navbar_Height,
        backgroundColor : Colors.backgroundPrimary,
        justifyContent : 'center'
    },

    logo_container : {
        width : responsiveWidth(100),
        height : responsiveHeight(25) - Constants.Navbar_Height,
        alignItems : 'center',
        justifyContent : 'center',
    },

    input_container : {
        width : responsiveWidth(100),
        height : responsiveHeight(50),
    },

    button_container : {
        width : responsiveWidth(100),
        height : responsiveHeight(25),
        flexDirection : 'column',
        justifyContent : 'flex-end',
        alignItems : 'center'
    },
    
    button_social : {
        width : responsiveWidth(100),
        height : responsiveHeight(15),
        alignItems : 'center',
        justifyContent : 'center',
        flexDirection : 'row',
    },

    ic_logo : {
        width : 100,
        height : 70,
        resizeMode : 'stretch'
    },
});

class Step1 extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props){
        super(props);

        this.state = {
            email : ''
        }
    }

    render() {
        return (
            <TouchableOpacity activeOpacity = { 1 } onPress = {() => { 
                //Keyboard.dismiss() 
            }}>
            <View style={localStyles.mainContainer}>
                {
                    CommonWidgets.renderHiddenStatusBar()
                }
                <View style = {localStyles.nav_container}>
                </View>

                <View style = {localStyles.logo_container}>
                    <TouchableHighlight onPress={() => { 
                            this.props.navigation.dispatch(Utils.getResetAction('initialScreen'));
                        }} underlayColor = 'transparent'>
                        <Image source = {Images.ic_logo} style = {localStyles.ic_logo}/>
                    </TouchableHighlight>
                </View>
                
                <View style={localStyles.input_container}>
                    <TextInput
                        style={{
                            height : 50, 
                            fontSize : Constants.Primary_Input_FontSize, 
                            color : 'white',
                            marginLeft : 30,
                            marginRight : 30,
                            marginTop : 50,
                            fontFamily : Fonts.varelaroundregular
                        }} 
                        autoFocus = {true}
                        autoCorrect = { false }
                        underlineColorAndroid = 'transparent'
                        value = {this.state.email}
                        onChangeText = {(text) => { this.setState({
                            email : text
                        })}}
                        placeholderTextColor = 'rgba(255,255,255,0.5)'
                        placeholder={I18n.t('INPUT_EMAIL')}>
                    </TextInput>
                </View>
                <KeyboardAvoidingView behavior='position'>
                <View style={localStyles.button_container}>
                    <Text style={{
                                color : 'white', 
                                fontFamily : Fonts.varelaroundregular, 
                                textAlign : 'center',
                                height : 20
                            }}>
                        {I18n.t('LOGIN_WITH_SOCIAL')}
                    </Text>
                    <View style={localStyles.button_social}>
                        <TouchableHighlight
                            onPress = {() => { }}
                            underlayColor = 'transparent'
                            >
                            <View style={{
                                width : responsiveWidth(30),
                                height : responsiveHeight(6),
                                borderRadius : responsiveHeight(6),
                                backgroundColor : 'white',
                                alignItems : 'center',
                                justifyContent : 'center'
                            }}>
                                <Image source = {Images.ic_facebook} style={{width : 12, height : 25, resizeMode : 'stretch'}}/>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight
                            onPress = {() => { }}
                            underlayColor = 'transparent'
                            style = {{marginLeft : 10}}
                            >
                            <View style={{
                                width : responsiveWidth(30),
                                height : responsiveHeight(6),
                                borderRadius : responsiveHeight(6),
                                backgroundColor : 'white',
                                alignItems : 'center',
                                justifyContent : 'center'
                            }}>
                                <Image source = {Images.ic_twitter} style={{width : 25, height : 25, resizeMode : 'stretch'}}/>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <TouchableHighlight
                        underlayColor = 'transparent'
                        onPress = {() => { 
                            if(Utils.validateEmail(this.state.email))
                            {
                                this.props.setEmail(this.state.email);
                                Keyboard.dismiss();
                                this.props.navigation.navigate('signup2'); 
                            }
                            else{
                                Alert.alert('Error',I18n.t('INVALID_EMAIL'));
                            }
                        }}
                        >
                        <View style={{
                            width : responsiveWidth(100),
                            height : responsiveHeight(10) - 20,
                            backgroundColor : '#E01021',
                            alignItems : 'center',
                            justifyContent : 'center'
                        }}>
                            <Text style={{fontFamily : Fonts.varelaroundregular, color : 'white', fontSize : responsiveFontSize(2)}}>
                                {I18n.t('SUBMIT')}
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
                </KeyboardAvoidingView>
            </View>
            </TouchableOpacity>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        setEmail : email => dispatch(setCredentialEmail(email))
    };
}

function mapStateToProps(state) {
    return { state };
}

export default connect(mapStateToProps,mapDispatchToProps)(Step1);