/*  -- LoginPage.js --
    Log in page for Thundr. Allows existing users to log in to their accounts.
*/

/*
    Todos:
    - adjust height of back button
    - replace 'placeholder' in _asyncLogin with useful value
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

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Login',       
        headerStyle: {
            borderBottomWidth: 0,
            height: Dimensions.get('window').height / 8,
        },
        headerTintColor: '#FAD15F',
        headerTitleStyle: {
            fontFamily: 'HiraginoSans-W6',
            fontSize: FontStyles.header,
        },
        headerBackTitle: null,
    }
    
    render() {
        return (
            <SafeAreaView style={styles.safeContainer}> 
                <View style={styles.container}>
                    <StatusBar barStyle='dark-content'/>
                    <View style={styles.inputContainer}>
                        <View style={styles.fieldContainer}>
                            <SigninTextField 
                                text='Email'
                                hidden={false}
                            />
                        </View>
                        <View style={styles.fieldContainer}>
                            <SigninTextField 
                                style={styles.fieldContainer}
                                text='Password'
                                hidden={true}
                            />
                        </View>
                    </View>
                    <View style={styles.forgotContainer}>
                        <TouchableOpacity 
                            style={styles.forgotButton}
                            onPress={ () => this.props.navigation.push('Forgot')}
                        >
                            <Text style={styles.forgotText}>Forgot your password?</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.continueContainer}>
                        <TouchableOpacity 
                            style={styles.continueButton}
                            onPress={this._asyncLogin}
                        >
                            <Text style={styles.continueText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.keyboardContainer}/>
                </View>
            </SafeAreaView>
        )
    }

    _asyncLogin = async () => {
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
        flex: 2,
        paddingVertical: 15,
    },
    fieldContainer: {
        flex: 1,
    },
    forgotContainer:{
        flex: 0.7,
    },
    forgotButton: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 100,
    },
    forgotText: {
        fontFamily: 'HiraginoSans-W3',
        fontSize: FontStyles.small,
        color: '#4B4A4A',
    },
    continueContainer: {
        flex: 1,
    },
    continueButton: {
        backgroundColor: '#FAD15F',
        alignItems: 'center',
        height: FontStyles.title,
        marginHorizontal: 25,
        borderRadius: 100,
    },
    continueText: {
        color: '#FFFFFF',
        fontFamily: 'HiraginoSans-W6',
        fontSize: FontStyles.body,
        paddingVertical: (FontStyles.title - FontStyles.body) / 2,
    },
    keyboardContainer: {
       flex: 3.2,
    },
})