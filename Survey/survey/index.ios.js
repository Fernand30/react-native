import Home from './js/home'
import {AppRegistry} from 'react-native'
import surveysecond from './js/surveysecond'
import surveywizard2 from './js/surveywizard2'
import surveycomplete from './js/surveycomplete'
import config from './js/config'
import configt from './js/configt'
import {
  StackNavigator,
} from 'react-navigation';

const App = StackNavigator({
  Home: { screen: Home },
  surveysecond: { screen: surveysecond },
  surveywizard2: { screen: surveywizard2 },
  surveycomplete: { screen: surveycomplete },
  config:{screen:config},
  configt:{screen:configt},
});

AppRegistry.registerComponent('survey', () => App);
