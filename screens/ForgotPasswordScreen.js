/*  -- ForgotPasswordScreen.js --
    Allows existing users to recover their password.
*/

/*
    TODOS:
    - create confirmation modal to tell user to check email for link
 */

import React from 'react'
import { 
    Text, 
    View, 
    SafeAreaView, 
    StyleSheet, 
    Dimensions,
    Image, 
    TouchableOpacity 
} from 'react-native'
import FontStyles from '../components/FontStyles'
import SigninTextFields from '../components/SigninTextField'
import { scale } from 'react-native-size-matters'

export default class ForgotPasswordScreen extends React.Component {
    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <View style={styles.fieldContainer}>
                    <SigninTextFields
                        text='Email'
                        hidden={false}
                    />
                </View>
                <View style={styles.submitContainer}>
                    <TouchableOpacity 
                        style={styles.submitButton}
                        onPress={ () => this.props.navigation.pop()}
                    >
                        <Text style={styles.submitText}>Submit</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.keyboardContainer}/>
            </SafeAreaView>
        )
    }

    static navigationOptions = ({navigation}) => ({
        title: 'Reset Password',
        headerStyle: {
            borderBottomWidth: 0,
            height: FontStyles.headerHeight,
        },
        headerTintColor: '#FAD15F',
        headerTitleStyle: {
            fontFamily: 'HiraginoSans-W6',
            fontSize: FontStyles.medium,
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
const styles=StyleSheet.create({
    safeContainer: {
        flex: 1,
    },
    fieldContainer: {
        flex: 3,
        justifyContent: 'flex-start',
    },
    submitContainer: {
        flex: 2,
        justifyContent: 'center',
    },
    submitButton: {
        backgroundColor: '#FAD15F',
        alignItems: 'center',
        marginHorizontal: scale(30),
        borderRadius: 100,
        height: FontStyles.buttonHeight,
    },
    submitText: {
        fontFamily: 'HiraginoSans-W6',
        fontSize: FontStyles.medium,
        color: '#FFFFFF',
        marginVertical: (FontStyles.buttonHeight - FontStyles.medium) / 2,
    },
    keyboardContainer: {
        flex: 3, 
    },
})
