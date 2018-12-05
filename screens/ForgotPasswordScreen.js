/*  -- ForgotPasswordScreen.js --
    Allows existing users to recover their password.
*/

/*
    TODOS:
    - create confirmation modal to tell user to check email for link
 */

import React from 'react'
import {  
    View, 
    SafeAreaView, 
    Image, 
    TouchableOpacity 
} from 'react-native'
import FontStyles from '../components/FontStyles'
import ThundrButton from '../components/ThundrButton'
import ThundrTextField from '../components/ThundrTextField'
import { scale } from 'react-native-size-matters'

export default class ForgotPasswordScreen extends React.Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 2, paddingBottom: scale(50) }}>
                    <ThundrTextField text='Email'/>
                </View>
                <ThundrButton
                    text='Submit'
                    color='yellow'
                    onPress={ () => this.props.navigation.pop() }
                />
                <View style={{ flex: 3 }}/>
            </SafeAreaView>
        )
    }

    /* Header styling. */
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