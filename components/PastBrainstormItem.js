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
    ScrollView,
} from 'react-native'
import FontStyles from '../components/FontStyles'
import Modal from 'react-native-modal'
import { scale } from 'react-native-size-matters'

export default class PastBrainstormItem extends React.Component {
    state = {
        isModalVisible: false,
    }

    /* Change the visibility of the modal. */
    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible })

    render() {
        return (
            <View style={styles.itemContainer}>
                <Modal isVisible={this.state.isModalVisible}>
                    <View style={styles.modalContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{flex: 1}}/>
                            <View style={styles.modalTitleContainer}>
                                <Text style={styles.modalTitleText} numberOfLines={1}>{this.props.idea}</Text>
                            </View>
                            <View style={styles.exitButtonContainer}>
                                <TouchableOpacity onPress={this._toggleModal}>
                                    <Image
                                        source={require('../images/yellow_x.png')}
                                        style={styles.exitButton}
                                        resizeMode='contain'
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <ScrollView style={{ width: '80%', paddingTop: scale(15)}}>
                            <Text style={styles.modalText}>{this.props.notes}</Text>
                        </ScrollView>
                    </View>
                </Modal>
                <TouchableOpacity onPress={this._toggleModal}>
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
        marginLeft: scale(20),
        paddingVertical: scale(20),
    },
    titleLine: {
        flex: 1,
        flexDirection: 'row',
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
        paddingRight: scale(5),
        paddingTop: scale(6),
    },
    imageContainer: {
        width: '6%',
    },
    upvote: {
        width: scale(20),
        height: scale(20),
    },
    text: {
        fontFamily: 'HiraginoSans-W3',
        fontSize: FontStyles.tiny,
        color: '#7E7E7E',
    },
    notesContainer: {
        flex: 1,
        width: '75%',
        marginVertical: scale(10),
    },
    modalContainer: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50%',
        width: '90%',
        backgroundColor: '#F5FCFF',
        borderRadius: 30,
    },
    modalText: {
        fontFamily: 'HiraginoSans-W3',
        fontSize: FontStyles.body,
        color: '#7E7E7E',
    },
    modalTitleText: {
        fontFamily: 'HiraginoSans-W3',
        fontSize: FontStyles.small,
        paddingTop: scale(20),
        color: '#595959',
    },
    exitButton: {
        width: scale(20), 
        height: scale(20),
    },
    exitButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: scale(10),
        paddingRight: scale(20),
    },
    modalTitleContainer: {
        flex: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
})