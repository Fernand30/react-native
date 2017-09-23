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
import OverlayView from './OverlayView';

const itemWidth = (responsiveWidth(100) - 30)/2;
const extraDataHeight = responsiveHeight(100)/10;
const mainPictureWidth = itemWidth;
const mainPictureHeight = itemWidth - 20;

const itemHeight = mainPictureHeight + extraDataHeight;

function getFirstDataItem(item){
    return (
    <View style = {{width : itemWidth, height : itemHeight, marginLeft : 10,}}>
        <Image 
            style = {{
                width : mainPictureWidth, 
                height : mainPictureHeight, 
                resizeMode : 'stretch'
            }}
            source = {Images.update1}
            >
            <Image source = {Images.ic_fav_transparent} 
                style = {{
                    width : 30, 
                    height : 30, 
                    resizeMode : 'stretch', 
                    position : 'absolute',
                    marginTop : 10,
                    backgroundColor : 'transparent',
                    marginLeft : mainPictureWidth - 40
                }}/>

            <Image source = {Images.ic_people_white} 
                style = {{
                    width : 20, 
                    height : 13, 
                    resizeMode : 'stretch', 
                    position : 'absolute',
                    marginTop : mainPictureHeight - 25,
                    marginLeft : 10
                }}/>

            <Text
                style = {{
                    position : 'absolute',
                    backgroundColor : 'transparent',
                    fontFamily : Fonts.varelaroundregular,
                    color : 'white',
                    marginTop : mainPictureHeight - 25,
                    marginLeft : 40
                }}
                >236{
                    
                    //Count
                }</Text>
        </Image>
        <View style = {{width : itemWidth, height : extraDataHeight, flexDirection : 'column',}}>
            <View style = {{ height : extraDataHeight/2, padding : 5 }}>
                <Text style={{fontFamily : Fonts.varelaroundregular, fontSize : responsiveFontSize(1.4), color : 'black'}}>{item.description}</Text>
            </View>
            <View style = {{ height : extraDataHeight/2, alignItems : 'center', justifyContent : 'center',}}>
                <View style = {{ width : itemWidth - 10, height : extraDataHeight/5 , flexDirection : 'row', }}>
                    <Text style={{
                        fontFamily : Fonts.varelaroundregular, 
                        fontSize : responsiveFontSize(1.1), 
                        color : '#b3b3b3',
                        width : itemWidth/2 - 10,
                        
                    }}>{item.name}</Text>

                    <View style = {{width : itemWidth/2, alignItems : 'flex-end',marginBottom : 13}}>
                        <View style = {{alignItems : 'center', justifyContent : 'center',}}>
                            <Text style={{fontSize : 8, fontFamily : Fonts.varelaroundregular, color : Colors.backgroundThird}}>
                                { 
                                    item.completed_count
                                }%
                            </Text>
                            <Slider
                                minimumTrackTintColor = '#64BF89'
                                thumbTintColor = 'transparent'
                                disabled
                                minimumValue = { 0 }
                                maximumValue = { 1 }
                                value = { item.completed_count / 100 }
                                style = {{width : itemWidth/2 - 30, height : 4, }}
                                trackStyle={ { height : 4, borderRadius : 4 }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    </View>
    )
}

function getFirstView(data){
    var fitData = [];
    for(let i = 0; i < data.length/2 ;i ++)
    {
        var first = getFirstDataItem(data[i*2] === undefined ? undefined : data[i*2]);
        var second = getFirstDataItem(data[i*2 + 1] === undefined ? undefined : data[i*2 + 1]);

        console.log(data[i*2], data[i*2+1]);

        var line = (
            <View style = {{ width : responsiveWidth(100), height : itemHeight, flexDirection : 'row'}} key = { i }>
                {
                    first
                }
                {
                    second
                }
            </View>
        )
        fitData.push(line);
    }
    return fitData;
}

const resourceWidth = responsiveWidth(100);
const resourceHeight = itemHeight * 4 / 7;

function getResourceItem(item){
    const favorImageSize = responsiveWidth(9);

    return (
        <View style={{width : resourceWidth, height : resourceHeight, flexDirection : 'row',borderColor : '#b3b3b3',borderTopWidth : 1, justifyContent : 'center', alignItems : 'center'}} key = {item.id}>
            <View style = {{width : resourceHeight, height : resourceHeight, justifyContent : 'center', alignItems : 'center'}}>
                <Image source = {Images.resource1} style = {{ width : resourceHeight - resourceHeight/5+10, height : resourceHeight - resourceHeight/5, resizeMode : 'stretch'}}/>
            </View>

            <View style = {{ width : resourceWidth - resourceHeight, height : resourceHeight - resourceHeight/5,}}>
                <View style = {{ flex : 1, alignItems : 'center', flexDirection : 'row'}}>
                    <Image source = {Images.ic_dot_green} style = {{width : 8, height : 8, resizeMode : 'stretch'}}/>
                    <Text style = {{ fontFamily : Fonts.bold, fontSize : responsiveFontSize(1.4), marginLeft : 8, color : '#303030'}}>{item.team}</Text>
                    <Image source = {Images.ic_dot_gray} style = {{width : 5, height : 5,resizeMode : 'stretch', marginLeft : 8}}/>
                    <Text style = {{fontFamily : Fonts.varelaroundregular, fontSize : responsiveFontSize(1.6), marginLeft : 8, color : '#b3b3b3'}}>LIBRE</Text>
                </View>
                <View style = {{ flex : 3, justifyContent : 'center'}}>
                    <Text style={{fontFamily : Fonts.varelaroundregular, fontSize : responsiveFontSize(1.5),}}>{item.description}</Text>
                </View>
                <View style = {{ flex : 2, flexDirection : 'row', alignItems : 'flex-end' }}>
                    <View style = {{flexDirection : 'row', width : (resourceWidth - resourceHeight) * 3 / 7}}>
                        <Text style = {{fontSize : responsiveFontSize(1.5), fontFamily : Fonts.varelaroundregular, color : '#b3b3b3'}}>by</Text>
                        <Text style = {{fontSize : responsiveFontSize(1.6), marginLeft : 5,fontFamily : Fonts.varelaroundregular, color : '#1946a1'}}>{item.owner}</Text>
                    </View>
                    <View style = {{position : 'absolute', marginLeft : (resourceWidth - resourceHeight) * 3  / 7 , flexDirection : 'row', alignItems : 'center'}}>
                        <Rating
                            rating = {3}
                            max = {5}
                            iconWidth = {12}
                            iconHeight = {12}
                            iconSelected = { Images.ic_star_selected }
                            iconUnselected = { Images.ic_star_unselected }
                            editable = { false }
                            style = {{ marginBottom : 3, }}
                            //onRate={(rating) => this.setState({rating: rating})}
                            />
                        <Text style = {{fontFamily : Fonts.varelaroundregular, fontSize : responsiveFontSize(1.7), marginLeft : 3, color : '#b3b3b3'}}>{22}</Text>
                    </View>
                    <Image source = {Images.ic_favorite_2} style = {{width : favorImageSize, height : favorImageSize, resizeMode : 'stretch', position : 'absolute', marginLeft : resourceWidth - resourceHeight - favorImageSize - 10 }}/>
                </View>
            </View>
        </View>
    )
}


class MyUpdate extends Component {
    constructor(props){
        super(props);

        this.state = {
            tasks : this.props.tasks,
            resources : this.props.resources,

            firstView : getFirstView(this.props.tasks),
            //resourcesView : getResourcesView(this.props.resources)
        };
    }
    render() {
        var firstHeight = itemHeight * this.state.firstView.length;
        var secondHeight = itemHeight / 2;
        var thirdresourceHeight = resourceHeight * this.state.resources.length + 30;

        var totalHeight =  firstHeight + secondHeight + thirdresourceHeight + 50;
        return (
            <TouchableOpacity activeOpacity = {1} onPress={() => { this.addView.closeAdding() }}>
            <View style = {{flexDirection : 'column',  backgroundColor : 'white' , marginTop : 5, height : totalHeight}}>
                <View style={{flexDirection : 'column', width : responsiveWidth(100),height : firstHeight, borderBottomWidth : 1, borderColor : '#b3b3b3'}}>
                    {
                        this.state.firstView.map( (element) => {
                            return element;
                        })
                    }
                </View>
                <View style = {{
                    width : responsiveWidth(100), 
                    height : secondHeight, 
                    justifyContent : 'center', 
                    alignItems : 'center'
                    }}>
                    <View
                        style = {{
                            width : responsiveWidth(100) - 40,
                            height : secondHeight*3/5,
                            flexDirection : 'row'
                        }}
                        >
                        <Image source = {Images.banner1} style = {{width : (responsiveWidth(100) -60)/2, height : secondHeight*3/5, resizeMode : 'stretch'}}/>
                        <Image source = {Images.banner2} style = {{width : (responsiveWidth(100) -60)/2, height : secondHeight*3/5, marginLeft : 20,resizeMode : 'stretch', }}/>
                    </View>
                </View>
                <View style = { { width  : resourceWidth, height : thirdresourceHeight, alignItems : 'center', borderColor : '#b3b3b3', borderBottomWidth : 1}}>
                    <Text style = {{ height : 30,  fontFamily : Fonts.varelaroundregular}}>NEW RESOURCES</Text>
                    {
                        this.state.resources.map((element) => {
                            return getResourceItem(element);
                        })
                    }
                </View>
                <OverlayView totalHeight = { totalHeight } ref = { (overlayView) => { this.addView = overlayView } }/>
            </View>
            </TouchableOpacity>
        );
    }
}

export default MyUpdate;