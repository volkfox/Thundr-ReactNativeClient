/*  -- PostBrainstormScreen.js --
    Screen displayed after ending a brainstorm. 
    Allows user to title the brainstorm and record a short
    summary of topics covered.
*/

/*  TODO:
    - Add keys to HomeScreenItems
*/

import React from 'react'
import {
    View,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    StatusBar,
} from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import FontStyles from '../components/FontStyles'
import brainstormData from '../components/BrainstormData'

export default class PostBrainstormScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
        }
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <StatusBar barStyle='light-content'/>
                <View style={styles.titleContainer}> 
                    <TextInput 
                        style={styles.inputField}
                        placeholder='Title of Brainstorm'
                        onChangeText={ (text) => this.setState({ title: text}) }
                        value={this.state.title}
                    />
                </View>
                <View style={styles.descriptionContainer}>
                    <TextInput
                        style={styles.inputField}
                        multiline={true}
                        numberOfLines={3}
                        placeholder='Description'
                        onChangeText={ (text) => this.setState({ description: text }) }
                        value={this.state.description}
                    />
                </View>
                <View style={styles.doneContainer}>
                    <TouchableOpacity
                        style={styles.doneButton}
                        onPress={this._addRecentBrainstorm.bind(this)}
                    >
                        <Text style={styles.doneText}>Done</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 3}}>
                </View>
            </SafeAreaView>
        )
    }

    /* Get list of brainstorm collaborators. */
    _getCollaborators = () => {
        const collaborators = this.props.navigation.getParam('collaborators', null)
        const names = []
        for (let i = 0; i < collaborators.length; i++) {
            names.push(collaborators[i]['name'])
        }
        return names
    }

    /* Format today's date. */
    _getDate = () => {
        const today = new Date()
        let dd = today.getDate()
        let mm = today.getMonth() + 1
        let yy = today.getFullYear()
        if (dd < 10) {
            dd = '0' + dd
        } 
        if (mm < 10) {
            mm = '0' + mm
        }
        yy = JSON.stringify(yy).substring(2,4)
        return mm + '/' + dd + '/' + yy
    }

    /* Gets number of ideas generated during brainstorm. */
    _getIdeas = () => {
        return 10
    }

    /*  Checks if user has entered a title and description, then adds a new
        brainstorm object to BrainstormData, then navigates back Home. */
    _addRecentBrainstorm = () => {
        if (this.state.title.length == 0 || this.state.description.length == 0) {
            alert('Please enter a title and description for your recent brainstorm')
            return
        }
        
        /* Brainstorm object to add to BrainstormData */
        const recentBrainstorm = {
            title: this.state.title,
            date: this._getDate(),
            description: this.state.description,
            ideas: this._getIdeas(),
            collaborators: this._getCollaborators(),
        }

        /* Reset stack after navigating. */
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: 'Home'
                })
            ]    
        })

        brainstormData.unshift(recentBrainstorm)
        this.props.navigation.dispatch(resetAction)
    }
    
    /* Header styling. */
    static navigationOptions = {
        title: 'Finish Up',
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
        headerLeft: null,
        headerBackTitle: null,
    }
}

/* Style sheet. */
const styles = StyleSheet.create({
    titleContainer: {
        paddingTop: 50,
        flex: 0.8,
        alignItems: 'center',
    },
    inputField: {
        width: '80%',
        fontFamily: 'HiraginoSans-W3',
        fontSize: FontStyles.small + 3,
        borderBottomColor: '#FAD15F',
        borderBottomWidth: 1.5,
    },
    text: {
        fontFamily: 'HiraginoSans-W3',
        color: '#4B4A4A',
        marginLeft: 30,
        fontSize: FontStyles.small,
    },
    descriptionContainer: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center',
    },
    doneContainer: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center',
    },
    doneButton: {
        backgroundColor: '#FAD15F',
        alignItems: 'center',
        height: FontStyles.title,
        width: '85%',
        borderRadius: 100,
    },
    doneText: {
        color: '#FFFFFF',
        fontFamily: 'HiraginoSans-W3',
        fontSize: FontStyles.body,
        paddingVertical: (FontStyles.title - FontStyles.body) / 2,
    },
    keyboardContainer: {
        flex: 3,
    }
})