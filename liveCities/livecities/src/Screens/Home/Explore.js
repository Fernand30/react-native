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

import CommonWidgets from '@CommonWidgets';
import {Colors, Fonts, Icons, Images, Metrics, Styles, Constants } from '@Themes';
import Utils from '@src/utils';
import OverlayView from './OverlayView';

const listWidth = responsiveWidth(85);
const listHeight = responsiveHeight(20);

const listContentHeight = listHeight*0.6;

const slideOptionHeight = responsiveHeight(70);
const extraOptionHeight = responsiveHeight(50);

const totalHeight = listHeight + slideOptionHeight + 30 + extraOptionHeight + 30 + 50;

const listItemWidth = (responsiveWidth(100) - 45) / 2.3;

function getListItem(item){
    return (
        <View style = {{width : listItemWidth, height : slideOptionHeight/2,  marginLeft : 15,}} key = {item.id}>
            <Image source = {item.image} style = {{width : listItemWidth, height : slideOptionHeight/2 * 0.8}}/>
            <View style = {{width : listItemWidth,height : slideOptionHeight/2 * 0.2, alignItems : 'center', justifyContent : 'center', flexDirection : 'column'}}>
                <Text style = {{fontSize : responsiveFontSize(1.3), color : '#131313', fontFamily : Fonts.varelaroundregular}}>{item.title}</Text>
                <View style = {{flexDirection : 'row', marginTop : 5}}>
                    <Image source = {Images.shape5} style = {{width : 9, height : 12, resizeMode : 'stretch'}}/>
                    <Text style = {{fontSize : responsiveFontSize(1.2), color : '#b3b3b3', fontFamily : Fonts.varelaroundregular}}>  {item.seguidores} seguidors</Text>
                </View>
            </View>
        </View>
    )
}
class Explore extends Component {
    constructor(props){
        super(props);

        this.state = {
            exploreData : this.props.explore   
        }
    }
    render() {

        return (
            //<TouchableOpacity activeOpacity = {1} onPress = {( ) => { this.overlayView.closeAdding() }}>
            <View style = {{height : totalHeight}}>
                <View style = {{width : responsiveWidth(100), height : listHeight, alignItems : 'center', justifyContent : 'center', borderColor : '#b3b3b3', borderBottomWidth : 1}}>
                    <View style = {{width : listWidth, height : listContentHeight, flexDirection : 'row'}}>
                        <Image source = {Images.explore} style = {{width : listContentHeight, height : listContentHeight, resizeMode : 'stretch'}}/>

                        <View style = {{width : (listWidth - listContentHeight ) * 0.95, marginLeft : (listWidth - listContentHeight ) * 0.05, height : listHeight * 0.6,}}>
                            <View style = {{width : (listWidth - listContentHeight ) * 0.95, height : listContentHeight * 0.2, marginTop : 3,borderBottomWidth : 1, borderColor : '#b3b3b3'}}>
                                <Text style = {{fontFamily : Fonts.varelaroundregular, fontSize : responsiveFontSize(1.6), color : '#505050'}}>LIST OF THE DAY</Text>
                            </View>
                            
                            <View style = {{width : (listWidth - listContentHeight ) * 0.95, height : listContentHeight * 0.4, marginTop : 5}}>
                                <Text style = {{fontSize : responsiveFontSize(1.5), fontFamily : Fonts.varelaroundregular, color : '#b3b3b3'}}>Challenges rising hype in your city and lorem ipsum dolor est</Text>
                            </View>

                            <View style = {{width : (listWidth - listContentHeight ) * 0.95, height : listContentHeight * 0.3 ,  flexDirection : 'row', alignItems : 'center'}}>
                                <Image source = { Images.shape4 } style = {{ width : responsiveWidth(5), height : responsiveWidth(5), resizeMode : 'stretch'}}/>
                                <Text style = {{fontSize : responsiveFontSize(1.7), fontFamily : Fonts.varelaroundregular, color : '#1d496e', marginLeft : 5}}>17</Text>
                            </View>
                        </View>

                    </View>
                </View>

                <View style = {{width : responsiveWidth(100), height : slideOptionHeight, marginTop : 30}}>
                    <View style = {{flex : 1, alignItems : 'center', justifyContent : 'center'}}>
                        <Text style = {{fontFamily : Fonts.varelaroundregular, color : '#131313', fontSize : responsiveFontSize(2.3)}}>Lists curated for you</Text>
                    </View>

                    <View style = {{flex : 5, backgroundColor : 'white',}}>
                        <ScrollView horizontal = { true } showsHorizontalScrollIndicator={false}>
                            <View style={{ flexDirection : 'row' }}>
                                {
                                    this.state.exploreData.map((item) => {
                                        return getListItem(item);
                                    })
                                }
                            </View>
                        </ScrollView>
                    </View>

                    <View style = {{flex : 4}}>
                        <View style = {{flex : 0.8,}}>
                        </View>
                        <View style = {{flex : 1, borderColor : '#b3b3b3', borderBottomWidth : 1, alignItems : 'center', flexDirection : 'row',marginLeft : 15, marginRight : 15}}>
                            <View style = {{flex : 2, alignItems : 'center'}}>
                                <Image source = {Images.shape1} style = {{width : responsiveWidth(5), height : responsiveHeight(2), resizeMode : 'stretch',}}/>
                            </View>
                            <View style = {{flex : 8}}>
                                <Text style = {{fontSize : responsiveFontSize(1.6), color : '#606060', fontFamily : Fonts.varelaroundregular}}>Most followed lists</Text>
                            </View>
                        </View>
                        <View style = {{flex : 1, borderColor : '#b3b3b3', borderBottomWidth : 1, alignItems : 'center', flexDirection : 'row',marginLeft : 15, marginRight : 15}}>
                            <View style = {{flex : 2, alignItems : 'center'}}>
                                <Image source = {Images.shape2} style = {{width : responsiveWidth(3), height : responsiveHeight(3), resizeMode : 'stretch',}}/>
                            </View>
                            <View style = {{flex : 8}}>
                                <Text style = {{fontSize : responsiveFontSize(1.6), color : '#606060', fontFamily : Fonts.varelaroundregular}}>New updates</Text>
                            </View>
                        </View>
                        <View style = {{flex : 1, borderColor : '#b3b3b3', borderBottomWidth : 1, alignItems : 'center', flexDirection : 'row',marginLeft : 15, marginRight : 15}}>
                            <View style = {{flex : 2, alignItems : 'center'}}>
                                <Image source = {Images.shape3} style = {{width : responsiveWidth(3.5), height : responsiveHeight(3), resizeMode : 'stretch'}}/>
                            </View>
                            <View style = {{flex : 8}}>
                                <Text style = {{fontSize : responsiveFontSize(1.6), color : '#606060', fontFamily : Fonts.varelaroundregular}}>Close to be confirmed</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style = {{width : responsiveWidth(100), height : extraOptionHeight, marginTop : 30, flexDirection : 'column'}}>
                    <View style = {{flex : 1,}}>
                        <Image source = {Images.explore_list1} style = {{width : responsiveWidth(100), height : extraOptionHeight/3, resizeMode : 'stretch', justifyContent : 'center', alignItems : 'center'}}>
                            <View style = {{width : responsiveWidth(90), height : extraOptionHeight/3/2, flexDirection : 'row'}}>
                                <View style = {{flex : 9, flexDirection : 'column', justifyContent : 'space-between'}}>
                                    <Text style ={{backgroundColor : 'transparent', color : 'white', fontFamily : Fonts.varelaroundregular, fontSize : responsiveFontSize(2.5)}}>Challenges saved</Text>
                                    <View style = {{flexDirection : 'row', alignItems : 'center'}}>
                                        <Image source = {Images.explore_fav} style = {{width : 15, height : 13, resizeMode : 'stretch'}}/>
                                        <Text style = {{color : 'white', fontFamily : Fonts.varelaroundregular, backgroundColor : 'transparent', marginLeft : 5}}>12</Text>
                                    </View>
                                </View>  
                                <View style = {{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
                                    <Image source = {Images.explore_next} style = {{width : responsiveWidth(3), height : responsiveHeight(3), resizeMode : 'stretch'}}/>
                                </View>
                            </View>
                        </Image>
                    </View>

                    <View style = {{flex : 1, marginTop : 10}}>
                        <Image source = {Images.explore_list2} style = {{width : responsiveWidth(100), height : extraOptionHeight/3, resizeMode : 'stretch', justifyContent : 'center', alignItems : 'center'}}>
                            <View style = {{width : responsiveWidth(90), height : extraOptionHeight/3/2, flexDirection : 'row'}}>
                                <View style = {{flex : 9, flexDirection : 'column', justifyContent : 'space-between'}}>
                                    <Text style ={{backgroundColor : 'transparent', color : 'white', fontFamily : Fonts.varelaroundregular, fontSize : responsiveFontSize(2.5)}}>Romantics</Text>
                                    <View style = {{flexDirection : 'row', alignItems : 'center'}}>
                                        <Text style = {{color : 'white', fontFamily : Fonts.varelaroundregular, backgroundColor : 'transparent', }}>27 llibres</Text>
                                    </View>
                                </View>  
                                <View style = {{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
                                    <Image source = {Images.explore_next} style = {{width : responsiveWidth(3), height : responsiveHeight(3), resizeMode : 'stretch'}}/>
                                </View>
                            </View>
                        </Image>
                    </View>

                    <View style = {{flex : 1, marginTop : 10}}>
                        <Image source = {Images.explore_list3} style = {{width : responsiveWidth(100), height : extraOptionHeight/3, resizeMode : 'stretch', justifyContent : 'center', alignItems : 'center'}}>
                                <View style = {{width : responsiveWidth(90), height : extraOptionHeight/3/2, flexDirection : 'row'}}>
                                <View style = {{flex : 9, flexDirection : 'column', justifyContent : 'space-between'}}>
                                    <Text style ={{backgroundColor : 'transparent', color : 'white', fontFamily : Fonts.varelaroundregular, fontSize : responsiveFontSize(2.5)}}>Momens de creativitat</Text>
                                    <View style = {{flexDirection : 'row', alignItems : 'center'}}>
                                        <Text style = {{color : 'white', fontFamily : Fonts.varelaroundregular, backgroundColor : 'transparent', }}>7 llibres</Text>
                                    </View>
                                </View>  
                                <View style = {{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
                                    <Image source = {Images.explore_next} style = {{width : responsiveWidth(3), height : responsiveHeight(3), resizeMode : 'stretch'}}/>
                                </View>
                            </View>
                        </Image>
                    </View>
                </View>

                <OverlayView totalHeight = {totalHeight} ref = {(view) => { this.overlayView = view}}/>
            </View>
            //</TouchableOpacity>
        )
    }
}

export default Explore;