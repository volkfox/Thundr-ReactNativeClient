/*  -- ForgotPasswordScreen.js --
    Allows existing users to recover their password.
*/

/*
    TODOS:
    - create confirmation modal to tell user to check email for link
 */

import React from 'react'
import {  
    Image, 
    SafeAreaView, 
    TouchableOpacity,
    View, 
} from 'react-native'
import { scale } from 'react-native-size-matters'
import ThundrButton from '../components/ThundrButton'
import ThundrSize from '../components/ThundrSize'
import ThundrTextField from '../components/ThundrTextField'

export default class ForgotPasswordScreen extends React.Component {
    /* Header styling. */
    static navigationOptions = ({navigation}) => ({
        title: 'Reset Password',
        headerStyle: {
            borderBottomWidth: 0,
            height: ThundrSize.headerHeight,
        },
        headerTintColor: '#FAD15F',
        headerTitleStyle: {
            fontFamily: 'HiraginoSans-W6',
            fontSize: ThundrSize.medium,
        }, 
        headerLeft: (
            <TouchableOpacity 
                style={ {paddingLeft: scale(12), paddingBottom: scale(9)} } 
                onPress={ () => {navigation.pop()} }
            >
                <Image
                    source={require('../images/back_chevron.png')}
                    resizeMode='contain'
                    style={ {width: scale(20), height: scale(20)} }
                />
            </TouchableOpacity>
        )
    })
    
    /* Render function. */
    render() {
        return (
            <SafeAreaView style={ {flex: 1 } }>
                <View style={ {flex: 2, paddingBottom: scale(50)} }>
                    <ThundrTextField text='Email' autoFocus={true}/>
                </View>
                <ThundrButton
                    text='Submit'
                    color='yellow'
                    onPress={ () => this.props.navigation.pop() }
                />
                <View style={ {flex: 3} }/>
            </SafeAreaView>
        )
    }
}