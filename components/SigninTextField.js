/*  -- SigninTextField.js -- 
    Component that contains a textInput field and a title.
*/

import React, { Component } from 'react'
import { TextInput, Text, StyleSheet, View } from 'react-native'
import FontStyles from './FontStyles'

export default class SigninTextField extends Component {
    render() {
        return (
            <View style={styles.field}>
                <Text style={styles.text}>{this.props.text}</Text>
                <TextInput 
                    style={styles.input}
                    autoCorrect={false}
                    secureTextEntry={this.props.hidden}
                    returnKeyType='next'
                    keyboardType='email-address'
                />
            </View>
        )
    }
}

const styles=StyleSheet.create({
    field: {
        height: '25%',
    },
    text: {
        fontFamily: 'HiraginoSans-W3',
        color: '#4B4A4A',
        marginLeft: 30,
        fontSize: FontStyles.small,
    },
    input: {
        borderColor: '#CCCCCC',
        borderWidth: 0.5,
        marginHorizontal: 20,
        borderRadius: 100,
        height: FontStyles.title,
        paddingLeft: 15,
    }
})