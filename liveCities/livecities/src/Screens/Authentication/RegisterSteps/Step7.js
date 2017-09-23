import React, { Component } from 'react';
import { Animated, Image, ActivityIndicator , View , Text, StyleSheet, TouchableHighlight, TouchableOpacity,TextInput, Platform, KeyboardAvoidingView, Keyboard} from 'react-native';
import { connect } from 'react-redux';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import I18n from 'react-native-i18n';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import CommonWidgets from '@CommonWidgets';
import {Colors, Fonts, Icons, Images, Metrics, Styles, Constants } from '@Themes';
import Utils from '@src/utils';

const localStyles = StyleSheet.create({
    mainContainer : {
        width : responsiveWidth(100),
        height : responsiveHeight(100),
        backgroundColor : Colors.backgroundThird
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

    rocketContent : {
        width : responsiveWidth(100),
        height : responsiveHeight(30) - Constants.Navbar_Height,
        alignItems : 'center',
        justifyContent : 'center'
    },

    rocketIcon : {
        width : 60,
        height : 60,
        resizeMode : 'stretch'
    },

    interestExplan : {
        fontFamily : Fonts.varelaroundregular,
        fontSize : responsiveFontSize(2),
        color : 'white',
        width : responsiveWidth(70),
        marginTop : 10,
        textAlign : 'center'
    },

    interestItem : {
        width : responsiveWidth(40), 
        height : 50, 
        borderRadius : 50, 
        borderWidth : 1, 
        borderColor : 'rgba(255,255,255,0.2)',
        alignItems : 'center',
        marginLeft : 15,
        flexDirection : 'row'
    },

    interestItemSelected : {
        width : responsiveWidth(40), 
        height : 50, 
        borderRadius : 50, 
        borderWidth : 1, 
        borderColor : 'rgba(255,255,255,1)',
        alignItems : 'center',
        marginLeft : 15,
        flexDirection : 'row'
    },

    interestContent : {
        width : responsiveWidth(100),
        height : responsiveHeight(60) + 20,
        justifyContent : 'center',
    },

    submitButton : {
        width : responsiveWidth(100),
        height : responsiveHeight(10) - 20,
        backgroundColor : 'white',
        alignItems : 'center',
        justifyContent : 'center'
    }
});

const interests = [
    'Sport',
    'Politics',
    'Education',
    'Travel',
    'Fashion',
    'Trends',
    'Technology',
    'Food',
    'Architecture'
]

function getInterestItems(itemArray, currentStatus, itemClicked){
    var knowledgesItem = [ ];
    
    for(let i = 0; i < itemArray.length / 2 ; i ++ ){
        var threeItems = (
        <View style = {{width : responsiveWidth(100), height : 50, flexDirection : 'row', marginBottom : 20, justifyContent : 'center'}} key = { i }>
            {
                itemArray[i*2] !== undefined ? 
                    <View style = { currentStatus[itemArray[i*2]] === false ? localStyles.interestItem : localStyles.interestItemSelected }>
                        <Text style = {{ color : 'white', fontFamily : Fonts.varelaroundregular, marginLeft : 15}}> { itemArray[i*2] }</Text>
                        <View style = {{position : 'absolute', width : responsiveWidth(40), justifyContent : 'center'}}>
                            <TouchableHighlight
                                underlayColor = 'transparent'
                                style = {{position : 'absolute' ,marginLeft : responsiveWidth(40) - 45}}
                                onPress = { () => { itemClicked(itemArray[i*2]) } }
                                >
                                <Image source = {currentStatus[itemArray[i*2]] === false ? Images.ic_plus : Images.ic_added} style = {{ width : 40, height : 40, resizeMode : 'stretch',}}/>
                            </TouchableHighlight>
                        </View>
                    </View>
                    :
                    undefined
            }
            
            {
                itemArray[i*2 + 1] !== undefined ? 
                    <View style = { currentStatus[itemArray[i*2+1]] === false ? localStyles.interestItem : localStyles.interestItemSelected }>
                        <Text style = {{ color : 'white', fontFamily : Fonts.varelaroundregular, marginLeft : 15}}> { itemArray[i*2+1] }</Text>
                        <View style = {{position : 'absolute', width : responsiveWidth(40), justifyContent : 'center'}}>
                            <TouchableHighlight
                                    underlayColor = 'transparent'
                                    style = {{position : 'absolute' ,marginLeft : responsiveWidth(40) - 45}}
                                    onPress = { () => { itemClicked(itemArray[i*2+1]) } }
                                    >
                                <Image source = {currentStatus[itemArray[i*2+1]] === false ? Images.ic_plus : Images.ic_added} style = {{ width : 40, height : 40, resizeMode : 'stretch',}}/>
                            </TouchableHighlight>
                        </View>
                    </View>
                    :
                    undefined
            }
        </View>)
        knowledgesItem.push(threeItems);
    }
    return knowledgesItem;
}


class Step7 extends Component {
    constructor(props){
        super(props);
        
        this.interestItemClicked = this.interestItemClicked.bind(this);

        this.state = {
            currentStatus : {
                Sport : false,
                Politics : false,
                Education : false,
                Travel : false,
                Fashion : false,
                Trends : false,
                Technology : false,
                Food : false,
                Architecture : false
           },
           interestItems : getInterestItems(interests, {
                    Sport : false,
                    Politics : false,
                    Education : false,
                    Travel : false,
                    Fashion : false,
                    Trends : false,
                    Technology : false,
                    Food : false,
                    Architecture : false
                },
                this.interestItemClicked
            ),
        }
    }

    interestItemClicked(key){
        var updatedStatus = this.state.currentStatus;
        updatedStatus[key] = !updatedStatus[key];

        this.setState({
            currentStatus : updatedStatus,
            interestItems : getInterestItems(interests, updatedStatus,this.interestItemClicked),
        });
    }

    render() {
        return (
            <View style = {localStyles.mainContainer}>
                <View style = {localStyles.nav_container}>
                    <Image source = { Images.ic_icon } style={ localStyles.iconStyle }/>
                </View>
                <View style = {localStyles.rocketContent}>
                    <Image source = {Images.ic_rocket} style = {localStyles.rocketIcon}/>
                    <Text style = {localStyles.interestExplan}>{I18n.t('INTEREST')}</Text>
                </View>
                <View style = {localStyles.interestContent}>
                    {
                        this.state.interestItems.map( (element) => {
                            return element;
                        })
                    }
                </View>
                <TouchableHighlight onPress = { () => { this.props.navigation.navigate('signup8') } } 
                            underlayColor = 'transparent'>
                    <View style = {localStyles.submitButton}>
                        <Text style={{fontFamily : Fonts.varelaroundregular, color : 'black', fontSize : responsiveFontSize(2)}}>
                            {I18n.t('SUBMIT')}
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}
export default Step7;