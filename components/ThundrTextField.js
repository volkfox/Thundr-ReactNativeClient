/*  -- ThundrTextField.js -- 
    Component that contains a textInput field and a title.
*/

import React, { Component } from 'react'
import { 
    TextInput, 
    StyleSheet, 
    View 
} from 'react-native'
import { scale } from 'react-native-size-matters'
import FontStyles from './FontStyles'

export default class ThundrTextField extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TextInput 
                    // style={!this.props.large ? styles.large : styles.field}
                    style={styles.field}
                    placeholder={this.props.text}
                    autoCorrect={this.props.autoCorrect || false}
                    secureTextEntry={this.props.hidden || false}
                    keyboardType={this.props.text == 'Email' ? 'email-address' : 'default'}
                    clearButtonMode='while-editing'
                    value={this.props.value || this.text}
                    onChangeText={this.props.onChangeText || null }
                    multiline={this.props.multiline || false}
                    numberOfLines={this.props.numberOfLines || 1 }
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
        fontSize: FontStyles.smedium,
        width: '75%',
        borderBottomColor: '#FAD15F',
        borderBottomWidth: scale(1.5),
    },
    // large: {
    //     fontFamily: 'HiraginoSans-W3',
    //     fontSize: FontStyles.smedium,
    //     width: '75%',
    //     borderBottomColor: '#FAD15F',
    //     borderBottomWidth: scale(1.5),
    // }
})