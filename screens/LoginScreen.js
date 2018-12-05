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
import ThundrTextField from '../components/ThundrTextField'
import ThundrButton from '../components/ThundrButton';
import { scale } from 'react-native-size-matters'

export default class LoginScreen extends React.Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}> 
                <StatusBar barStyle='dark-content'/>
                <View style={styles.inputContainer}>
                    <ThundrTextField text='Email'/>
                    <ThundrTextField text='Password' hidden={true}/>
                </View>
                <View style={{ flex: 0.7 }}>
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
                <View style={{ flex: 3.2 }}/>
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
    inputContainer: {
        flex: 2,
        paddingVertical: scale(15),
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
})