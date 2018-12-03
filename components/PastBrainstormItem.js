/*  -- PastBrainstormItem.js --
    Item rendered by PastBrainstormScreen Flatlist to display an idea.
*/

import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
} from 'react-native'
import FontStyles from '../components/FontStyles'

export default class PastBrainstormItem extends React.Component {
    render() {
        return (
            <View style={styles.itemContainer}>
                <TouchableOpacity>
                    <View style={styles.titleLine}>
                        <View style={styles.ideaContainer}>
                            <Text style={styles.ideaText} numberOfLines={1}>{this.props.idea}</Text>
                        </View>
                        <View style={styles.upvoteContainer}>
                            <Text style={styles.text}>{this.props.upvotes}</Text>
                        </View>
                        <View style={styles.imageContainer}>
                            <Image 
                                style={styles.upvote} 
                                source={require('../images/upvote.png')}
                                resizeMode='contain'
                            />
                        </View>
                    </View>
                    <View style={styles.notesContainer}>
                        <Text style={styles.text} numberOfLines={2}>{this.props.notes}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        marginLeft: Dimensions.get('window').width / 10,
        marginRight: Dimensions.get('window').width / 20,
        paddingVertical: 20,
    },
    titleLine: {
        flex: 1,
        flexDirection: 'row',
    },
    notesContainer: {
        flex: 1,
    },
    ideaContainer: {
        width: '75%',
    },
    ideaText: {
        fontFamily: 'HiraginoSans-W3',
        fontSize: FontStyles.small,
    },
    upvoteContainer: {
        width: '14%',
        alignItems: 'flex-end',
        paddingRight: 5,
        paddingTop: 6,
    },
    imageContainer: {
        width: '6%',
    },
    upvote: {
        width: 20,
        height: 20,
    },
    text: {
        fontFamily: 'HiraginoSans-W3',
        fontSize: FontStyles.small - 3,
        color: '#7E7E7E',
    },
    notesContainer: {
        flex: 1,
        width: '75%',
        marginVertical: 10,
    }
})