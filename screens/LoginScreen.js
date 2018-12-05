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
    AsyncStorage, 
    Image,
} from 'react-native'
import FontStyles from '../components/FontStyles'
import SigninTextField from '../components/SigninTextField'
import { scale } from 'react-native-size-matters'
import ThundrButton from '../components/ThundrButton';

export default class LoginScreen extends React.Component {
    render() {
        return (
            <SafeAreaView style={styles.safeContainer}> 
                <StatusBar barStyle='dark-content'/>
                <View style={styles.inputContainer}>
                    <View style={styles.fieldContainer}>
                        <SigninTextField text='Email'/>
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
                <ThundrButton
                    text='Continue'
                    color='yellow'
                    onPress={this._asyncLogin}
                />
                <View style={styles.keyboardContainer}/>
            </SafeAreaView>
        )
    }

    _asyncLogin = async () => {
        await AsyncStorage.setItem('userToken', 'placeholder')
        this.props.navigation.navigate('App')
    }
    
    /* Header styling. */
    static navigationOptions = ({navigation}) => ({
        title: 'Login',       
        headerStyle: {
            borderBottomWidth: 0,
            height: FontStyles.headerHeight,
        },
        headerTintColor: '#FAD15F',
        headerTitleStyle: {
            fontFamily: 'HiraginoSans-W6',
            fontSize: FontStyles.large,
        },
        headerBackTitle: null,
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
        flex: 2,
        paddingVertical: scale(15),
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
        marginHorizontal: scale(80),
    },
    forgotText: {
        fontFamily: 'HiraginoSans-W3',
        fontSize: FontStyles.small,
        color: '#4B4A4A',
    },
    keyboardContainer: {
       flex: 3.2,
    },
})