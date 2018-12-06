/*  -- HomeScreenItem.js --
    FlatList element for the home screen. 
    Renders the title, date, description, ideas generated, and collaborators 
    for a past brainstorm.
 */

import React from 'react'
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { scale } from 'react-native-size-matters'
import { withNavigation } from 'react-navigation'
import Modal from 'react-native-modal'
import ThundrSize from './ThundrSize'

class HomeScreenItem extends React.Component {
    /* Constructor. */
    constructor(props) {
        super(props)
        this.state = {
            isModalVisible: false,
        }
    }

    /* Toggles menu button modal. */
    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible })

    /* Triggered when pressing on a HomeScreenItem. */
    _navigateToPastBrainstorm =  () => this.props.navigation.push('PastBrainstorm', {title: this.props.title, 
                                       collaborators: this.props.collaborators, ideas: this.props.ideas, 
                                       date: this.props.date, description: this.props.description})

    /* Render function. */
    render() {
        /* Build string of collaborators. */
        let collaborators = () => {
            const length = this.props.collaborators.length
            if (length > 2) {
                return 'with ' + this.props.collaborators[0] + ' and ' + (length - 1) + ' others'
            } else if (length == 1) {
                return 'with ' + this.props.collaborators[0]
            } else if (length == 2) {
                return 'with ' + this.props.collaborators[0] + ' and ' + this.props.collaborators[1]
            } else {
                return 'with no others'
            }
        }        

        return (
            <View style={ {flex: 1} }>
                <MenuModal
                    isModalVisible={this.state.isModalVisible}
                    toggleModal={this._toggleModal}
                />
                <View style={styles.itemContainer}>
                    <TouchableOpacity onPress={this._navigateToPastBrainstorm}>
                        <View style= {styles.titleLine}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.titleText} numberOfLines={1}>{this.props.title}</Text>
                            </View>
                            <View style={styles.dateContainer}>
                                <Text style={styles.dateText}>{this.props.date}</Text>
                            </View>
                            <View style={styles.menuContainer}>
                                <TouchableOpacity onPress={this._toggleModal}>
                                    <Image
                                        source={require('../images/menu_button.png')}
                                        resizeMode='contain'
                                        style={styles.menuButton}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.descriptionContainer}>
                            <Text style={styles.descriptionText} numberOfLines={3}>{this.props.description}</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Image
                                style={styles.bolt}
                                source={require('../images/gray_bolt.png')}
                                resizeMode='contain'
                            />
                            <View style={styles.ideasContainer}>
                                <Text style={styles.infoText} numberOfLines={1}>{this.props.ideas}</Text>
                            </View>
                            <Image 
                                style={styles.collaborator}
                                source={require('../images/collaborator.png')}
                                resizeMode='contain'
                            />
                            <View style={styles.collaboratorsContainer}>
                                <Text 
                                    style={styles.infoText} 
                                    numberOfLines={1}
                                    ellipsizeMode='middle'
                                >{collaborators()}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

/* Displays menu modal, accessed by clicking on the triple dot icon. */
class MenuModal extends React.Component {
    render() {
        return (
            <Modal 
                isVisible={this.props.isModalVisible}
                style={ {justifyContent: 'flex-end'} }
                onBackdropPress={this.props.toggleModal}
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity
                        onPress={this.props.toggleModal}
                        style={ {flex: 1} }
                    >
                        <Text style={styles.modalText}>Share</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.props.toggleModal}
                        style={ {flex: 1} }
                    >
                        <Text style={styles.modalText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    }
}

/* Style sheet. */
const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        marginLeft: scale(20),
        marginRight: scale(20),
        paddingVertical: scale(20),
    },
    titleLine: {
        flex: 1,
        flexDirection: 'row',
    },
    titleContainer: {
        flex: 7,
        justifyContent: 'center',
    },
    titleText: {
        fontFamily: 'HiraginoSans-W3',
        fontSize: ThundrSize.small,
    },
    dateContainer: {
        flex: 2,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    dateText: {
        fontFamily: 'HiraginoSans-W3',
        fontSize: ThundrSize.xtiny,
        color: '#7E7E7E',
    },
    menuContainer: {
        flex: 1,
        alignItems: 'flex-end',
        paddingTop: scale(2),
    },
    descriptionContainer: {
        width: '75%',
        marginVertical: scale(10),
    },
    descriptionText: {
        fontFamily: 'HiraginoSans-W3',
        fontSize: ThundrSize.tiny,
        color: '#7E7E7E',
    },
    infoContainer: {
        flexDirection: 'row',
    },
    bolt: {
        width: scale(20),
        height: scale(20),
    },
    ideasContainer: {
        justifyContent: 'flex-end',
        width: '15%',
    },
    infoText: {
        fontFamily: 'HiraginoSans-W3',
        fontSize: ThundrSize.tiny,
        color: '#7E7E7E', 
    },
    collaboratorsContainer: {
        justifyContent: 'flex-end',
        width: '50%',
        paddingLeft: scale(7),
    },
    collaborator: {
        width: scale(15),
        height: scale(15),
    },
    modalContainer: {
        alignSelf: 'center',
        height: '20%',
        width: '110%',
        backgroundColor: '#F5FCFF',
    },
    modalText: {
        fontFamily: 'HiraginoSans-W3',
        fontSize: ThundrSize.small,
        paddingLeft: scale(20),
        paddingTop: scale(20),
    },
    menuButton: {
        height: scale(15),
        width: scale(15),
    },
})

export default withNavigation(HomeScreenItem)