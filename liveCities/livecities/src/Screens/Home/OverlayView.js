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
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import I18n from 'react-native-i18n';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Slider } from 'react-native-elements';
import  Rating from 'react-native-easy-rating'
import {BoxShadow} from 'react-native-shadow';

import CommonWidgets from '@CommonWidgets';
import {Colors, Fonts, Icons, Images, Metrics, Styles, Constants } from '@Themes';
import Utils from '@src/utils';

class OverlayView extends Component {
    constructor(props){
        super(props);

        this.state = {
            totalHeight : this.props.totalHeight,
            isNotification : this.props.isNotification,
            isAdd : false,
        };

        this.closeAdding = this.closeAdding.bind(this);
    }

    closeAdding(){
        this.setState({
            isAdd : false
        })
    }

    render() {
        var extraMarginTop = this.state.isNotification ? 0 : 50;
        return (
            <View style = {{width : responsiveWidth(65), height : responsiveHeight(25),  position : 'absolute', marginLeft : responsiveWidth(35),  marginTop : this.state.totalHeight - responsiveHeight(25) - extraMarginTop }}>
                <View style = {{flex : 4, justifyContent : 'center'}}>
                    {
                        this.state.isAdd ? 
                            <BoxShadow setting={{
                                width : responsiveWidth(65) * 0.6,
                                height : responsiveHeight(25) * 0.4 * 0.5,
                                radius:5,
                                opacity:0.1,
                                x:2,
                                y:3,
                                style : {marginLeft : 25}
                            }}>
                                <View style = {{
                                    backgroundColor : '#E01021', 
                                    width : responsiveWidth(65) * 0.6, 
                                    height : responsiveHeight(25) * 0.4 * 0.5, 
                                    borderRadius : 5,
                                    alignItems : 'center',
                                    flexDirection : 'row'
                                    }}>
                                    <Image source = {Images.plus} style = {{ width : 25, height : 25, marginLeft : 5, resizeMode : 'stretch',}}/>
                                    <Text style = {{fontSize : responsiveFontSize(1.5), color : 'white', marginLeft : 5}}>ADD RESOURCE</Text>
                                </View>
                            </BoxShadow>
                            
                            :

                            undefined
                    }
                </View>
                <View style = {{flex : 6, flexDirection : 'row'}}>
                    {
                        this.state.isAdd ? 
                            <BoxShadow setting={{
                                width : responsiveWidth(65) * 0.6,
                                height : responsiveHeight(25) * 0.4 * 0.5,
                                radius:5,
                                opacity:0.1,
                                x:2,
                                y:3,
                            }}>
                                <View style = {{ 
                                    width : responsiveWidth(65) * 0.6, 
                                    height : responsiveHeight(25) * 0.4 * 0.5, 
                                    backgroundColor : '#E01021', 
                                    borderRadius : 5,
                                    flexDirection : 'row',
                                    alignItems : 'center'
                                    }}>
                                    <Image source = {Images.plus} style = {{ width : 25, height : 25, marginLeft : 5, resizeMode : 'stretch',}}/>
                                    <Text style = {{fontSize : responsiveFontSize(1.5), color : 'white', marginLeft : 5}}>ADD CHALLENGE</Text>
                                </View>
                            </BoxShadow>

                            :

                            <View style = {{
                                width : responsiveWidth(65) * 0.6,
                                height : responsiveHeight(25) * 0.4 * 0.5,}}>
                            </View>
                    }
                    <TouchableHighlight
                        underlayColor = 'transparent'
                        onPress = {() => { 
                            this.setState({
                                isAdd : !this.state.isAdd
                            })
                        }}
                        >
                        <Image source = { this.state.isAdd ? Images.close_adding : Images.open_adding } style = {{width : responsiveWidth(65) * 0.3, height : responsiveWidth(65) * 0.3, resizeMode : 'stretch', marginLeft : responsiveWidth(65) * 0.05}}/>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

export default OverlayView;