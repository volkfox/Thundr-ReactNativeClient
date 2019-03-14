/**
 * -- SubmittedIdea.js --
 *  RenderItem used by FlatList to display an idea that's been submitted
 *  in the current brainstorm. 
 */

import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import ThundrSize from '../components/ThundrSize';

const IDEA_COLORS = [
    '#E2E2FA', // thundr
    '#C9F7D8', // green
    '#FCD5D5', // red
    '#C6E7F7', // blue
    '#FCD5FF', // violet 
];

const LIGHT_VOTES = [
    require('../images/light_purple.png'),
    require('../images/light_green.png'),
    require('../images/light_red.png'),
    require('../images/light_blue.png'),
    require('../images/light_violet.png'),
];

const DARK_VOTES = [
    require('../images/dark_purple.png'),
    require('../images/dark_green.png'),
    require('../images/dark_red.png'),
    require('../images/dark_blue.png'),
    require('../images/dark_violet.png'),
];

export default class SubmittedIdea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            upvoted: false,
            vote_image: LIGHT_VOTES[this.props.index],
            light: true,
        };
    };

    _vote = () => {
        this.props.onPress(this.props.item['key'], !this.state.upvoted);
        this.setState({
            upvoted: !this.state.upvoted,
            vote_image: this.state.light ? DARK_VOTES[this.props.index] : LIGHT_VOTES[this.props.index], 
            light: !this.state.light,
        });
    }

    render() {
        return (
            <View style={[styles.itemContainer, { backgroundColor: IDEA_COLORS[this.props.index] }]}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{this.props.item['text']}</Text>
                </View>
                <View style={styles.voteContainer}>
                    <TouchableOpacity onPress={this._vote}>
                        <Image 
                            source={this.state.vote_image}
                            style={styles.voteButton}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

/* Styles */
const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: scale(35),
        marginVertical: scale(20),
        paddingHorizontal: scale(10),
        height: scale(150),
        shadowOffset: {height: scale(3), width: 0},
        shadowRadius: 2,
        shadowOpacity: 0.2,
        borderRadius: 4,
    },
    textContainer: {
        flex: 4,
        paddingTop: scale(20),
    },
    text: {
        fontFamily: 'HiraginoSans-W3',
        fontSize: ThundrSize.small,  
        color: '#6F6F6F',
    },
    voteContainer: {
        flex: 1, 
        justifyContent: 'flex-start',
    },
    voteButton: {
        width: '45%', 
        height: '45%',
        alignSelf: 'flex-end',
        marginTop: scale(8),
        marginRight: scale(5),
    },
});