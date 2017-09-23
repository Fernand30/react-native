import React, { Component } from 'react';
import { Animated, 
    Image, 
    ActivityIndicator , 
    View , 
    Text, 
    StyleSheet, 
    TouchableHighlight, 
    TouchableOpacity,
    TextInput, 
    Platform, 
    KeyboardAvoidingView, 
    Keyboard,
    ListView,
    FlatList
} from 'react-native';
import {
    NormalApi, LoginApi, RegisterApi, CreateResourceApi, UpdateResourceApi, UploadAvatar,
    GetResourceApi, DeleteResourceApi, CreateTaskApi , RetriveTaskApi,
    UpdateTaskApi, AddTaskRequirementApi, AddTaskTag, DeleteTaskTag
} from '@ServerApi';
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

import { connect } from 'react-redux';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import I18n from 'react-native-i18n';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import CommonWidgets from '@CommonWidgets';
import {Colors, Fonts, Icons, Images, Metrics, Styles, Constants } from '@Themes';
import Utils from '@src/utils';
import ProposalCard from './ProposalCard';
import { loadResources, loadTasks } from '@Actions/Auth';

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

    followingExplan : {
        fontFamily : Fonts.varelaroundregular,
        fontSize : responsiveFontSize(2),
        color : 'white',
        width : responsiveWidth(70),
        marginTop : 10,
        textAlign : 'center'
    },

    followingContent : {
        width : responsiveWidth(100),
        height : responsiveHeight(60) + 20,
        backgroundColor : 'white'
    },

    gotohomeButton : {
        width : responsiveWidth(100),
        height : responsiveHeight(10) - 20,
        backgroundColor : Colors.backgroundThird,
        alignItems : 'center',
        justifyContent : 'center'
    }
})

class Step8 extends Component {
    constructor(props){
        super(props);
        
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            isLoading : false,
            dataSource: [
                {
                    "key": 1,
                    "name": "Nunc maximus, nulla sit amet consectetur porttitor",
                    "image": Images.image2,
                    "city": "Ajuntament de Barcelona",
                    "joins": {
                      "count": 239,
                      "percentage": 60
                    }
                },
                {
                    "key": 2,
                    "name": "Nunc maximus, nulla sit amet consectetur porttitor",
                    "image": Images.image1,
                    "city": "Ajuntament de Barcelona",
                    "joins": null,
                },
                {
                    "key": 3,
                    "name": "Nunc maximus, nulla sit amet consectetur porttitor",
                    "image": Images.image3,
                    "city": "Ajuntament de Barcelona",
                    "joins": {
                      "count": 239,
                      "percentage": 60
                    }
                }
            ]
        };
    }
    render(){
        var Indicator = 
            <View style={{ position : 'absolute', width : responsiveWidth(100), height : responsiveHeight(100), backgroundColor : 'transparent' }}>
                <BallIndicator color = {Colors.backgroundThird} animationDuration={800} size={responsiveWidth(30)}/>
            </View>
        return (
            <View style = {localStyles.mainContainer}>
                <View style = {localStyles.nav_container}>
                    <Image source = { Images.ic_icon } style={ localStyles.iconStyle }/>
                </View>

                <View style = {localStyles.rocketContent}>
                    <Image source = {Images.ic_rocket} style = {localStyles.rocketIcon}/>
                    <Text style = {localStyles.followingExplan}>{I18n.t('FOLLOWING')}</Text>
                </View>

                <FlatList
                    style = { localStyles.followingContent }
                    data={this.state.dataSource}

                    renderItem={({item}) => {
                        return <ProposalCard {...this.props} data = {item} 
                                onSelected = {() => {
                                    var dataSC = this.state.dataSource
                                    var index = dataSC.indexOf(item);
                                    dataSC.splice(index, 1);

                                    this.setState({
                                        dataSource : dataSC
                                    });
                                }} 
                                style={{marginBottom : 5}}/>
                    }}
                />

                <TouchableHighlight 
                    style = { localStyles.gotohomeButton } 
                    underlayColor = 'transparent' 
                    onPress = { ( ) => {
                        this.setState({
                            isLoading : true
                        })
                        GetResourceApi(this.props.appstatus.token).then( respAgain => {
                            this.props.loadResources(respAgain);
                            console.log(respAgain);

                            RetriveTaskApi(this.props.appstatus.token).then( resp2 => {
                                this.props.loadTasks(resp2.items, resp2.total, resp2.filter);
                                console.log( resp2 );
                                
                                this.setState({
                                    isLoading : false
                                });

                                Keyboard.dismiss();
                                this.props.navigation.dispatch(Utils.getResetAction('homeScreen'));
                            });
                        });
                    }}>
                    <Text style={{fontFamily : Fonts.varelaroundregular, color : 'white', fontSize : responsiveFontSize(2)}} >{ I18n.t('GOTOHOME') }</Text>
                </TouchableHighlight>
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
        loadResources : rsc => dispatch(loadResources(rsc)),
        loadTasks : (tasks, tasks_total, tasks_filter) => dispatch(loadTasks(tasks, tasks_total, tasks_filter))
    };
}

function mapStateToProps(state) {
    return { appstatus : state.states };
}

export default connect(mapStateToProps,mapDispatchToProps)(Step8);