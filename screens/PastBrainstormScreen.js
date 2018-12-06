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
import pastData from '../data/PastData'
import ThundrSize from '../components/ThundrSize'
import PastBrainstormItem from '../components/PastBrainstormItem'

export default class PastBrainstormScreen extends React.Component {
    /* Constructor. */
    constructor(props) {
        super(props)
        this.state = {
            isAddModalVisible: false,
            isSearchModalVisible: false,
        }
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
            fontSize: ThundrSize.smedium,
            paddingTop: scale(7),
        },
        headerRight: (
            <TouchableOpacity style={ {paddingRight: scale(25), paddingTop: scale(2)} }
                onPress={navigation.getParam('toggleSearchModal')}
            >
                <Image
                    source={require('../images/search.png')}
                    resizeMode='contain'
                    style={ {width: scale(17), height: scale(17)} }
                />
            </TouchableOpacity>
        ),
    }) 

    /* Passes reference to _toggleSearchModal to navigation. */
    componentDidMount() {
        this.props.navigation.setParams({
            //toggleSearchModal: this._showSearchModal
            toggleSearchModal: this._toggleSearchModal
        });
    }

    /* renderItem function for FlatList. */
    _renderItem = ({item}) => (
        <PastBrainstormItem
            idea={item.idea}
            notes={item.notes}
            upvotes={item.upvotes}
        />
    )

    /* renderSeparator function for FlatList. */
    _renderSeparator = () => (
        <View style = {{
            height: scale(30),
        }}/>
    )

    /* Change the visibility of add idea modal. */
    _toggleAddModal = () => this.setState({ isAddModalVisible: !this.state.isAddModalVisible })
    
    /* Change the visibility of the search modal. */
    _toggleSearchModal = () => {
        if (this.state.isSearchModalVisible) {
            StatusBar.setBarStyle('light-content')
        } else {
            StatusBar.setBarStyle('dark-content')
        }
        this.setState({ isSearchModalVisible: !this.state.isSearchModalVisible })
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

    /* Render function. */
    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <StatusBar barStyle='light-content'/>
                <View style={ {height: scale(30)} }/>
                <FlatList
                    data={pastData}
                    renderItem={this._renderItem}
                    ItemSeparatorComponent={this._renderSeparator}
                />
                {/* <InfoModal
                    isModalVisible={this.state.isSearchModalVisible}
                    toggleModal={this._toggleSearchModal}
                    title={this.props.navigation.getParam('title', '')}
                    details={this.props.navigation.getParam('description', '')}
                    collaborators={this._getCollaborators(this.props.navigation.getParam('collaborators', []))}
                /> */}
                <SearchModal 
                    isModalVisible={this.state.isSearchModalVisible} 
                    toggleModal={this._toggleSearchModal}
                />
                <AddIdeaModal 
                    isModalVisible={this.state.isAddModalVisible}
                    toggleModal={this._toggleAddModal}
                /> 
                <ActionButton
                        buttonColor='#FAD15F' 
                        onPress={this._toggleAddModal}
                />
            </SafeAreaView>
        )
    }
}

/* Displays the information modal, accessed by clicking on the (i) header icon. */
// class InfoModal extends React.Component {
//     render() {
//         return (
//             <Modal 
//                 isVisible={this.props.isModalVisible}
//                 onBackdropPress={this.props.toggleModal} 
//                 animationIn='slideInDown' 
//                 animationOut='slideOutUp'  
//             >
//                 <View style={styles.infoModal}>
//                     <View style={ {flexDirection: 'row'} }>
//                         <View style={ {flex: 1} }/>
//                         <View style={styles.modalTitleContainer}>
//                             <Text style={styles.modalTitleText}>Details</Text>
//                         </View>
//                         <View style={styles.exitButtonContainer}>
//                             <TouchableOpacity onPress={this.props.toggleModal}>
//                                 <Image
//                                     source={require('../images/yellow_x.png')}
//                                     style={styles.exitButton}
//                                     resizeMode='contain'
//                                 />
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                     <ScrollView style={{ width: '80%', paddingTop: scale(15)}}>
//                         <Text>
//                             <Text style={styles.detailsTitleText}>{'Title: '}</Text>
//                             <Text style={styles.detailsText}>{this.props.title}</Text>
//                         </Text>
//                         <View style={ {height: scale(10)} }/>
//                         <Text>
//                             <Text style={styles.detailsTitleText}>{'Description: '}</Text>
//                             <Text style={styles.detailsText}>{this.props.details}</Text>
//                         </Text>
//                         <View style={ {height: scale(10)} }/>
//                         <Text>
//                             <Text style={styles.detailsTitleText}>{'Collaborators: '}</Text>
//                             <Text style={styles.detailsText}>{this.props.collaborators}</Text>
//                         </Text>
//                     </ScrollView>
//                 </View>
//             </Modal>
//         )
//     }
// }
/* Displays the search bar modal, accessed by clicking on the (Q) header icon. */
class SearchModal extends React.Component {
    render() {
        return (
            <Modal isVisible={this.props.isModalVisible}>
                <View style={styles.searchModalContainer}>
                    <View style={styles.searchModalHeader}>
                        <View style={styles.iconContainer}>
                            <TouchableOpacity onPress={this.props.toggleModal}>
                                <Image
                                    source={require('../images/gray_back_arrow.png')}
                                    resizeMode='contain'
                                    style={ {width: scale(22), height: scale(22)} }
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.searchBarContainer}>
                            <TextInput
                                placeholder='Search'
                                style={styles.searchText}
                                autoFocus={true}
                                selectionColor= '#656565'
                                clearButtonMode='while-editing'
                            />
                        </View>
                        <View style={styles.iconContainer}>
                            <TouchableOpacity onPress={ () => {} }>
                                <Image 
                                    source={require('../images/mic.png')}
                                    resizeMode='contain'
                                    style= { {width: scale(22), height: scale(22)} }
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.searchModalBody}>
                    </View>
                </View>
            </Modal>
        )
    }
}

/* Displays the add new idea modal, accessed by clicking on the plus FAB. */
class AddIdeaModal extends React.Component {
    /* Constructor. */
    constructor(props) {
        super(props)
        this.state = {
            newIdea: '',
            newNotes: '',
        }
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
        this.props.toggleModal()
    }
    
    /* Render function. */
    render() {
        return (
            <Modal 
                isVisible={this.props.isModalVisible}
                onBackdropPress={this.props.toggleModal}
            >
                <View style={styles.addModal}>
                    <View style={ {flexDirection: 'row', flex: 1} }>
                        <View style={ {flex: 1} }/>
                        <View style={styles.modalTitleContainer}>
                            <Text style={styles.modalTitleText}>Add New Idea</Text>
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
                        <View style={ {flex: 0.2} }/>
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
        )
    }
}

/* Style sheet. */
const styles = StyleSheet.create({
    addModal: {
        alignSelf: 'center',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '60%',
        width: '90%',
        backgroundColor: '#F5FCFF',
        borderRadius: 30,
        marginBottom: scale(220),
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

    searchModalContainer: {
        alignSelf: 'center',
        height: '110%',
        width: '110%',
        backgroundColor: '#F5FCFF',
    },
    searchModalHeader: {
        flex: 1.2,
        flexDirection: 'row',
    },
    iconContainer: {
        flex: 1.5,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: scale(15),
    },
    searchBarContainer: {
        flex: 7,
        justifyContent: 'flex-end',
        paddingBottom: scale(12),
        paddingLeft: scale(20),
    },
    searchText: {
        fontFamily: 'HiraginoSans-W3',
        fontSize: ThundrSize.small,
    },
    searchModalBody: {
        flex: 8,
        backgroundColor: '#ECECEC',
    },
})