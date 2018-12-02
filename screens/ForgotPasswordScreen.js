/*  -- ForgotPasswordScreen.js --
    Allows existing users to recover their password.
*/

/*
    TODOS:
    - adjust height of back button
    - create confirmation modal to tell user to check email for link
 */

import React from 'react'
import { 
    Text, 
    View, 
    SafeAreaView, 
    StyleSheet, 
    Dimensions, 
    TouchableOpacity 
} from 'react-native'
import FontStyles from '../components/FontStyles'
import SigninTextFields from '../components/SigninTextField'

export default class ForgotPasswordScreen extends React.Component {
    static navigationOptions = {
        title: 'Reset Password',
        headerStyle: {
            borderBottomWidth: 0,
            height: Dimensions.get('window').height / 8,
        },
        headerTintColor: '#FAD15F',
        headerTitleStyle: {
            fontFamily: 'HiraginoSans-W6',
            fontSize: FontStyles.body + 3,
        }, 
    }
    
    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <View style={styles.container}>
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
                </View>
            </SafeAreaView>
        )
    }
}

const styles=StyleSheet.create({
    safeContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    fieldContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    submitContainer: {
        flex: 3,
    },
    submitButton: {
        backgroundColor: '#FAD15F',
        alignItems: 'center',
        marginHorizontal: 20,
        borderRadius: 100,
        height: FontStyles.title,
    },
    submitText: {
        fontFamily: 'HiraginoSans-W6',
        fontSize: FontStyles.body,
        color: '#FFFFFF',
        marginVertical: (FontStyles.title - FontStyles.body) / 2,
    },
    keyboardContainer: {
        flex: 2, 
    },
})
