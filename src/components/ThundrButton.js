/**
 * -- ThundrButton.js --
 * Standard button, styled for Thundr App.
 * @format
 * @flow
 */

import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { withNavigation } from 'react-navigation';
import ThundrSize from './ThundrSize';

class ThundrButton extends React.Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity 
                    style={[{ 
                        backgroundColor: this.props.color == 'dark' ? '#454899' : '#A6A8E8',
                        marginHorizontal: scale(40),
                        height: this.props.size == 'large' ? ThundrSize.largeButtonHeight : ThundrSize.buttonHeight,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 30,
                    }, this.props.style ]}
                    onPress={this.props.onPress}
                >
                    <Text style={{ 
                        fontFamily: 'HiraginoSans-W6',
                        fontSize: this.props.size == 'large' ? ThundrSize.medium : ThundrSize.small, 
                        paddingVertical: this.props.size == 'large' ? (ThundrSize.largeButtonHeight - ThundrSize.medium) / 2 : (ThundrSize.buttonHeight - ThundrSize.small) / 2,
                        color: '#FFFFFF',
                    }}>
                        {this.props.text}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default withNavigation(ThundrButton);