/*  -- Thundr.js -- 
    Thundr navigation controller.
*/

import { 
  createAppContainer, 
  createStackNavigator, 
  createSwitchNavigator ,
} from 'react-navigation'
import AuthLoadingScreen from './screens/AuthLoadingScreen'
import BrainstormingScreen from './screens/BrainstormingScreen'
import EntryScreen from './screens/EntryScreen'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import NewBrainstormScreen from './screens/NewBrainstormScreen'
import PastBrainstormScreen from './screens/PastBrainstormScreen'
import PostBrainstormScreen from './screens/PostBrainstormScreen'
import SignupScreen from './screens/SignupScreen'

/* Main navigation stack */
const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
    Brainstorming: BrainstormingScreen,
    NewBrainstorm: NewBrainstormScreen,
    PastBrainstorm: PastBrainstormScreen,
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

/* Wraps App flow and Authentication flow in a switch navigator. */
export default createAppContainer(createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthStack,
    AuthLoading: AuthLoadingScreen,
  },
  {
    initialRouteName: 'AuthLoading',
  }
))