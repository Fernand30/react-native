import ActionType from '@ActionTypes';

export const setCredentialEmail = ( email ) => ({
    type : ActionType.SET_CREDENTIAL_EMAIL, email
});

export const setCredentialPassword = ( password ) => ({
    type : ActionType.SET_CREDENTIAL_PASSWORD, password
});

export const setFirstnameLastName = (first, last) => ({
    type : ActionType.SET_FIRSTNAME_LASTNAME, first, last
});

export const setAvatar = (avatar) => ({
    type : ActionType.SET_AVATAR , avatar
});

export const setLoginToken = ( token ) => ({
    type : ActionType.SET_LOGIN_STATUS, token
});

export const loadResources = ( resources ) => ({
    type : ActionType.LOAD_RESOURCE , resources
});

export const loadTasks = ( tasks, tasks_total, tasks_filter ) => ({
    type : ActionType.LOAD_TASK , tasks , tasks_total, tasks_filter
});
