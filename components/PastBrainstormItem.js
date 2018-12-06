/* */

import React from 'react'
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Image,
    ScrollView,
} from 'react-native'
import { scale } from 'react-native-size-matters'
import Modal from 'react-native-modal'
import ThundrSize from './ThundrSize'

export default class PastBrainstormItem extends React.Component {
     /* Constructor. */
     constructor(props) {
        super(props)
        this.state = {
            isModalVisible: false,
        }
    }

    /* Change the visibility of the modal. */
    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible })

    /* Render function. */    
    render() {
        return (
            <View style={styles.itemContainer}>
                <IdeaModal
                    isModalVisible={this.state.isModalVisible}
                    toggleModal={this._toggleModal}
                    idea={this.props.idea}
                    notes={this.props.notes}
                />
                <TouchableOpacity onPress={this._toggleModal} style={ {flex: 1} }>
                    <View style={styles.contentContainer}>
                        <View style={styles.titleContainer}>
                            <View style={styles.ideaTextContainer}>
                                <Text style={styles.ideaText} numberOfLines={1}>
                                    {this.props.idea}
                                </Text>
                            </View>
                            <View style={styles.upvoteContainer}>
                                <Text style={styles.text}>{this.props.upvotes}</Text>
                                <View style={styles.imageContainer}>
                                    <Image 
                                        source={require('../images/upvote_2.png')}
                                        resizeMode='contain'
                                        style={styles.upvote}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.notesContainer}>
                            <Text style={styles.text} numberOfLines={7}>
                                {this.props.notes}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

/* Displays extended information modal for past idea, accessed by clicking on the idea. */
class IdeaModal extends React.Component {
    render() {
        return (
            <Modal 
                isVisible={this.props.isModalVisible}
                onBackdropPress={this.props.toggleModal}
                animationIn='zoomIn'
                animationOut='zoomOut'
            >
                <View style={styles.modalContainer}>
                    <View style={ {flexDirection: 'row'} }>
                        <View style={{ flex: 1 }}/>
                        <View style={styles.modalTitleContainer}>
                            <Text style={styles.modalTitleText} numberOfLines={1}>{this.props.idea}</Text>
                        </View>
                        <View style={styles.exitButtonContainer}>
                            <TouchableOpacity onPress={this.props.toggleModal}>
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
        )
    }
}

/* Style sheet. */
const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        backgroundColor: '#FFF9E6',
        marginHorizontal: scale(25),
        height: scale(180),
        shadowOffset: {height: scale(3), width: 0},
        shadowRadius: 2,
        shadowOpacity: 0.2,
    },
    titleContainer: {
        flex: 1.5, 
        flexDirection: 'row'
    },
    contentContainer: {
        flex: 1,
        marginLeft: scale(30),
        marginRight: scale(10),
        marginVertical: scale(15),
    },
    ideaTextContainer: {
        flex: 8,
    },
    ideaText: {
        fontFamily: 'HiraginoSans-W3',
        fontSize: ThundrSize.small,
        
    },
    upvoteContainer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: scale(5),
    },
    notesContainer: {
        flex: 7,
        marginTop: scale(10),
        marginBottom: scale(5),
        marginRight: scale(30),
    },
    text: {
        fontFamily: 'HiraginoSans-W3',
        fontSize: ThundrSize.tiny,
        color: '#7E7E7E',
    },
    upvote: {
        width: scale(20),
        height: scale(20),
    },
    imageContainer: {
        paddingBottom: scale(12), 
        paddingLeft: scale(6),
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
        fontSize: ThundrSize.body,
        color: '#7E7E7E',
    },
    modalTitleText: {
        fontFamily: 'HiraginoSans-W3',
        fontSize: ThundrSize.small,
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