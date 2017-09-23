import React, { Component } from 'react';
import { 
    Animated, 
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
    ScrollView,
    Alert
} from 'react-native';
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
    NormalApi, LoginApi, RegisterApi, CreateResourceApi, UpdateResourceApi, getSkillListWidthStrApi,
    GetResourceApi, DeleteResourceApi, CreateTaskApi , RetriveTaskApi,
    UpdateTaskApi, AddTaskRequirementApi, AddTaskTag, DeleteTaskTag
} from '@ServerApi';

import CommonWidgets from '@CommonWidgets';
import {Colors, Fonts, Icons, Images, Metrics, Styles, Constants } from '@Themes';
import Utils from '@src/utils';
import { addSkill, setSkillList } from '@Actions/Skill';

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

    atomContent : {
        width : responsiveWidth(100),
        height : responsiveHeight(25) - Constants.Navbar_Height,
        alignItems : 'center',
        justifyContent : 'center'
    },

    filterContent : {
        width : responsiveWidth(100),
        height : responsiveHeight(15),
        justifyContent : 'center',
    },

    knowledgeContent : {
        width : responsiveWidth(100),
        height : responsiveHeight(60),
    },
    atom_icon : {
        width : 40,
        height : 40,
        resizeMode : 'stretch',
        marginBottom : 15,
    },

    filterInput : {
        color : 'white', 
        fontSize : responsiveFontSize(3), 
        width : responsiveWidth(80),
        fontFamily : Fonts.varelaroundregular,
        marginLeft : responsiveWidth(10)
    },

    examText : {
        color : 'white', 
        fontFamily : Fonts.varelaroundregular, 
        textAlign : 'right', 
        width : responsiveWidth(90)
    },

    knowledgeBox : {
        width : responsiveWidth(100),
        height : responsiveHeight(40),
        marginTop : 20,
        flexDirection : 'column'
    },

    knowledgeItem : {
        width : responsiveWidth(28), 
        height : 30, 
        borderRadius : 30, 
        borderWidth : 1, 
        borderColor : 'rgba(255,255,255,0.5)',
        alignItems : 'center',
        justifyContent : 'center',
        marginLeft : 15,
    },

    linearItem : {
        width : responsiveWidth(28), 
        height : 30, 
        borderRadius : 30, 
        borderWidth : 1, 
        borderColor : 'rgba(255,255,255,0.5)',
        justifyContent : 'center',
        marginLeft : 15,
    },

    resultBox : {
        width : responsiveWidth(100),
        height : responsiveHeight(23),
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
/*
const knowledges = [
    "Python",
    "React Native",
    "C/C++",
    "PHP",
    "Javascript",
    "Node.js",
    "AWS"
];
*/
function getKnowledgeItems(knowledges, onTapped){
    var knowledgesItem = [ ];
    
    console.log(knowledges);

    for(let i = 0; i < knowledges.length / 3 ; i ++ ){

        var threeItems = (
        <View style = {{width : responsiveWidth(100), height : 30, flexDirection : 'row', marginBottom : 10}} key = { i }>
            {
                knowledges[i*3] !== undefined ? 
                    <TouchableHighlight underlayColor = 'transparent' onPress = { () => { onTapped(knowledges[i*3]); }}>
                    <View style = { localStyles.knowledgeItem }>
                        <Text style = {{ color : 'white', fontFamily : Fonts.varelaroundregular}}> { knowledges[i*3].name }</Text>
                    </View>
                    </TouchableHighlight>
                    :
                    undefined
            }
            
            {
                knowledges[i*3 + 1] !== undefined ? 
                    <TouchableHighlight underlayColor = 'transparent' onPress = { () => { onTapped(knowledges[i*3 + 1]); }}>
                    <View style = { localStyles.knowledgeItem }>
                        <Text style = {{ color : 'white', fontFamily : Fonts.varelaroundregular}}> { knowledges[i*3 + 1].name }</Text>
                    </View>
                    </TouchableHighlight>
                    :
                    undefined
            }

            {
                knowledges[i*3 + 2] !== undefined ? 
                    <TouchableHighlight underlayColor = 'transparent' onPress = { () => { onTapped(knowledges[i*3 + 2]); }}>
                    <View style = { localStyles.knowledgeItem }>
                        <Text style = {{ color : 'white', fontFamily : Fonts.varelaroundregular}}> { knowledges[i*3 + 2].name }</Text>
                    </View>
                    </TouchableHighlight>
                    :
                    undefined
            }
        </View>)
        knowledgesItem.push(threeItems);
    }
    return knowledgesItem;
}

function getLinearItem ( skills, onRemoved ){
    var skillsItem = [];
    for(let i = 0; i < skills.length ; i ++ ){
        var temp = (
            <View style = { localStyles.linearItem } key={i}>
                <Text style = {{ color : 'white', fontFamily : Fonts.varelaroundregular, marginLeft : 10 , backgroundColor : 'transparent', width : responsiveWidth(28) - 15, height : 15}}>{ skills[i].name }</Text>
                
                <TouchableHighlight underlayColor = 'transparent' onPress = { () => { onRemoved(skills[i]); }} style = {{width : 20 ,position : 'absolute', borderRadius : 30,  marginLeft : responsiveWidth(28) - 28,}}>
                    <Image source = {Images.ic_remove} style = {{ width : 20, height : 20 }}/>
                </TouchableHighlight>
            </View>
        )
        skillsItem.push(temp);
    }
    return skillsItem;
}

function getfiltered( knowledges, filterStr, onTapped ){
    if(filterStr !== '')
    {
        var filteredItems = [];
        for(i = 0; i < knowledges.length; i ++){
            console.log(knowledges[i]);
            if( knowledges[i].name.includes(filterStr) ){
                filteredItems.push(knowledges[i]);
            }
        }
        return getKnowledgeItems(filteredItems, onTapped);
    }
    else{
        return getKnowledgeItems(knowledges, ( skillTap ) => { });
    }
    
}

class Step6 extends Component {
    constructor(props){
        super(props);

        this.state = {
            knowledges : this.props.skills.loadedSkills,
            isLoading : false,
            filterText : '',
            knowledgesItem : getKnowledgeItems(this.props.skills.loadedSkills, ( skillTap ) => { }),
            filteredItem : getfiltered(this.props.skills.loadedSkills, '', ( skillTap ) => { }),
            skillList : Utils.clone(this.props.skills.skillList) ,
            skillsAdded : getLinearItem( this.props.skills.skillList ),
        };

        console.log(this.props.skills.loadedSkills);
        
        this.onfilterdSkillsTapped = this.onfilterdSkillsTapped.bind(this);
        this.onSkillRemoved = this.onSkillRemoved.bind(this);
        this.onResultBox = this.onResultBox.bind(this);
    }
    
    isValidSkill(skillList, skillName){
        for(let i = 0; i<  skillList.length ;i ++){
            if(skillList[i].name === skillName){
                return false;
            }
        }
        return true;
    }

    onfilterdSkillsTapped( skillTapped ){
        console.log( skillTapped );
        
        var currentSkillList = this.state.skillList;

        if( this.isValidSkill(currentSkillList, skillTapped.name) )
        {
            currentSkillList.push(skillTapped);
            
            this.setState({
                skillList : currentSkillList,
                skillsAdded : getLinearItem(currentSkillList, removedSkill => {
                    this.onSkillRemoved( removedSkill );
                })
            });
        }
        else{
            Alert.alert('Not Added', 'The skill is already added to list!!');
        }
        
    }

    onSkillRemoved( skillRemoved ){
        console.log( skillRemoved );
        
        var currentSkillList = this.state.skillList;

        var index = currentSkillList.indexOf(skillRemoved);
        currentSkillList.splice(index, 1);

        console.log(currentSkillList);

        this.setState({
            skillList : currentSkillList,
            skillsAdded : getLinearItem(currentSkillList, removedSkill => {
                this.onSkillRemoved( removedSkill );
            })
        });
    }

    onResultBox(){
        if(this.state.filterText === ''){
            if(this.state.skillsAdded.length !== 0){
                return (
                    <View style={localStyles.resultBox}>
                        <View style = {{width : responsiveWidth(100), height : responsiveHeight(23) - 60}}>
                        {
                            
                        }
                        </View>
                        {
                            this.state.skillsAdded.length !== 0 ?
                                <View style = {{width : responsiveWidth(100), height : 60, backgroundColor : '#58a37c', flexDirection : 'row', alignItems : 'center'}}>
                                    <Image source = {Images.ic_avatar} style = {{ width : 40, height : 40, borderRadius : 20 , marginLeft : 15,resizeMode : 'cover'}}/>
                                    <ScrollView horizontal = {true} >
                                        <View style = {{width : (responsiveWidth(28) + 15) * this.state.skillsAdded.length + 60 , alignItems : 'center',height : 40, flexDirection : 'row'}}>
                                        {
                                            this.state.skillsAdded.map( (element) => {
                                                return element;
                                            })
                                        }
                                        </View>
                                    </ScrollView>
                                    <TouchableHighlight style={{ position : 'absolute',
                                                    marginLeft : responsiveWidth(100) - 60}}
                                                onPress = {() => {
                                                    Keyboard.dismiss();
                                                    this.props.setSkills(this.state.skillList);
                                                    this.props.navigation.navigate('signup7');
                                                }}
                                            >
                                        <View style = {{ width : 60, 
                                                    height : 60, 
                                                    backgroundColor : 'white', 
                                                    alignItems : 'center', 
                                                    justifyContent : 'center',
                                                }}>
                                            <Text>OK</Text>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                                :
                                undefined
                        }
                    </View>
                );
            }
            else{
                return (
                    <View style = { localStyles.knowledgeContent}>
                        <Text style={ localStyles.examText } >{I18n.t('EXAM')}</Text>
                        <View style = { localStyles.knowledgeBox }>
                            {
                                this.state.knowledgesItem.map( ( element ) => {
                                    return element;
                                })
                            }
                        </View>
                    </View>
                );
            }
        }
        else{
            return undefined;
        }
    }
    render() {
        var Indicator = 
            <View style={{ position : 'absolute', width : responsiveWidth(100), height : responsiveHeight(100), backgroundColor : 'transparent' }}>
                <BallIndicator color='white' animationDuration={800} size={responsiveWidth(30)}/>
            </View>
        return (
            <TouchableOpacity activeOpacity = {1} onPress = { () => { 
                //Keyboard.dismiss() 
            }}>
            <View style={localStyles.mainContainer}>

                <View style = { localStyles.nav_container }>
                    <Image source = { Images.ic_icon } style={ localStyles.iconStyle }/>
                    {
                        this.state.filterText !== '' ?
                            <TouchableHighlight underlayColor = 'transparent' onPress = {() => { this.props.navigation.navigate('signup7') }} style = {{position : 'absolute',marginLeft : responsiveWidth(100) - 25,}}>
                                <Image source = {Images.ic_next} style = { localStyles.nextButton }/>
                            </TouchableHighlight>
                            :
                            undefined
                    }
                </View>

                <View style = { localStyles.atomContent }>
                    <Image source = { Images.ic_atom } style = { localStyles.atom_icon }/>
                    <Text style = { { color : 'white', fontFamily : Fonts.varelaroundregular}}>{I18n.t('ADDKNOWLEDGE')}</Text>
                </View>

                <KeyboardAvoidingView behavior='position'>
                <View style = { localStyles.filterContent }>
                    <TextInput 
                        style = { localStyles.filterInput } 
                        autoCorrect = { false }
                        autoFocus = { true }
                        placeholder = { I18n.t('DOMINATES') }
                        underlineColorAndroid = 'transparent' 
                        placeholderTextColor = 'rgba(255,255,255,0.4)'
                        value = {this.state.filterText}
                        onChangeText = { (text) => {
                            if(text.length < 3){
                                this.setState({
                                    filterText : text,
                                    filteredItem : getfiltered(
                                        this.state.knowledges, 
                                        text,  skillTapped => { this.onfilterdSkillsTapped(skillTapped) }
                                    ),
                                });
                            }
                            else{
                                this.setState({
                                    isLoading : true,
                                    filterText : text
                                });

                                getSkillListWidthStrApi(this.props.appstatus.token, text).then(resp => {
                                    this.setState({
                                        isLoading : false,
                                        filteredItem : getKnowledgeItems( resp.results.items, skillTapped => { this.onfilterdSkillsTapped(skillTapped)} )
                                    });
                                    console.log(resp);
                                });
                            }
                        }}
                    ></TextInput>
                </View>
                {
                    this.state.filterText !== '' ?
                        <View style={localStyles.resultBox}>
                            <View style = {{width : responsiveWidth(100), height : responsiveHeight(23) - 60}}>
                            {
                                this.state.filteredItem.map( ( element ) => {
                                    return element;
                                })
                            }
                            </View>
                            {
                                this.state.skillsAdded.length !== 0 ?
                                    <View style = {{width : responsiveWidth(100), height : 60, backgroundColor : '#58a37c', flexDirection : 'row', alignItems : 'center'}}>
                                        <Image source = {Images.ic_avatar} style = {{ width : 40, height : 40, borderRadius : 20 , marginLeft : 15,resizeMode : 'cover'}}/>
                                        <ScrollView horizontal = {true} >
                                            <View style = {{width : (responsiveWidth(28) + 15) * this.state.skillsAdded.length + 60 , alignItems : 'center',height : 40, flexDirection : 'row'}}>
                                            {
                                                this.state.skillsAdded.map( (element) => {
                                                    return element;
                                                })
                                            }
                                            </View>
                                        </ScrollView>
                                        <TouchableHighlight style={{ position : 'absolute',
                                                        marginLeft : responsiveWidth(100) - 60}}
                                                    onPress = {() => {
                                                        Keyboard.dismiss();
                                                        this.props.setSkills(this.state.skillList);

                                                        this.setState({
                                                            isLoading : true
                                                        });

                                                        for(let i = 0; i< this.state.skillList.length ; i ++){
                                                            AddTaskTag(this.props.appstatus.token, this.state.skillList[i].name).then(resp => {
                                                                if(i === this.state.skillList.length - 1)
                                                                {
                                                                    console.log(resp);
                                                                    this.setState({
                                                                        isLoading : false
                                                                    });
                                                                    this.props.navigation.navigate('signup7');
                                                                }
                                                                console.log(resp);
                                                            });
                                                        }
                                                        //this.props.navigation.navigate('signup7');
                                                    }}
                                                >
                                            <View style = {{ width : 60, 
                                                        height : 60, 
                                                        backgroundColor : 'white', 
                                                        alignItems : 'center', 
                                                        justifyContent : 'center',
                                                    }}>
                                                <Text>OK</Text>
                                            </View>
                                        </TouchableHighlight>
                                    </View>
                                    :
                                    undefined
                            }
                        </View>
                        :
                        undefined
                }
                </KeyboardAvoidingView>
                {
                    this.onResultBox()
                }
                {
                    this.state.isLoading ? Indicator : undefined
                }
            </View>
            </TouchableOpacity>
        )
        
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        addSkill : skill => dispatch(addSkill(skill)),
        setSkills : skills => dispatch(setSkillList(skills))
    };
}

function mapStateToProps(state) {
    return { 
        appstatus : state.states,
        skills : state.skills 
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Step6);