import React, { Component } from 'react';
import { Animated, Image, ActivityIndicator , View , Text, StyleSheet, TouchableHighlight, TouchableOpacity,TextInput, Platform, KeyboardAvoidingView, Keyboard} from 'react-native';
import { connect } from 'react-redux';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import I18n from 'react-native-i18n';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Slider } from 'react-native-elements';
import  Rating from 'react-native-easy-rating'
const timer = require('react-native-timer');

import CommonWidgets from '@CommonWidgets';
import {Colors, Fonts, Icons, Images, Metrics, Styles, Constants } from '@Themes';
import Utils from '@src/utils';

class ProposalCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            information : props.data,
            isSaved : false,
            selectedFavorite : props.onSelected,
        }
    }

    componentWillUnmount() {
        timer.clearTimeout(this);
    }

    render() {
        var favourite = (
            <View style = {{width : responsiveWidth(100) - responsiveHeight(20), height : responsiveHeight(20) - 30}}>
                <View style={{width : responsiveWidth(100) - responsiveHeight(20) - 50, height : (responsiveHeight(20) - 30)*2/5 }}>
                    <Text style={{fontFamily : Fonts.varelaroundregular, color : 'black', fontSize : responsiveFontSize(1.6)}}>{this.state.information.name}</Text>
                </View>
                <View style={{width : responsiveWidth(100) - responsiveHeight(20), height : (responsiveHeight(20) - 30)/5, alignItems : 'center', flexDirection : 'row' }}>
                    <Image source={Images.ic_people} style={{ width : (responsiveHeight(20) - 30)/5 - 3 , height : (responsiveHeight(20) - 30)/5 - 8, resizeMode : 'stretch'}}/>
                    
                    <Text style = {{marginLeft : 10, fontSize : responsiveFontSize(1.5), fontFamily : Fonts.varelaroundregular, color : '#b3b3b3' }}>
                        {
                            this.state.information.joins !== null ? this.state.information.joins.count : 0
                        }
                    </Text>

                    <Image source = {Images.ic_dot_gray} style = {{width : 5, height : 5, resizeMode : 'stretch', marginLeft : 10}}></Image>
                    
                    <View style={{width : 100, height : (responsiveHeight(20) - 30)/5, justifyContent : 'center', alignItems : 'center'}}>
                        <Text style={{fontSize : 9, fontFamily : Fonts.varelaroundregular, color : Colors.backgroundThird}}>
                            { 
                                this.state.information.joins !== null ? this.state.information.joins.percentage : 0
                            }%
                        </Text>
                        <Slider
                            minimumTrackTintColor = '#64BF89'
                            thumbTintColor = 'transparent'
                            disabled
                            value={0.6}
                            style={{width : 70, height : 5}}
                        />
                    </View>
                </View>
                <View style = {{width : responsiveWidth(100) - responsiveHeight(20), height : (responsiveHeight(20) - 30)*2/5, alignItems : 'flex-end', flexDirection : 'row'}}>
                    <Text style={{fontSize : responsiveFontSize(1.5), color : '#b3b3b3', fontFamily : Fonts.varelaroundregular}}>de</Text>
                    <Text style={{fontSize : responsiveFontSize(1.6), color : '#4065b3', marginLeft : 5}}>{ this.state.information.city }</Text>

                    <TouchableHighlight 
                        underlayColor = 'transparent' 
                        style = {{marginLeft : responsiveWidth(100) - responsiveHeight(20) - 50, position : 'absolute'}}
                        onPress = {() => { 
                            this.setState({ isSaved : true });
                            //this.state.selectedFavorite();
                            
                            timer.setTimeout(
                                this, 'saveFavorite', () => { this.state.selectedFavorite() }, 500
                            );
                        }}>
                        <Image style = {{width : 30, height : 30, resizeMode : 'stretch', }} source = { this.state.isSaved === true ? Images.ic_favorite_select : Images.ic_favorite}/>
                    </TouchableHighlight>
                </View>
            </View>
        );
        var proposal = (
            <View style = {{width : responsiveWidth(100) - responsiveHeight(20), height : responsiveHeight(20) - 30}}>
                <View style={{width : responsiveWidth(100) - responsiveHeight(20) - 50, height : (responsiveHeight(20) - 30)/5, flexDirection : 'row', alignItems : 'center' }}>
                    <Image source = {Images.ic_dot_green} style = {{ width : 7, height : 7, resizeMode : 'stretch'}}/>
                    <Text style = {{ fontFamily : Fonts.bold, fontSize : responsiveFontSize(1.3), marginLeft : 10}}>EQUIPAMIENTO</Text>
                    <Image source = {Images.ic_dot_gray} style = {{width : 5, height : 5, resizeMode : 'stretch', marginLeft : 10}}></Image>
                    <Text style = {{fontFamily : Fonts.varelaroundregular, color : '#b3b3b3', fontSize : responsiveFontSize(1.5), marginLeft : 10}}>LIBRE</Text>
                </View>

                <View style={{width : responsiveWidth(100) - responsiveHeight(20) - 50, height : (responsiveHeight(20) - 30)*2/5, flexDirection : 'row', alignItems : 'center' }}>
                    <Text style={{fontFamily : Fonts.varelaroundregular, color : 'black', fontSize : responsiveFontSize(1.6)}}>{this.state.information.name}</Text>
                </View>

                <View style={{width : responsiveWidth(100) - responsiveHeight(20) - 50, height : (responsiveHeight(20) - 30)*2/5, flexDirection : 'row', alignItems : 'flex-end'}}>
                    <Text style={{fontSize : responsiveFontSize(1.5), color : '#b3b3b3', fontFamily : Fonts.varelaroundregular}}>de</Text>
                    <Text style={{fontSize : responsiveFontSize(1.6), color : '#4065b3', marginLeft : 5, width : 100}}>{ this.state.information.city }</Text>
                    <Rating
                        rating = {1}
                        max = {5}
                        iconWidth = {12}
                        iconHeight = {12}
                        iconSelected = { Images.ic_star_selected }
                        iconUnselected = { Images.ic_star_unselected }
                        editable = { false }
                        style = {{ marginBottom : 2 }}
                        //onRate={(rating) => this.setState({rating: rating})}
                        />
                    <Text style = {{ fontSize : responsiveFontSize(1.5), color : '#b3b3b3', marginBottom : 1, marginLeft : 2}}>22</Text>
                    <TouchableHighlight underlayColor = 'transparent' 
                        style = {{marginLeft : responsiveWidth(100) - responsiveHeight(20) - 50, position : 'absolute'}}
                        onPress = {() => {
                            this.setState({ isSaved : true });
                            //this.state.selectedFavorite();
                                
                            timer.setTimeout(
                                this, 'saveFavorite', () => { this.state.selectedFavorite() }, 500
                            );
                        } }>
                        <Image style = {{width : 30, height : 30, resizeMode : 'stretch', }} source = {Images.ic_favorite_2}/>
                    </TouchableHighlight>
                </View>
            </View>
        )
        return (
            <View style={{width : responsiveWidth(100), height : responsiveHeight(20), flexDirection : 'row', alignItems : 'center', borderBottomWidth : 1, borderColor : 'gray'}}>
                <View style={{width : responsiveHeight(20), height : responsiveHeight(20), alignItems : 'center', justifyContent : 'center'}}>
                    <Image source = {this.state.information.image} style = { { width : responsiveHeight(20) - 30, height : responsiveHeight(20) - 30, resizeMode : 'stretch'}}></Image>
                </View>
                {
                    this.state.information.joins !== null ? favourite : proposal
                }
                {
                    this.state.isSaved === true ? 
                        <View style = {{
                            width : responsiveWidth(100) , 
                            height : responsiveHeight(20) , 
                            backgroundColor : 'rgba(4,70,143,0.5)', 
                            position : 'absolute', 
                            justifyContent : 'center', 
                            alignItems : 'center'
                        }}>
                            <Text style = {{fontFamily : Fonts.bold, color : 'white', fontSize : responsiveFontSize(2.3)}}>{I18n.t('SAVED')}</Text>
                        </View>
                        :
                        undefined
                }
                
            </View>
        );
    }
}

export default ProposalCard;