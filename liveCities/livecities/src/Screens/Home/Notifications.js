import React, { Component } from 'react';
import { Animated, 
    Image, 
    ActivityIndicator , 
    View , 
    Text, 
    StyleSheet, 
    TouchableHighlight, 
    TextInput, 
    Alert,
    TouchableOpacity,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    FlatList,
    ListView
} from 'react-native';
import { connect } from 'react-redux';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import I18n from 'react-native-i18n';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Slider } from 'react-native-elements';
import  Rating from 'react-native-easy-rating'
import {BoxShadow} from 'react-native-shadow';
import OverlayView from './OverlayView';

import CommonWidgets from '@CommonWidgets';
import {Colors, Fonts, Icons, Images, Metrics, Styles, Constants } from '@Themes';
import Utils from '@src/utils';

function getNotificationItem(item){
    return (
        <View style = {{width : responsiveWidth(100), height : responsiveHeight(12), borderBottomWidth : 1, borderColor : '#b3b3b3', flexDirection : 'row', alignItems : 'center', justifyContent : 'center'}} >
            <View style = {{ width : responsiveWidth(100) - 40, height : responsiveHeight(12) * 0.6, flexDirection : 'row',}}>
                <Image source = {item.image} style = {{ width : responsiveHeight(12) * 0.5, height : responsiveHeight(12) * 0.5, resizeMode : 'stretch'}}/>
                <Text style = {{ 
                        width : responsiveWidth(100) - 35 - responsiveHeight(12) * 0.5 - responsiveWidth(10), 
                        height : responsiveHeight(12) * 0.5, 
                        marginLeft : 20, 
                        marginTop : 2,
                        fontSize : responsiveFontSize(1.5),
                        fontFamily : Fonts.varelaroundregular
                    }} >{item.explan}</Text>
                <Text style = {{
                        position : 'absolute', 
                        marginLeft : responsiveWidth(100) - 100, 
                        marginTop : responsiveHeight(12) * 0.6 - 20,
                        fontSize : responsiveFontSize(1.3),
                        fontFamily : Fonts.bold,
                        color : '#b3b3b3'
                    }}>
                    {item.time}
                </Text>
            </View>
        </View>
    )
}

class NotificationView extends Component {
    constructor(props){
        super(props);

        this.state = {
            notificationData : this.props.notification,
        }
    }
    render() {
        const width = responsiveWidth(100);
        const height = responsiveHeight(100) - Constants.Navbar_Height - 300;

        return (
            //<TouchableOpacity activeOpacity = { 1 } onPress = {() => { this.overlayView.closeAdding(); }}>
            <View style = {{height : height, width : width, backgroundColor : 'white'}}>
               
                <FlatList
                    style = {{height : responsiveHeight(100) - Constants.Navbar_Height - 300, width : responsiveWidth(100)}}
                    data={this.state.notificationData}

                    renderItem={({item}) => {
                        return (
                            <View>
                                {
                                    getNotificationItem(item)
                                }
                            </View>
                        )
                    }}
                    keyExtractor={(item, index) => index}
                />
                <OverlayView totalHeight = { height } isNotification = { true } ref = {(view) => { this.overlayView = view}} />
            </View>
            //</TouchableOpacity>
        )
    }
}

export default NotificationView;