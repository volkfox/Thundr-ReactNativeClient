/*  -- ThundrTextField.js -- 
    Component that contains a textInput field and a title.
*/

import React, { Component } from 'react'
import { 
    TextInput, 
    StyleSheet, 
    View 
} from 'react-native'
import FontStyles from './FontStyles'
import { scale } from 'react-native-size-matters'

export default class ThundrTextField extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TextInput 
                    // style={this.props.mediumText ? styles.mediumField : styles.defaultField}
                    style={styles.field}
                    placeholder={this.props.text}
                    autoCorrect={this.props.autoCorrect || false}
                    secureTextEntry={this.props.hidden || false}
                    keyboardType={this.props.text == 'Email' ? 'email-address' : 'default'}
                    clearButtonMode='while-editing'
                    value={this.props.value || this.text}
                    onChangeText={this.props.onChangeText || null }
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
    field: {
        fontFamily: 'HiraginoSans-W3',
        fontSize: FontStyles.small,
        width: '75%',
        borderBottomColor: '#FAD15F',
        borderBottomWidth: scale(1.5),
    },
    mediumField: {
        fontFamily: 'HiraginoSans-W3',
        fontSize: FontStyles.medium,
        width: '75%',
        borderBottomColor: '#FAD15F',
        borderBottomWidth: scale(1.5),
    }
})