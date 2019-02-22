/**
 * -- Thundr Navigation --
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { createAppContainer, createStackNavigator } from 'react-navigation';
import BrainstormingScreen from './src/screens/BrainstormingScreen';

export default App = createAppContainer(createStackNavigator(
    {
        Brainstorming: BrainstormingScreen,
    },
    {
        initialRouteName: "Brainstorming"
    }
));