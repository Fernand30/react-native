import ActionType from '@ActionTypes';

export const addSkill = ( skill ) => ({
    type : ActionType.ADD_SKILL, skill
});

export const setSkillList = (skillList) => ({
    type : ActionType.SET_SKILL_LIST, skillList
});


export const loadSkills = ( skills ) => ({
    type : ActionType.LOAD_SKILLS , skills
});