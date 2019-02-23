/**
 * -- Thundr Navigation --
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { createAppContainer, createStackNavigator } from 'react-navigation';
import BrainstormingScreen from './src/screens/BrainstormingScreen';
import HomeScreen from './src/screens/HomeScreen';

export default App = createAppContainer(createStackNavigator(
    {
        Brainstorming: BrainstormingScreen,
        Home: HomeScreen,
    },
    {
        initialRouteName: "Brainstorming"
        // initialRouteName: "Home"
    }
));