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
    Dimensions,
    AsyncStorage,
} from 'react-native'
import FontStyles from '../components/FontStyles'
import SigninTextField from '../components/SigninTextField'

export default class SignupScreen extends React.Component {
    static navigationOptions = {
        title: 'Sign Up',       
        headerStyle: {
            borderBottomWidth: 0,
            height: Dimensions.get('window').height / 8,
        },
        headerTintColor: '#FAD15F',
        headerTitleStyle: {
            fontFamily: 'HiraginoSans-W6',
            fontSize: FontStyles.header,
        },
    }
    
    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <View style={styles.container}>
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
                </View>
            </SafeAreaView>
        )
    }

    _signUpAsync = async () => {
        await AsyncStorage.setItem('userToken', 'placeholder')
        this.props.navigation.navigate('App')
    }
}



const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
    },
    container: {
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
        height: FontStyles.title,
        marginHorizontal: 20,
        borderRadius: 100,
    },
    continueText: {
        fontFamily: 'HiraginoSans-W6',
        color: '#FFFFFF',
        fontSize: FontStyles.body,
        paddingVertical: (FontStyles.title - FontStyles.body) / 2,
    },
    keyboardContainer: {
        flex: 2.8,
    }
})