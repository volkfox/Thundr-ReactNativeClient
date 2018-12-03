/*  -- EntryPage.js --
    Entry screen into Thundr app. Allows user to sign up 
    or sign in to existing account.
*/

import React from 'react'
import { 
    Text, 
    View, 
    StyleSheet, 
    Image, 
    StatusBar, 
    TouchableOpacity, 
    SafeAreaView 
} from 'react-native'
import FontStyles from '../components/FontStyles'

export default class EntryScreen extends React.Component {
    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <View style={styles.container}>
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
                    <View style={styles.signupContainer}>
                        <TouchableOpacity 
                            style={styles.signupButton}
                            onPress={ () => this.props.navigation.push('Signup')}
                        >
                            <Text style={styles.signupText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.signinContainer}>
                        <Text style={styles.existingAccount}>Already have an account?</Text>
                        <TouchableOpacity onPress={ () => this.props.navigation.push('Login')}>
                            <Text style={styles.signinText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        )
    }

    /* Header styling. */
    static navigationOptions = {
        header: null,
        headerTruncatedBackTitle: null,
    }
}

/* Style sheet. */
const styles = StyleSheet.create({
    safeContainer: {
        flex: 1, 
        backgroundColor: '#FAD15F',
    },
    container: {
        flex: 1,
    }, 
    logoContainer: {
        flex: 3.5,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 30,
    },
    nameContainer: {
        flex: 2,
        alignItems: 'center',
    },
    signupContainer: {
        flex: 0.8,
    },
    signinContainer: {
        flex: 1.2,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    image: {
        height: '45%',
        width: '45%',
    },
    thundr: {
        fontFamily: 'HiraginoSans-W6',
        fontSize: FontStyles.huge,
        color: '#FFFFFF',
    },
    signupButton: {
        marginHorizontal: 30,
        backgroundColor: '#FFFFFF',
        borderRadius: 100,
        height: FontStyles.huge,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signupText: {
        fontFamily: 'HiraginoSans-W3',
        fontSize: FontStyles.body,
        color: '#000000',
        paddingVertical: (FontStyles.huge - FontStyles.body) / 2,
    },
    signinText: {
        fontFamily: 'HiraginoSans-W6',
        fontSize: FontStyles.small,
        color: '#FFFFFF',
    },
    existingAccount: {
        fontFamily: 'HiraginoSans-W6',
        fontSize: FontStyles.body - 5,
        color: '#FFFFFF',
    },
})