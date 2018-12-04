/*  -- Thundr.js -- 
    Thundr navigation controller.
*/

import { 
  createAppContainer, 
  createStackNavigator, 
  createSwitchNavigator ,
  createDrawerNavigator,
} from 'react-navigation'
import EntryScreen from './screens/EntryScreen'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'
import AuthLoadingScreen from './screens/AuthLoadingScreen'
import NewBrainstormScreen from './screens/NewBrainstormScreen'
import BrainstormingScreen from './screens/BrainstormingScreen'
import TestScreen from './screens/TestScreen';
import PostBrainstormScreen from './screens/PostBrainstormScreen'
import PastBrainstormScreen from './screens/PastBrainstormScreen'
import { create } from 'uuid-js';

/* Main navigation stack */
const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    //Home: TestScreen,
    NewBrainstorm: NewBrainstormScreen,
    Brainstorming: BrainstormingScreen,
    PostBrainstorm: PostBrainstormScreen,
    PastBrainstorm: PastBrainstormScreen,
  },
  {
    initialRouteName: 'Home',
  }
)

/* Authentication navigation stack (signin). */
const AuthStack = createStackNavigator(
  {
    Entry: EntryScreen,
    Forgot: ForgotPasswordScreen,
    Login: LoginScreen,
    NewBrainstorm: NewBrainstormScreen,
    Signup: SignupScreen,
  },
  {
    initialRouteName: 'Entry',
  }
)

/* Wraps HomeStack and ProfileStack in a drawer navigator. */
const AppStack = createDrawerNavigator(
  {
    Home: HomeStack,
    Test: TestScreen,
  }
)

/* Wraps App flow and Authentication flow in a switch navigator. */
export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
))