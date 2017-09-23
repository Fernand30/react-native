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
    Platform,
    TouchableOpacity,
    Keyboard,
    KeyboardAvoidingView,
    Alert
} from 'react-native';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';

import {
    NormalApi, LoginApi, RegisterApi, CreateResourceApi, UpdateResourceApi, 
    GetResourceApi, DeleteResourceApi, CreateTaskApi , RetriveTaskApi,
    UpdateTaskApi, AddTaskRequirementApi, AddTaskTag, DeleteTaskTag
} from '@ServerApi';

import { connect } from 'react-redux';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import I18n from 'react-native-i18n';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Header } from 'react-navigation';

import CommonWidgets from '@CommonWidgets';
import {Colors, Fonts, Icons, Images, Metrics, Styles, Constants } from '@Themes';
import Utils from '@src/utils';
import { setCredentialPassword, setLoginToken } from '@Actions/Auth';

const localStyles = StyleSheet.create({
    
    mainContainer : {
        width : responsiveWidth(100),
        height : responsiveHeight(100),
        backgroundColor : Colors.backgroundSecondary,
    },
    
    nav_container : {
        width : responsiveWidth(100),
        height : Constants.Navbar_Height,
        backgroundColor : Colors.backgroundSecondary,
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
        height : responsiveHeight(65) - 30,
    },

    button_container : {
        width : responsiveWidth(100),
        height : responsiveHeight(10) + 30,
        flexDirection : 'column',
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

    backButton : {
        width : 10, 
        height : 15, 
        marginLeft : 15,
        resizeMode : 'stretch', 
    },

    nextButton : {
        width : 10,
        height : 15,
        resizeMode : 'stretch'
    },

    input_style : {
        height : 50, 
        fontSize : Constants.Primary_Input_FontSize, 
        color : 'white',
        marginLeft : 30,
        marginRight : 50,
    }
});

class Step3 extends Component {
    constructor(props){
        super(props);

        this.state = {
            isShowingPassword : false,
            password : '',
            isLoading : false
        }
    }
    render() {
        var Indicator = 
            <View style={{ position : 'absolute', width : responsiveWidth(100), height : responsiveHeight(100), backgroundColor : 'transparent' }}>
                <BallIndicator color='white' animationDuration={800} size={responsiveWidth(30)}/>
            </View>
        return (
            <TouchableOpacity activeOpacity = { 1 } onPress = { () => { 
                //Keyboard.dismiss() 
            }}>
            <View style = { localStyles.mainContainer }>
                {
                    CommonWidgets.renderHiddenStatusBar()
                }

                <View style = { localStyles.nav_container }>
                    <TouchableHighlight 
                        underlayColor = 'transparent' 
                        onPress = {() => { 
                                this.props.navigation.goBack(); 
                            } 
                        }
                        >

                        <Image source={Images.ic_back} style={localStyles.backButton}/>

                    </TouchableHighlight>
                </View>

                <View style = { localStyles.logo_container }>
                    <TouchableHighlight 
                        onPress={() => { 
                                this.props.navigation.dispatch(Utils.getResetAction('initialScreen'));
                            }
                        } 
                        underlayColor = 'transparent'>
                        
                        <Image source={Images.ic_logo} style = { localStyles.ic_logo }/>

                    </TouchableHighlight>
                </View>

                <View style = { localStyles.input_container }>
                    <View style={{justifyContent : 'center', marginTop : 50}}>

                        <TextInput
                            style={ localStyles.input_style }
                            value = {this.state.password}
                            onChangeText = {(text) => {
                                this.setState({
                                    password : text
                                })
                            }}
                            autoFocus = { true }
                            underlineColorAndroid = 'transparent'
                            secureTextEntry = { !this.state.isShowingPassword }
                            placeholderTextColor = 'rgba(255,255,255,0.5)'
                            placeholder={I18n.t('LOGIN_PASSWORD')}>
                        </TextInput>

                        <TouchableHighlight  
                            onPress={() => {
                                this.setState({
                                    isShowingPassword : !this.state.isShowingPassword
                                });
                            }} 
                            underlayColor = 'transparent' 
                            style={{
                                position : 'absolute', 
                                width : 20, 
                                height : 13, 
                                marginLeft : responsiveWidth(100)-50,
                            }}>
                            <Image source={Images.ic_eye} 
                                style={{
                                    width : 20, 
                                    height : 13, 
                                    resizeMode : 'stretch',
                                }}/>
                        </TouchableHighlight>
                    </View>
                </View>
                
                <KeyboardAvoidingView behavior = 'position'>
                <View style = { localStyles.button_container }>
                    <Text style={{
                            fontFamily : Fonts.varelaroundregular, 
                            color : 'white',
                            width : responsiveWidth(80),
                            height : 50,
                            textAlign : 'center',
                            fontSize : 13,
                        }}>
                        {I18n.t('PASSWORD_POLICY')}
                    </Text>
                    <TouchableHighlight
                        underlayColor = 'transparent'
                        onPress = {() => { 
                            if(this.state.password !== '' && this.state.password.length >= 8){
                                this.props.setPassword(this.state.password);

                                this.setState({
                                    isLoading : true
                                });

                                RegisterApi(this.props.appstatus.email,this.state.password, this.props.appstatus.firstname, this.props.appstatus.lastname).then(resp => {
                                    this.setState({
                                        isLoading : false
                                    });
                                    
                                    console.log(resp);

                                    if(resp.token !== undefined){
                                        this.props.setToken(resp.token);
                                        Keyboard.dismiss();
                                        this.props.navigation.navigate('signup4'); 
                                    }
                                    else{
                                        Alert.alert('Register failed!', resp.email[0]);
                                    }
                                });
                            }
                            else if(this.state.password === ''){
                                Alert.alert('Error!','Input your password');
                            }
                            else if(this.state.password.length < 8){
                                Alert.alert('Warning!','Password should be at least 8 characters');
                            }
                            
                        }}
                        >
                        <View style={{
                            width : responsiveWidth(100),
                            height : responsiveHeight(10) - 20,
                            backgroundColor : 'white',
                            alignItems : 'center',
                            justifyContent : 'center'
                        }}>
                            <Text style={{fontFamily : Fonts.varelaroundregular, color : 'black', fontSize : responsiveFontSize(2)}}>
                                {I18n.t('SUBMIT')}
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
                </KeyboardAvoidingView>
                {
                    this.state.isLoading ? Indicator : undefined
                }
            </View>
            </TouchableOpacity>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        setPassword : pass => dispatch(setCredentialPassword(pass)),
        setToken : token => dispatch(setLoginToken(token))
    };
}

function mapStateToProps(state) {
    return { appstatus : state.states };
}

export default connect(mapStateToProps,mapDispatchToProps)(Step3);