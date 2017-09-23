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

import CommonWidgets from '@CommonWidgets';
import {Colors, Fonts, Icons, Images, Metrics, Styles, Constants } from '@Themes';
import Utils from '@src/utils';
import MyUpdate from './MyUpdate';
import MyNotification from './Notifications';
import MyExplore from './Explore';

const localStyles = StyleSheet.create({
    nav_container : {
        width : responsiveWidth(100),
        height : Constants.Navbar_Height,
        backgroundColor : '#17385b',
        alignItems : 'center',
        flexDirection : 'row',
    },

    iconStyle : {
        width : 20,
        height : Constants.Navbar_Height - 15,
        marginLeft : 20,
        resizeMode : 'stretch',
    },
//40
    ic_searchStyle : {
        width : 20,
        height : 20,
        marginLeft : responsiveWidth(100) - 150,
        resizeMode : 'stretch'
    },
    
    ic_countStyle : {
        width : 25,
        height : 25,
        resizeMode : 'stretch',
        marginLeft : 20,

        alignItems : 'center',
        justifyContent : 'center'
    },

    ic_menuStyle : {
        width : 5,
        height : Constants.Navbar_Height - 25,
        marginLeft : 20,
        resizeMode : 'stretch'
    },
});

const firstData = [
    {
        count : 239,
        image : Images.update1,
        data : 'Clases de lorem ipsu dolor sit amet conset.',
        groupName : 'ANNA GARRIGA',
        percentage : 60,
    },
    {
        count : 239,
        image : Images.update2,
        data : 'Clases de lorem ipsu dolor sit amet conset.',
        groupName : 'ANNA GARRIGA',
        percentage : 10,
    },
    {
        count : 239,
        image : Images.update1,
        data : 'Clases de lorem ipsu dolor sit amet conset.',
        groupName : 'ANNA GARRIGA',
        percentage : 60,
    },
    {
        count : 239,
        image : Images.update3,
        data : 'Clases de lorem ipsu dolor sit amet conset.',
        groupName : 'ANNA GARRIGA',
        percentage : 60,
    },
];

const resources = [
    {
        id : 1,
        title : 'SPACE',
        status : 'AVAILABLE',
        explan : 'Sala de reuniones con capacidad para 12 personas y proyector.',
        owner : 'Jordi Bruc',
        star : 3,
        rating : 22,
        image : Images.resource1
    },
    {
        id : 2,
        title : 'EQUIPMENT',
        status : 'AVAILABLE',
        explan : 'Nunc maximus, nulla sit amet consectetur porttitor',
        owner : 'Live Deed SL',
        star : 3,
        rating : 22,
        image : Images.resource2
    },
    {
        id : 3,
        title : 'SKILL',
        status : 'BLOCKED',
        explan : 'Django + Python proin tempus vel neque eget condimentu',
        owner : 'Biel Montalvo',
        star : 3,
        rating : 22,
        image : Images.resource3,
    },
];

const notifications = [
    {
        image : Images.notification1,
        explan : 'This challenge migh interest you: Angular Hackaton by Angular Camp BCN.',
        time : '20 MIN',
        id : 1
    },
    {
        image : Images.notification2,
        explan : 'The conference room for your challenge React Native workshop is ready!',
        time : '1 HORA',
        id : 2
    },
    {
        image : Images.notification3,
        explan : 'This challenge migh interest you: Angular Hackaton by Angular Camp BCN.',
        time : '2 HORA',
        id : 3
    }
];

const explore = [
    {
        image : Images.explore_slide1,
        title : 'Courses and workshops',
        seguidores : 82,
        id : 1,
    },
    {
        image : Images.explore_slide2,
        title : 'Sports in your town',
        seguidores : 422,
        id : 2
    },
    {
        image : Images.explore_slide1,
        title : 'Sports in your town',
        seguidores : 422,
        id : 3
    },
    {
        image : Images.explore_slide2,
        title : 'Sports in your town',
        seguidores : 422,
        id : 4
    }
];

class HomeScreen extends Component {
    constructor(props){
        super(props);

        this.state = {
            isMyUpdate : true,
            isNotification : false,
            isExplore : false,

            tasks : this.props.app_state.tasks,
            resources : this.props.app_state.resources,
        }
    }

    switchView(value){
        this.setState({
            isMyUpdate : false,
            isNotification : false,
            isExplore : false,
        });

        if(value === 'MyUpdate'){
            this.setState({
                isMyUpdate : true
            })
        }
        if(value === 'MyNotification'){
            this.setState({
                isNotification : true
            })
        }
        if(value === 'MyExplore'){
            this.setState({
                isExplore : true
            })
        }
    }

    render() {
        return (
            <View style = {{backgroundColor : 'white'}}>
                {
                    CommonWidgets.renderHiddenStatusBar()
                }
                <View style={localStyles.nav_container}>
                    <Image source = { Images.ic_icon } style = { localStyles.iconStyle }/>
                    <Image source = { Images.ic_search } style = { localStyles.ic_searchStyle}/>
                    <Image source = { Images.ic_count } style = { localStyles.ic_countStyle}>
                        <Text style = {{ color : 'white', fontSize : responsiveFontSize(1.5), backgroundColor : 'transparent', fontFamily : Fonts.bold}}>03</Text>
                    </Image>
                    <Image source = { Images.ic_menu } style = { localStyles.ic_menuStyle }/>
                </View>
                <ScrollView bounces = {false} showsVerticalScrollIndicator = {false}
                    >
                    <View style = {{width : responsiveWidth(100), height : 250, backgroundColor : '#17385b'}}>
                        <View style = {{backgroundColor : '#5ec4d7', width : 90, height : 20 , borderRadius : 20, marginTop : 30, marginLeft : 30,alignItems : 'center', justifyContent : 'center'}}>
                            <Text style = {{fontSize : 10, color : 'white', fontFamily : Fonts.bold}}>{I18n.t('FEATURED')}</Text>
                        </View>

                        <View style={{
                            width : responsiveWidth(60),
                            borderBottomWidth : 2, 
                            borderColor : 'white',
                            position : 'absolute', 
                            marginTop : 30, 
                            marginLeft : responsiveWidth(40) - 20,}}>
                            <Text 
                                style = {{
                                    fontSize : responsiveFontSize(3), 
                                    color : 'white', 
                                    fontFamily : Fonts.varelaroundregular, 
                                    textAlign : 'right'
                                }}>
                                {I18n.t('TRAFFIC')}
                            </Text>
                        </View>

                        <Text 
                            style = {{
                                width : responsiveWidth(40),
                                fontFamily : Fonts.bold, 
                                fontSize : responsiveFontSize(1.5),
                                position : 'absolute',
                                color : 'white',
                                marginTop : 120,
                                textAlign : 'right',
                                marginLeft : responsiveWidth(60) - 20,
                            }}>
                            AJUNTAMENT DE BARCELONA
                        </Text>

                        <View style={{flexDirection : 'row', position : 'absolute', marginTop : 150, marginLeft : responsiveWidth(100) - 80 }}>
                            <Image source = {Images.ic_calendar} style = {{width : 15, height : 15, resizeMode : 'stretch'}}/>
                            <Text
                                style = {{
                                    fontFamily : Fonts.varelaroundregular,
                                    fontSize : responsiveFontSize(1.5),
                                    color : '#b3b3b3',
                                    width : 45,
                                    textAlign : 'right'
                                }}
                                >
                                23 feb
                            </Text>
                        </View>
                        
                        <View style={{alignItems : 'center', flexDirection : 'column', width : 100, position : 'absolute', marginTop : 200, marginLeft : responsiveWidth(100) - 120 }}>
                            <Text style={{fontSize : 9, fontFamily : Fonts.varelaroundregular, color : Colors.backgroundThird}}>
                                60%
                            </Text>
                            <Slider
                                minimumTrackTintColor = '#64BF89'
                                thumbTintColor = 'transparent'
                                disabled
                                value={0.6}
                                style={{width : 100, height : 15}}
                                trackStyle={ { height : 7, borderRadius : 7 }}
                            />
                        </View>

                        <Image source = {Images.img_smart} style = {{width : 200, height : 200, resizeMode : 'stretch', position : 'absolute', marginTop : 50}}/>
                    </View>

                    <View style = {{width : responsiveWidth(100), height : 50, borderTopWidth : 1, borderBottomWidth : 1,borderColor : '#b3b3b3', flexDirection : 'row'}}>
                        <TouchableHighlight
                                style = {{flex : 1, alignItems : 'center', justifyContent : 'center'}}
                                underlayColor = 'transparent'
                                onPress = {() => { this.switchView('MyUpdate') }}
                            >
                            <Text style={{fontFamily : Fonts.bold, fontSize : responsiveFontSize(1.7), color : this.state.isMyUpdate === true ? 'black' : '#b3b3b3' }}>MY UPDATES</Text>
                        </TouchableHighlight>
                        
                        <TouchableHighlight 
                                style = {{flex : 1, alignItems : 'center', justifyContent : 'center', }}
                                underlayColor = 'transparent'
                                onPress = {() => { this.switchView('MyNotification') }}
                            >
                            <View style = {{ flexDirection : 'row', alignItems : 'center'}}>
                                <Text style={{fontFamily : Fonts.bold, fontSize : responsiveFontSize(1.7), color : this.state.isNotification === true ? 'black' : '#b3b3b3' }}>NOTIFICATIONS</Text>
                                <Image source = { Images.ic_count } 
                                        style = { { width : 20,
                                            height : 20,
                                            marginLeft : 5,
                                            resizeMode : 'stretch',
                                            alignItems : 'center',
                                            justifyContent : 'center' } }>
                                    <Text style = {{ color : 'white', fontSize : responsiveFontSize(1.5), backgroundColor : 'transparent', fontFamily : Fonts.bold}}>03</Text>
                                </Image>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight 
                                style = {{flex : 1, alignItems : 'center', justifyContent : 'center'}}
                                underlayColor = 'transparent'
                                onPress = {() => { this.switchView('MyExplore') }}
                            >
                            <Text style={{fontFamily : Fonts.bold, fontSize : responsiveFontSize(1.7), color : this.state.isExplore === true ? 'black' : '#b3b3b3'}}>EXPLORE</Text>
                        </TouchableHighlight>
                    </View>
                    {
                        this.state.isMyUpdate ? <MyUpdate tasks = {this.state.tasks} resources = {this.state.resources}/> : undefined
                    }
                    {
                        this.state.isNotification ? <MyNotification notification = { notifications }/> : undefined
                    }
                    {
                        this.state.isExplore ? <MyExplore explore = { explore }/> : undefined
                    }
                </ScrollView>
            </View>
        );
    }
}
//
function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

function mapStateToProps(state) {
    const app_state = state.states;
    return { app_state };
}

export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen);