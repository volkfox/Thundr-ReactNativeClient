/*  -- SigninTextField.js -- 
    Component that contains a textInput field and a title.
*/

import React, { Component } from 'react'
import { TextInput, Text, StyleSheet, View } from 'react-native'
import FontStyles from './FontStyles'
import { scale } from 'react-native-size-matters'

export default class SigninTextField extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TextInput 
                    style={styles.inputField}
                    autoCorrect={false}
                    secureTextEntry={this.props.hidden}
                    returnKeyType='next'
                    keyboardType='email-address'
                    placeholder={this.props.text}
                    clearButtonMode='while-editing'
                />
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputField: {
        fontFamily: 'HiraginoSans-W3',
        fontSize: FontStyles.small,
        width: '75%',
        borderBottomColor: '#FAD15F',
        borderBottomWidth: scale(1.5),
    },
})