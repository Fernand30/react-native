import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import ActionTypes from '@ActionTypes';

const initialState = Immutable({ 
    skillList : [],
    loadedSkills : [],
});

const addSkill = function(state, action){
    console.log('Adding Skill ....');
    var currentSkillList = state.skillList;

    currentSkillList.push(action.skill);
    return ({
        ...state,
        skillList : currentSkillList
    });
}

const setSkillList = function(state, action){
    console.log('Saving Skill List....');

    return ({
        ...state,
        skillList : action.skillList
    })
}

const loadSkills = function(state, action) {
    console.log('Loading Skills.....');
  
    return ({
      ...state,
      loadedSkills : action.skills,
    })
}

const actionHandlers = {
    [ActionTypes.ADD_SKILL] : addSkill,
    [ActionTypes.SET_SKILL_LIST] : setSkillList,
    [ActionTypes.LOAD_SKILLS] : loadSkills
}
  
  export default createReducer(initialState, actionHandlers);