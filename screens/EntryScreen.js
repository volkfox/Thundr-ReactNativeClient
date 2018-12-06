/*  -- EntryPage.js --
    Entry screen into Thundr app. Allows user to sign up 
    or sign in to existing account.
*/

import React from 'react'
import { 
    Image, 
    SafeAreaView,
    StatusBar, 
    StyleSheet, 
    Text,
    TouchableOpacity, 
    View, 
} from 'react-native'
import { scale } from 'react-native-size-matters'
import ThundrButton from '../components/ThundrButton'
import ThundrSize from '../components/ThundrSize'

export default class EntryScreen extends React.Component {
     /* Header styling. */
     static navigationOptions = { header: null }
    
    /* Render function. */
    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <StatusBar barStyle='light-content'/>
                <View style={styles.logoContainer}>
                    <Image 
                        source={require('../images/logo.png')}
                        style={styles.image}
                        resizeMode='contain'
                    />
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.thundr}>Thundr</Text>
                </View>
                <ThundrButton 
                    text='Sign Up' 
                    color='white'
                    onPress={ () => this.props.navigation.push('Signup') }
                />
                <View style={styles.loginContainer}>
                    <Text style={styles.existingAccount}>Already have an account?</Text>
                    <TouchableOpacity onPress={ () => this.props.navigation.push('Login') }>
                        <Text style={styles.existingAccount}>Login</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}

/* Style sheet. */
const styles = StyleSheet.create({
    safeContainer: {
        flex: 1, 
        backgroundColor: '#FAD15F',
    },
    logoContainer: {
        flex: 2.5,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: scale(30),
    },
    nameContainer: {
        flex: 2,
        alignItems: 'center',
    },
    loginContainer: {
        flex: 1.2,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    image: {
        height: '60%',
        width: '45%',
    },
    thundr: {
        fontFamily: 'HiraginoSans-W6',
        fontSize: ThundrSize.xxxlarge,
        color: '#FFFFFF',
    },
    existingAccount: {
        fontFamily: 'HiraginoSans-W6',
        fontSize: ThundrSize.small,
        color: '#FFFFFF',
    },
})