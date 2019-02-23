/**
 * -- SubmittedIdea.js --
 *  RenderItem used by FlatList to display an idea that's been submitted
 *  in the current brainstorm. 
 * @format
 * @flow
 */

import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import ThundrSize from '../components/ThundrSize';

export default class SubmittedIdea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            upvoted: false,
            vote_image: require('../images/light_vote.png'),
            light: true,
        };
    };

    _vote = () => {
        this.props.onPress(this.props.item['key'], !this.state.upvoted);
        this.setState({
            upvoted: !this.state.upvoted,
            vote_image: this.state.light ? require('../images/dark_vote.png') : require('../images/light_vote.png'),
            light: !this.state.light,
        });
    }

    render() {
        return (
            <View style={styles.itemContainer}>
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
        backgroundColor: '#E2E2FA',
        marginHorizontal: scale(35),
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