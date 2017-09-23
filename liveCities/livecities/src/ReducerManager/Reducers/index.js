import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import states from '@States';
import skills from '@Skills';

const AppReducer = combineReducers({
  states,
  skills,
});

export default AppReducer;