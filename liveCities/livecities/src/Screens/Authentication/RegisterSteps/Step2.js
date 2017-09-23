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
    Keyboard,
    KeyboardAvoidingView,
    TouchableOpacity,
    Alert
} from 'react-native';
import { connect } from 'react-redux';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import I18n from 'react-native-i18n';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Header } from 'react-navigation';

import CommonWidgets from '@CommonWidgets';
import {Colors, Fonts, Icons, Images, Metrics, Styles, Constants } from '@Themes';
import Utils from '@src/utils';
import { setFirstnameLastName } from '@Actions/Auth';

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
        height : responsiveHeight(65) + 20,
    },

    button_container : {
        width : responsiveWidth(100),
        height : responsiveHeight(10) - 20,
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
    }
});

class Step2 extends Component {
    constructor(props){
        super(props);

        this.state = {
            FirstLast : '',
        };
    }
    render() {
        return (
            <TouchableOpacity activeOpacity = { 1 } onPress = {() => { 
                //Keyboard.dismiss() ;
            }}>
            <View style={localStyles.mainContainer}>

                <View style = { localStyles.nav_container }>
                    <TouchableHighlight underlayColor = 'transparent' onPress = {() => { this.props.navigation.goBack(); } }>
                        <Image source={Images.ic_back} style={localStyles.backButton}/>
                    </TouchableHighlight>
                </View>

                <View style = { localStyles.logo_container  }>
                    <TouchableHighlight onPress={() => { 
                            this.props.navigation.dispatch(Utils.getResetAction('initialScreen'));
                        }} underlayColor = 'transparent'>
                        <Image source={Images.ic_logo} style = { localStyles.ic_logo }/>
                    </TouchableHighlight>
                </View>

                <View style = { localStyles.input_container }>
                    <View style={{justifyContent : 'center'}}>
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
                            autoFocus = { true }
                            value = {this.state.FirstLast}
                            onChangeText = {(text) => {
                                this.setState({
                                    FirstLast : text
                                })
                            }}
                            autoCorrect = { false }
                            underlineColorAndroid = 'transparent'
                            placeholderTextColor = 'rgba(255,255,255,0.5)'
                            placeholder={I18n.t('FIRTANDLAST')}>
                        </TextInput>
                    </View>
                </View>

                <KeyboardAvoidingView behavior = 'position'>
                <View style = { localStyles.button_container }>
                    <TouchableHighlight
                        underlayColor = 'transparent'
                        onPress = {() => { 
                            if(this.state.FirstLast !== ''){
                                var firstAndlast = this.state.FirstLast.split(' ');
                                var firstName = firstAndlast[0];
                                var lastName = firstAndlast[1] !== undefined ? firstAndlast[1] : '';

                                this.props.setFirstLastName(firstName, lastName);
                                Keyboard.dismiss();
                                this.props.navigation.navigate('signup3'); 
                            }
                            else{
                                Alert.alert('Error','Input your first name and last name');
                            }
                        }}
                        >
                        <View style={{
                            width : responsiveWidth(100),
                            height : responsiveHeight(10) - 20,
                            backgroundColor : Colors.buttonPrimary,
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
        setFirstLastName : (first, last) => dispatch(setFirstnameLastName(first, last))
    };
}

function mapStateToProps(state) {
    return { state };
}

export default connect(mapStateToProps,mapDispatchToProps)(Step2);