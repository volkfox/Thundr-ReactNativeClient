/*  -- NewBrainstormScreen.js --
    Allows user to start a new brainstorm by adding people.
*/

/* 
    TODO: 
    - make back arrow icon into an 'x'
*/

import React from 'react'
import {
    SafeAreaView,
    View,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Text,
    Image,
    FlatList,
} from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import FontStyles from '../components/FontStyles'
import CollaboratorItem from '../components/CollaboratorItem'

export default class NewBrainstormScreen extends React.Component {
    constructor(props) {
        super(props)
        this.collaborators = [] 
        this.state = {
            text: '',
            collaboratorsHolder: [],
        }       
    }

    render() {
        /* Reset stack after navigating away. */
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: 'Brainstorming',
                    params: { collaborators: this.collaborators },
                })
            ]
        })

        return (
            <SafeAreaView style={styles.safeContainer}>
                <View style={styles.inputContainer}>
                    <View style={styles.fieldContainer}>
                        <TextInput 
                            style={styles.inputField}
                            placeholder='People'
                            onChangeText={ (text) => this.setState({text}) }
                            value={this.state.text}
                        />
                        <TouchableOpacity
                            style={styles.addButtonContainer}
                            onPress={this._addPerson}
                        >
                            <Image
                                source={require('../images/yellow_plus.png')}
                                style={styles.addButton}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.peopleContainer}>
                        <FlatList
                            ref='flatList'
                            data={this.state.collaboratorsHolder}
                            renderItem={this._renderItem}
                            extraData={this.state.collaboratorsHolder}
                        />
                    </View>
                </View>
                <View style={styles.startContainer}>
                    <TouchableOpacity
                        style={styles.startButton}
                        onPress={ () => {this.props.navigation.dispatch(resetAction)} }
                    >
                        <Text style={styles.startText}>Start</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.keyboardContainer}>
                </View>
            </SafeAreaView>
        )
    }

    /* renderItem function used by FlatList. */
    _renderItem = ({item}) => (
        <CollaboratorItem
            name = {item.name}
        />
    )

    /* Add a collaborator when textInput button is pressed. */
    _addPerson = () => {
        this.collaborators.push({'name': this.state.text})
        this.setState({
             text: '',
             collaboratorsHolder: [...this.collaborators]
        })
        this.refs.flatList.scrollToEnd()
    }

    /* Header styling. */
    static navigationOptions = {
        title: 'Add People', 
        headerStyle: {
            borderBottomWidth: 0,
            height: FontStyles.headerHeight,
            backgroundColor: '#FAD15F',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
            fontFamily: 'HiraginoSans-W6',
            fontSize: FontStyles.header - 5,
        },
        headerBackTitle: null,
    }
}

/* Style sheet. */
const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
    },
    inputContainer: {
        flex: 4,
    },
    fieldContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    addButtonContainer: {
        marginLeft: 10,
        width: 30,
        height: 50,
        justifyContent: 'center',
    },
    addButton: {
        width: 15,
        height: 15,
    },
    peopleContainer: {
        flex: 3,
    },
    startContainer: {
        flex: 1,
    },
    keyboardContainer: {
        flex: 4,
    },
    inputField: {
        width: '75%',
        fontFamily: 'HiraginoSans-W3',
        fontSize: FontStyles.small + 3,
        borderBottomColor: '#FAD15F',
        borderBottomWidth: 1.5,
    },
    startButton: {
        backgroundColor: '#FAD15F',
        marginHorizontal: 25,
        borderRadius: 100,
        alignItems: 'center',
        height: FontStyles.title,
    },
    startText: {
        color: '#FFFFFF',
        fontFamily: 'HiraginoSans-W6',
        fontSize: FontStyles.body,
        paddingVertical: (FontStyles.title - FontStyles.body) / 2,
    },
    collaboratorText: {
        fontFamily: 'HiraginoSans-W6',
        fontSize: FontStyles.body,
        paddingVertical: 5,
    },
})