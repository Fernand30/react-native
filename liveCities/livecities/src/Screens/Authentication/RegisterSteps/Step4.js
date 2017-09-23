import React, { Component } from 'react';
import { Animated, Image, ActivityIndicator , View , Text, StyleSheet, TouchableHighlight, TextInput, Platform, Alert} from 'react-native';
import { connect } from 'react-redux';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import I18n from 'react-native-i18n';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
    NormalApi, LoginApi, RegisterApi, CreateResourceApi, UpdateResourceApi, UploadAvatar,
    GetResourceApi, DeleteResourceApi, CreateTaskApi , RetriveTaskApi,
    UpdateTaskApi, AddTaskRequirementApi, AddTaskTag, DeleteTaskTag
} from '@ServerApi';
import ImageResizer from 'react-native-image-resizer';
var ImagePicker = require('react-native-image-picker');
var RNFetchBlob = require('react-native-fetch-blob').default;

import CommonWidgets from '@CommonWidgets';
import {Colors, Fonts, Icons, Images, Metrics, Styles, Constants } from '@Themes';
import Utils from '@src/utils';
import ActionSheet from '@Components/ActionSheet/';
import { setAvatar } from '@Actions/Auth';

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
        height : responsiveHeight(50),
        alignItems : 'center'
    },

    button_container : {
        width : responsiveWidth(100),
        height : responsiveHeight(25),
        flexDirection : 'column',
        justifyContent : 'flex-end',
        alignItems : 'center'
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

const IP_BUTTONS = [
    { key: 0, label: I18n.t('TAKE_PHOTO') },
    { key: 1, label: I18n.t('PICK_FROM_LIBRARY') },
    { key: 2, label: I18n.t('CANCEL') },
  ];

class Step4 extends Component {
    constructor(props){
        super(props);

        this.state = {
            isShowingPassword : false,
            avatarUri : "",
            isLoading : false,
            avatarData : "",
        }
    }
    showActionSheetMenu() {
        this.ActionSheet.show();
    }
    onActionSheetMenu(index) {
        const options = {
          quality: 1.0,
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        switch (index) {
          case 0:
            ImagePicker.launchCamera(options, (response) => {
              this.onImagePicker(response);
            });
            break;
          case 1:
            ImagePicker.launchImageLibrary(options, (response) => {
              this.onImagePicker(response);
            });
            break;
          default:
        }
    }
    
    onImagePicker(response) {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else if (response.uri !== undefined) {
          let source = '';
          if (Platform.OS === 'android') {
            source = { uri: response.uri };
          } else {
            source = { uri: response.uri.replace('file://', ''), isStatic: true };
          }
          
          ImageResizer.createResizedImage(source.uri, 200, 200, 'JPEG', 80)
            .then((resizedImageUri) => {
                RNFetchBlob.fetch('GET', resizedImageUri.uri, {
                    Authorization : 'Bearer access-token...',
                    // more headers  ..
                })
                  // when response status code is 200
                .then((res) => {
                    // the conversion is done in native code
                    let base64Str = res.base64();
                    this.setState({
                        avatarUri : resizedImageUri.uri,
                        avatarData : base64Str
                    });
                    // the following conversions are done in js, it's SYNC
                    let text = res.text();
                    let json = res.json();
                
                })
                  // Status code is not 200
                .catch((errorMessage, statusCode) => {
                    // error handling
                })
            }).catch((err) => {
              console.log(err);
            });
            //console.log(resizedImageUri);
        }
    }

    render() {
        var Indicator = 
            <View style={{ position : 'absolute', width : responsiveWidth(100), height : responsiveHeight(100), backgroundColor : 'transparent' }}>
                <BallIndicator color='white' animationDuration={800} size={responsiveWidth(30)}/>
            </View>
        return (
            
            <View style = { localStyles.mainContainer }>
                {
                    CommonWidgets.renderHiddenStatusBar()
                }

                <View style = { localStyles.nav_container }>
                    <TouchableHighlight underlayColor = 'transparent' onPress = {() => { this.props.navigation.goBack(); } }>
                        <Image source={Images.ic_back} style={localStyles.backButton}/>
                    </TouchableHighlight>
                </View>

                <View style = { localStyles.logo_container }>
                    <TouchableHighlight onPress={() => { 
                            this.props.navigation.dispatch(Utils.getResetAction('initialScreen'));
                        }} underlayColor = 'transparent'>
                        <Image source={Images.ic_logo} style={localStyles.ic_logo}/>
                    </TouchableHighlight>
                </View>

                <View style={localStyles.input_container}>
                    <TouchableHighlight onPress={() => this.showActionSheetMenu()} underlayColor = 'transparent'>
                        <View style={{
                            width : 100, 
                            height : 100, 
                            borderRadius : 100, 
                            borderWidth : 1, 
                            borderColor : 'rgba(255,255,255,0.5)',
                            marginTop : 50,
                            alignItems : 'center',
                            justifyContent : 'center'
                        }}>
                        {
                            this.state.avatarUri === '' ? 
                                <Image source={Images.ic_add} style={{width : 20, height : 20, resizeMode : 'stretch'}}/>
                                :
                                <Image source = {{uri: this.state.avatarUri}} style = {{ width : 100, height : 100, borderRadius: 50, resizeMode : 'cover'}}/>
                        }
                            
                        </View>
                    </TouchableHighlight>
                    <Text style={{
                            color : 'white', 
                            fontFamily : Fonts.varelaroundregular, 
                            fontSize : 13,
                            marginTop : 20,
                        }}>
                        {I18n.t('UPLOAD_PHOTO')}
                    </Text>
                </View>
            
                <View style={localStyles.button_container}>
                    <TouchableHighlight
                        underlayColor = 'transparent'
                        onPress = {() => { 
                            this.setState({
                                isLoading : true
                            })
                            
                            UploadAvatar(this.props.appstatus.token, this.state.avatarUri).then(resp => {
                                this.setState({
                                    isLoading : false
                                });
                                
                                console.log(resp);
                                if(resp.url !== undefined){
                                    this.props.setAvatar(resp.url);
                                    this.props.navigation.navigate('signup5');
                                }
                                else{
                                    Alert.alert('Uploading Avatar...', 'Failed');
                                }
                            });
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
                <ActionSheet
                    ref={(as) => { this.ActionSheet = as; }}
                    options={IP_BUTTONS}
                    cancelButtonIndex={IP_BUTTONS.length - 1}
                    onPress={this.onActionSheetMenu.bind(this)}
                    tintColor={'black'} />
                {
                    this.state.isLoading ? Indicator : undefined
                }
            </View>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        setAvatar : (avatar) => dispatch(setAvatar(avatar))
    };
}

function mapStateToProps(state) {
    return { appstatus : state.states };
}

export default connect(mapStateToProps,mapDispatchToProps)(Step4);