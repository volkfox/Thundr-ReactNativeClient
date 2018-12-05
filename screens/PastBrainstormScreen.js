/*  -- PastBrainstormScreen.js --
    Displays a past brainstorm's generated ideas.
    Allows user to scroll through ideas and read notes, see upvotes, add new ideas.
*/

import React from 'react'
import {
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar, 
    StyleSheet, 
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import { scale } from 'react-native-size-matters'
import ActionButton from 'react-native-action-button'
import Modal from 'react-native-modal'
import PastBrainstormItem from '../components/PastBrainstormItem'
import pastData from '../data/PastData'
import ThundrSize from '../components/ThundrSize'

export default class PastBrainstormScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalVisible: false,
            isInfoVisible: false,
            newIdea: '',
            newNotes: '',
        }
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <StatusBar barStyle='light-content'/>
                <FlatList
                    data={pastData}
                    renderItem={this._renderItem}
                    ItemSeparatorComponent={this._renderSeparator}
                />
                <Modal /* Info button modal */
                    isVisible={this.state.isInfoVisible}
                    onBackdropPress={this._toggleInfo}    
                >
                    <View style={styles.infoModal}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}/>
                            <View style={styles.modalTitleContainer}>
                                <Text style={styles.modalTitleText}>Details</Text>
                            </View>
                            <View style={styles.exitButtonContainer}>
                                <TouchableOpacity onPress={this._toggleInfo}>
                                    <Image
                                        source={require('../images/yellow_x.png')}
                                        style={styles.exitButton}
                                        resizeMode='contain'
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <ScrollView style={{ width: '80%', paddingTop: scale(15)}}>
                            <Text>
                                <Text style={styles.detailsTitleText}>{'Title: '}</Text>
                                <Text style={styles.detailsText}>{this.props.navigation.getParam('title', '')}</Text>
                            </Text>
                            <View style={{ height: scale(10) }}/>
                            <Text>
                                <Text style={styles.detailsTitleText}>{'Description: '}</Text>
                                <Text style={styles.detailsText}>{this.props.navigation.getParam('description', '')}</Text>
                            </Text>
                            <View style={{ height: scale(10) }}/>
                            <Text>
                                <Text style={styles.detailsTitleText}>{'Collaborators: '}</Text>
                                <Text style={styles.detailsText}>{this._getCollaborators(this.props.navigation.getParam('collaborators', []))}</Text>
                            </Text>
                        </ScrollView>
                    </View>
                </Modal>
                <Modal /* Add new idea modal */
                    isVisible={this.state.isModalVisible}
                    onBackdropPress={this._toggleModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <View style={{ flex: 1 }}/>
                            <View style={styles.modalTitleContainer}>
                                <Text style={styles.modalTitleText}>Add New Idea</Text>
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
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.textInput}
                                placeholder='Idea'
                                clearButtonMode='while-editing'
                                onChangeText={ (text) => this.setState({newIdea: text}) }
                                value={this.state.newIdea}
                                selectionColor='#656565'
                                autoFocus={true}
                            />
                            <View style={{ flex: 0.2} }/>
                            <TextInput
                                style={styles.textInput}
                                placeholder='Notes'
                                clearButtonMode='while-editing'
                                multiline={true}
                                numberOfLines={4}
                                onChangeText={ (text) => this.setState({newNotes: text}) }
                                value={this.state.newNotes}
                                selectionColor='#656565'
                            />
                        </View>
                        <View style={styles.newIdeaButtonContainer}>
                            <TouchableOpacity
                                style={styles.newIdeaButton}
                                onPress={this._addNewIdea}
                            >
                                <Text style={styles.addIdeaText}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <ActionButton
                        buttonColor='#FAD15F' 
                        onPress={this._toggleModal}
                />
            </SafeAreaView>
        )
    }

    /* Adds an idea to existing FlatList. */
    _addNewIdea = () => {
        if (this.state.newIdea.length == 0) {
            alert('Please enter an idea.')
            return
        }
        const newIdea = {
            idea: this.state.newIdea,
            notes: this.state.newNotes,
            upvotes: 0,
        }
        pastData.push(newIdea)
        this.setState({ newIdea: '', newNotes: '' })
        this._toggleModal()
    }

    /* renderItem function for FlatList. */
    _renderItem = ({item}) => (
        <PastBrainstormItem
            idea={item.idea}
            notes={item.notes}
            upvotes={item.upvotes}
        />
    )

    /* renderSeparator function for Flatlist. */
    _renderSeparator = () => (
        <View 
            style = {{
                height: scale(0.5),
                backgroundColor: '#cccccc',
            }}
        />
    )

    /* Change the visibility of the modal. */
     _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible })
     _toggleInfo = () => this.setState({ isInfoVisible: !this.state.isInfoVisible })

    componentDidMount() {
        this.props.navigation.setParams({
            toggleInfo: this._toggleInfo
        });
    }

    /* Returns a list of collaborators for display on info modal. */
    _getCollaborators(listCollaborators) {
        let stringCollaborators = ''
        if (listCollaborators.length == 0) {
            stringCollaborators = 'none'
        }
        else if (listCollaborators.length == 1) {
            stringCollaborators = listCollaborators[0] 
        } else if (listCollaborators.length == 2) {
            stringCollaborators = listCollaborators[0] + ' and ' + listCollaborators[1]
        }
        else {
            for (let i = 0; i < listCollaborators.length - 1; i++) {
                stringCollaborators += listCollaborators[i] + ', '
            }
            stringCollaborators += 'and ' + listCollaborators[listCollaborators.length - 1]
        }
        return stringCollaborators
    }

    /* Header styling. */
    static navigationOptions = ({navigation}) => ({
        title: navigation.getParam('title', null), 
        headerStyle: {
            borderBottomWidth: 0,
            height: ThundrSize.headerHeight,
            backgroundColor: '#FAD15F',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
            fontFamily: 'HiraginoSans-W6',
            fontSize: ThundrSize.small,
        },
        headerLeft: null,
        headerRight: (
            <TouchableOpacity style={ {paddingRight: scale(25), paddingBottom: scale(5)} }
                onPress={navigation.getParam('toggleInfo')}
            >
                <Image
                    source={require('../images/info_button.png')}
                    resizeMode='contain'
                    style={ {width: scale(20), height: scale(20)}}
                />
            </TouchableOpacity>
        ),
    }) 
}

/* Style sheet. */
const styles = StyleSheet.create({
    modalContainer: {
        alignSelf: 'center',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '60%',
        width: '90%',
        backgroundColor: '#F5FCFF',
        borderRadius: 30,
        marginBottom: scale(220),
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
    inputContainer: {
        flex: 4, 
        width: '100%', 
        alignItems: 'center',
    },
    textInput: {
        fontFamily: 'HiraginoSans-W3',
        fontSize: ThundrSize.small,
        borderBottomWidth: scale(1.5),
        borderBottomColor: '#FAD15F',
        width: '75%',
        paddingTop: scale(20),
    },
    newIdeaButtonContainer: {
        flex: 2, 
        width: '100%',
        justifyContent: 'flex-end',
        paddingBottom: scale(50),
    },
    newIdeaButton: {
        backgroundColor: '#FAD15F',
        alignItems: 'center',
        height: ThundrSize.buttonHeight * 0.8,
        marginHorizontal: scale(30),
        borderRadius: 100,
    },
    addIdeaText: {
        fontFamily: 'HiraginoSans-W6',
        color: '#FFFFFF',
        fontSize: ThundrSize.small,
        paddingVertical: (0.8 * ThundrSize.buttonHeight - ThundrSize.small) / 2,
    },
    infoModal: {
        alignSelf: 'center',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '50%',
        width: '90%',
        backgroundColor: '#F5FCFF',
        borderRadius: 30,
    },
    detailsContainer: {
        flex: 4,
    },
    detailsText: {
        fontFamily: 'HiraginoSans-W3',
        fontSize: ThundrSize.small,
        color: '#7E7E7E',
    },
    detailsTitleText: {
        fontFamily: 'HiraginoSans-W6',
        fontSize: ThundrSize.small,
        color: '#7E7E7E',
    },
})