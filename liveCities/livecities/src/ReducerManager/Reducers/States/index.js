import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import ActionTypes from '@ActionTypes';

const initialState = Immutable({ 
    email : '',
    password : '',
    firstname : '',
    lastname : '',
    token : '',
    avatar : '',
    resources : [],
    tasks : [],
    tasks_total : 0,
    tasks_filter : {},
    isLoggedIn : false,
});

const setCredentialEmail = function(state, action){
  console.log('Saving email .....');

  return ({
      ...state,
      email : action.email,
  });
}

const setCredentialPassword = function(state, action){
  console.log('Saving password ....');

  return ({
    ...state,
    password : action.password
  });
}

const setFirstnameLastname = function(state, action){
  console.log('Saving FirstName & LastName ....');

  return ({
    ...state,
    firstname : action.first,
    lastname : action.last,
  });
}

const setAvatar = function(state, action){
  console.log('Saving Avatar ....');
  
  return ({
    ...state,
    avatar : action.avatar
  });
}

const setLoginToken = function(state, action) {
    console.log('Saving token .....');
    return ({
        ...state,
        token : action.token,
        isLoggedIn : true
    });
};
const loadResources = function(state, action) {
    console.log('Loading Resources....');

    return ({
      ...state,
      resources : action.resources
    })
};

const loadTasks = function(state, action) {
  console.log('Loading Tasks....');

  return ({
    ...state,
    tasks : action.tasks,
    tasks_total : action.tasks_total,
    tasks_filter : action.tasks_filter
  })
};

const actionHandlers = {
  [ActionTypes.SET_CREDENTIAL_EMAIL] : setCredentialEmail,
  [ActionTypes.SET_CREDENTIAL_PASSWORD] : setCredentialPassword,
  [ActionTypes.SET_FIRSTNAME_LASTNAME] : setFirstnameLastname,
  [ActionTypes.SET_AVATAR] : setAvatar,
  [ActionTypes.SET_LOGIN_STATUS]: setLoginToken,
  [ActionTypes.LOAD_RESOURCE] : loadResources,
  [ActionTypes.LOAD_TASK] : loadTasks,
}

export default createReducer(initialState, actionHandlers);