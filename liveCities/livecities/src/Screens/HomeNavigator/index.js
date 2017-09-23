import { StackNavigator } from 'react-navigation';

import Home from '@Home';

const HomeNavigator = StackNavigator(
    {
      homescreen: { screen: Home },
    },
    {
      initialRouteName: 'homescreen',
      navigationOptions: {
        header: null,
        cardStack: { gesturesEnabled: false },
      },
  
      headerMode: 'screen',
      lazyLoad: true,
    }
  );
  
  export default HomeNavigator;