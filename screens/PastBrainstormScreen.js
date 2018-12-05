/*  -- PastBrainstormScreen.js --
    Displays a past brainstorm's generated ideas.
    Allows user to scroll through ideas and read notes, see upvotes, add new ideas.
*/

import React from 'react'
import {
    SafeAreaView,
    View,
    FlatList,
    StatusBar,
    TouchableOpacity,
    Image,
    StyleSheet,
    Text,
    TextInput,
} from 'react-native'
import { scale } from 'react-native-size-matters'
import ActionButton from 'react-native-action-button'
import Modal from 'react-native-modal'
import FontStyles from '../components/FontStyles'
import PastBrainstormItem from '../components/PastBrainstormItem'
import pastData from '../data/PastData'

export default class PastBrainstormScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalVisible: false,
            newIdea: '',
            newNotes: '',
        }
    }

     /* Change the visibility of the modal. */
     _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible })

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <StatusBar barStyle='light-content'/>
                <FlatList
                    data={pastData}
                    renderItem={this._renderItem}
                    ItemSeparatorComponent={this._renderSeparator}
                />
                <Modal 
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

    /* Header styling. */
    static navigationOptions = ({navigation}) => ({
        title: navigation.getParam('title', null), 
        headerStyle: {
            borderBottomWidth: 0,
            height: FontStyles.headerHeight,
            backgroundColor: '#FAD15F',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
            fontFamily: 'HiraginoSans-W6',
            fontSize: FontStyles.small,
        },
        headerLeft: null,
        headerRight: (
            <TouchableOpacity style={ {paddingRight: scale(25), paddingBottom: scale(5)} }
                onPress={ () => {} }
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
        marginBottom: scale(150),
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
    inputContainer: {
        flex: 4, 
        width: '100%', 
        alignItems: 'center',
    },
    textInput: {
        fontFamily: 'HiraginoSans-W3',
        fontSize: FontStyles.small,
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
        height: FontStyles.buttonHeight * 0.8,
        marginHorizontal: scale(30),
        borderRadius: 100,
    },
    addIdeaText: {
        fontFamily: 'HiraginoSans-W6',
        color: '#FFFFFF',
        fontSize: FontStyles.small,
        paddingVertical: (0.8 * FontStyles.buttonHeight - FontStyles.small) / 2,
    },
})