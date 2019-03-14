/**
 * -- ThundrTextField.js -- 
 * TextInput field customized for Thundr.
 */

import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native'
import { scale } from 'react-native-size-matters';
import ThundrSize from './ThundrSize';

export default class ThundrTextField extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <TextInput 
                    style={styles.field}
                    onChangeText={this.props.onChange ? (text) => this.props.onChange(text) : null}
                    placeholder={this.props.text}
                    placeholderTextColor='#959595'
                    autoCorrect={false}
                    autoCapitalize='characters'
                    clearButtonMode={'while-editing'}
                    keyboardAppearance='dark'
                    value={this.props.value}
                    maxLength={6}
                />
            </View>
        );
    }
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: scale(40), 
    },
    field: {
        fontFamily: 'HiraginoSans-W3',
        fontSize: ThundrSize.small,
        width: '100%',
        height: ThundrSize.largeButtonHeight,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: scale(10),
        textAlign: 'center',
        borderRadius: 30,
    },
});