/*  -- AuthLoadingScreen.js
    Loads authentication state from AsyncStorage.
    Loads current user's profile, otherwise directs user to signup/login.
*/

import React from 'react'
import {
    AsyncStorage,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native'

export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props)
        this._bootStrapAsync()
    }
    
    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <StatusBar barStyle='light-content'/>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.idea}
                        source={require('../images/logo.png')}
                        resizeMode='contain'
                    />
                </View>
            </SafeAreaView>
        )
    }

    _bootStrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken')
        this.props.navigation.navigate(!userToken ? 'App' : 'Auth')
    }
}

/* Style sheet. */
const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: '#FAD15F',
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center',
    },
    logo: {
        marginTop: 100,
        height: '55%',
        width: '55%',
    },
})
