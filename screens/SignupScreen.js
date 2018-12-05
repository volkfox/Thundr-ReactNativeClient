/*  -- SignupPage.js -- 
    Sign up page for Thundr. Allows new users to create an account.
*/

/* 
    TODOS:
    - adjust height of back button
    - fill 'placeholder' in _asyncSignUp to store useful value
*/

import React from 'react'
import { 
    View, 
    StyleSheet, 
    StatusBar, 
    TouchableOpacity, 
    SafeAreaView, 
    Image,
    AsyncStorage,
} from 'react-native'
import FontStyles from '../components/FontStyles'
import SigninTextField from '../components/SigninTextField'
import { scale } from 'react-native-size-matters'
import ThundrButton from '../components/ThundrButton'

export default class SignupScreen extends React.Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle='dark-content'/>
                <View style={{ flex: 3.3 }}>
                    <SigninTextField text='Name'/>
                    <SigninTextField text='Email'/>
                    <SigninTextField text='Password' hidden={true}/>
                    <SigninTextField text='Confirm Password' hidden={true}/>
                </View>
                <View style={styles.continueContainer}>
                    <ThundrButton
                        text='Continue'
                        color='yellow'
                        onPress = {this._signUpAsync}
                    />
                </View>
                <View style={{ flex: 2.8 }}/>
            </SafeAreaView>
        )
    }

    /* */
    _signUpAsync = async () => {
        await AsyncStorage.setItem('userToken', 'placeholder')
        this.props.navigation.navigate('App')
    }

    /* Header styling. */
    static navigationOptions = ({navigation}) => ({
        title: 'Sign Up',       
        headerStyle: {
            borderBottomWidth: 0,
            height: FontStyles.headerHeight,
        },
        headerTintColor: '#FAD15F',
        headerTitleStyle: {
            fontFamily: 'HiraginoSans-W6',
            fontSize: FontStyles.large,
        },
        headerLeft: (
            <TouchableOpacity 
                style={ {paddingLeft: scale(12), paddingBottom: scale(9)} } 
                onPress={ () => {navigation.pop()}}
            >
                <Image
                    source={require('../images/back_arrow.png')}
                    resizeMode='contain'
                    style={ {width: scale(22), height: scale(22)} }
                />
            </TouchableOpacity>
        )
    })
}

/* Style sheet. */
const styles = StyleSheet.create({
    continueContainer: {
        flex: 1,
        justifyContent: 'center',
        marginTop: scale(20),
    },
})