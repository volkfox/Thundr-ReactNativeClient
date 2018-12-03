/*  -- Thundr.js -- 
    Thundr navigation controller.
*/

import { 
  createAppContainer, 
  createStackNavigator, 
  createSwitchNavigator 
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

/* Main navigation stack */
const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
    //Home: TestScreen,
    NewBrainstorm: NewBrainstormScreen,
    Brainstorming: BrainstormingScreen,
    PostBrainstorm: PostBrainstormScreen,
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