import { StackNavigator } from 'react-navigation';
import Splash from '@Splash';
import InitialScreen from '@Authentication/Initial';

import HomeScreen from '@HomeNavigator';

import { Step1, Step2} from '@LoginSteps';
import { RegStep1, RegStep2, RegStep3, RegStep4, RegStep5, RegStep6, RegStep7, RegStep8} from '@RegisterSteps';

const AppNavigator = StackNavigator(
  {
    initialScreen: { screen: InitialScreen },
    login1 : {screen : Step1},
    login2 : {screen : Step2},
    signup1 : {screen : RegStep1},
    signup2 : {screen : RegStep2},
    signup3 : {screen : RegStep3},
    signup4 : {screen : RegStep4},
    signup5 : {screen : RegStep5},
    signup6 : {screen : RegStep6},
    signup7 : {screen : RegStep7},
    signup8 : {screen : RegStep8},
    homeScreen : {screen : HomeScreen},
  },
  {
    initialRouteName: 'initialScreen',
    navigationOptions: {
      header: null,
      cardStack: { gesturesEnabled: false },
    },

    headerMode: 'screen',
    lazyLoad: true,
  }
);

export default AppNavigator;
