/*  -- ThundrButton.js --
    Standard button, styled for Thundr App.
*/

import React from 'react'
import {
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { scale } from 'react-native-size-matters';
import { withNavigation } from 'react-navigation'
import ThundrSize from './ThundrSize';

class ThundrButton extends React.Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity 
                    style={{ 
                        backgroundColor: this.props.color == 'yellow' ? '#FAD15F' : '#FFFFFF',
                        marginHorizontal: scale(30),
                        borderRadius: 100,
                        height: ThundrSize.buttonHeight,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={this.props.onPress}
                >
                    <Text style={{ 
                        fontFamily: this.props.color == 'yellow' ? 'HiraginoSans-W6' : 'HiraginoSans-W3', 
                        fontSize: ThundrSize.medium, 
                        paddingVertical: (ThundrSize.buttonHeight - ThundrSize.medium) / 2,
                        color: this.props.color == 'yellow' ? '#FFFFFF' : '#000000' 
                    }}>
                        {this.props.text}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default withNavigation(ThundrButton)