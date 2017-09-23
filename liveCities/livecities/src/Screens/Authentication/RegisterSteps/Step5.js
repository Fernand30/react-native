import React, { Component } from 'react';
import { Animated, Image, ActivityIndicator , View , Text, StyleSheet, TouchableHighlight, TextInput, Platform} from 'react-native';
import { connect } from 'react-redux';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import I18n from 'react-native-i18n';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import CommonWidgets from '@CommonWidgets';
import {Colors, Fonts, Icons, Images, Metrics, Styles, Constants } from '@Themes';
import Utils from '@src/utils';
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
    NormalApi, LoginApi, RegisterApi, CreateResourceApi, UpdateResourceApi, getSixSkillApi,
    GetResourceApi, DeleteResourceApi, CreateTaskApi , RetriveTaskApi,
    UpdateTaskApi, AddTaskRequirementApi, AddTaskTag, DeleteTaskTag
} from '@ServerApi';
import { loadSkills } from '@Actions/Skill';

const avatarContentSize = responsiveWidth(100)*4.5/10;
const contentOffset = 30;

const localStyles = StyleSheet.create({
    mainContainer : {
        width : responsiveWidth(100),
        height : responsiveHeight(100),
        backgroundColor : Colors.backgroundThird,
    },
    nav_container : {
        width : responsiveWidth(100),
        height : Constants.Navbar_Height,
        backgroundColor : Colors.backgroundThird,
        alignItems : 'center',
        flexDirection : 'row',
    },

    iconStyle : {
        width : 20,
        height : Constants.Navbar_Height - 15,
        marginLeft : 20,
        resizeMode : 'stretch',
    },

    ic_menuStyle : {
        width : 5,
        height : Constants.Navbar_Height - 25,
        marginLeft : responsiveWidth(100) - 70,
        marginRight : 20,
        resizeMode : 'stretch'
    },

    viewContent : {
        width : responsiveWidth(100),
        height : responsiveHeight(100) - Constants.Navbar_Height,
    },

    welcomeText : {
        color : 'white',
        fontSize : responsiveFontSize(3),
        fontFamily : Fonts.varelaroundregular,
    },

    explainationText : {
        color : 'white',
        fontSize : responsiveFontSize(2),
        fontFamily : Fonts.varelaroundregular,
        textAlign : 'center',
        width : responsiveWidth(70),
        marginTop : 30,
    },

    avatarContainer : {
        width : avatarContentSize,
        height : avatarContentSize,
        borderRadius : avatarContentSize/2,
        borderWidth : 1,
        borderColor : 'rgba(255,255,255,0.5)',
        justifyContent : 'center',
        alignItems : 'center'
    },

    innerAvatar : {
        width : avatarContentSize - contentOffset,
        height : avatarContentSize - contentOffset,
        borderRadius : avatarContentSize/2 - contentOffset/2,
        borderWidth : 1,
        borderColor : 'rgba(255,255,255,0.5)',
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : '#4b9268',
    },

    avatarContent : {
        width : avatarContentSize - contentOffset*2,
        height : avatarContentSize - contentOffset*2,
        resizeMode : 'cover',
        borderRadius : avatarContentSize/2 - contentOffset
    },

    infoContainer : {
        width : responsiveWidth(100),
        height : 80,
        marginTop : 20,
    },

    infoContent : {
        width : responsiveWidth(90),
        height : 35,
        borderBottomWidth : 1,
        borderColor : 'gray',
        marginLeft : responsiveWidth(10),
        flexDirection : 'row',
        alignItems : 'center'
    },

    infoText : { 
        color : 'white', 
        fontFamily : Fonts.varelaroundregular ,
        width : responsiveWidth(30)
    },

    dataText : {
        color : 'white', 
        fontFamily : Fonts.varelaroundregular ,
        width : responsiveWidth(60)
    }
});

class Step5 extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading : false,
        }
    }
    render() {
        var Indicator = 
            <View style={{ position : 'absolute', width : responsiveWidth(100), height : responsiveHeight(100), backgroundColor : 'transparent' }}>
                <BallIndicator color='white' animationDuration={800} size={responsiveWidth(30)}/>
            </View>
        return (
            <View style = { localStyles.mainContainer }>
                <View style = { localStyles.nav_container }>
                    <Image source = { Images.ic_icon } style={ localStyles.iconStyle }/>
                    <Image source = { Images.ic_menu } style={ localStyles.ic_menuStyle }/>
                </View>

                <View style = { localStyles.viewContent }>
                    <View style = {{ flex : 7, justifyContent : 'center', alignItems : 'center' }}>
                        <Text style = { localStyles.welcomeText }>
                            { I18n.t('WELCOME') + this.props.appstatus.firstname + '!' }
                        </Text>
                        <Text style = { localStyles.explainationText }>
                            { I18n.t('EXPLANATION') }
                        </Text>
                    </View>

                    <View style={{flex : 7, alignItems : 'center'}}>
                        <View style = { localStyles.avatarContainer }>
                            <View style = { localStyles.innerAvatar }>
                                <Image source = {
                                        this.props.appstatus.avatar !== '' ? {uri : this.props.appstatus.avatar} : Images.ic_avatar
                                    } 
                                    style = { localStyles.avatarContent }>
                                </Image>
                            </View>
                        </View>
                        <View style={ localStyles.infoContainer }>
                            <View style = { localStyles.infoContent }>
                                <Text style = { localStyles.infoText }>{I18n.t('NAME')}</Text>
                                <Text style = { localStyles.dataText }>{this.props.appstatus.firstname} {this.props.appstatus.lastname}</Text>
                            </View>
                            <View style = { localStyles.infoContent }>
                                <Text style = { localStyles.infoText }>{I18n.t('EMAIL')}</Text>
                                <Text style = { localStyles.dataText }>{this.props.appstatus.email}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{flex : 2, justifyContent : 'flex-end'}}>
                        <TouchableHighlight
                            underlayColor = 'transparent'
                            onPress = {() => { 
                                this.setState({
                                    isLoading : true
                                });
                                getSixSkillApi(this.props.appstatus.token).then(resp => {
                                    this.setState({
                                        isLoading : false
                                    });

                                    console.log(resp);
                                    this.props.setSkills(resp.items);
                                    this.props.navigation.navigate('signup6');
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
                                    {I18n.t('BEGIN')}
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
                {
                    this.state.isLoading ? Indicator : undefined
                }
            </View>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        setSkills : skills => dispatch(loadSkills(skills))
    };
}

function mapStateToProps(state) {
    return { appstatus : state.states };
}

export default connect(mapStateToProps,mapDispatchToProps)(Step5);