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
    Text, 
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

export default class SignupScreen extends React.Component {
    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <StatusBar barStyle='dark-content'/>
                <View style={styles.inputContainer}>
                    <SigninTextField 
                        text='Name' 
                        hidden={false}
                    />
                    <SigninTextField 
                        text='Email' 
                        hidden={false}
                    />
                    <SigninTextField 
                        text='Password' 
                        hidden={true}
                    />
                    <SigninTextField 
                        text='Confirm Password' 
                        hidden={true}
                    />
                </View>
                <View style={styles.continueContainer}>
                    <TouchableOpacity 
                        style={styles.continueButton}
                        onPress={this._signUpAsync}
                    >
                        <Text style={styles.continueText}>Continue</Text>
                    </TouchableOpacity> 
                </View>
                <View style={styles.keyboardContainer}/>
            </SafeAreaView>
        )
    }

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
    safeContainer: {
        flex: 1,
    },
    inputContainer: {
        flex: 3.3,
    },
    continueContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    continueButton: {
        backgroundColor: '#FAD15F',
        alignItems: 'center',
        height: FontStyles.buttonHeight,
        marginHorizontal: scale(30),
        borderRadius: 100,
    },
    continueText: {
        fontFamily: 'HiraginoSans-W6',
        color: '#FFFFFF',
        fontSize: FontStyles.medium,
        paddingVertical: (FontStyles.buttonHeight - FontStyles.medium) / 2,
    },
    keyboardContainer: {
        flex: 2.8,
    }
})