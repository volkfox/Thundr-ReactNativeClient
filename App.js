/*
 * Thundr
 */

import { createAppContainer, createStackNavigator } from 'react-navigation';
import BrainstormingScreen from './src/screens/BrainstormingScreen';
import HomeScreen from './src/screens/HomeScreen';

export default App = createAppContainer(createStackNavigator(
    {
        Home: HomeScreen,
        Brainstorming: BrainstormingScreen,
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none',
    }
));