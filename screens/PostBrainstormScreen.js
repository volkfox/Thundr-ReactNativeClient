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
    SafeAreaView,
    StatusBar,
    View,
} from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import brainstormData from '../data/BrainstormData'
import ThundrButton from '../components/ThundrButton'
import ThundrSize from '../components/ThundrSize'
import ThundrTextField from '../components/ThundrTextField'

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
                <ThundrTextField
                    text='Title of Brainstorm'
                    onChangeText={ (text) => this.setState({title: text}) }
                    value={this.state.title}
                />
                <ThundrTextField
                    text='Description'
                    onChangeText={ (text) => this.setState({description: text}) }
                    value={this.state.description}
                    multiline={true}
                    numberOfLines={3}
                />
                <View style={{ flex: 0.7 }}/>
                <ThundrButton
                    text='Done'
                    color='yellow'
                    onPress={this._addRecentBrainstorm.bind(this)}
                />
                <View style={{flex: 3}}/>
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
            height: ThundrSize.headerHeight,
            backgroundColor: '#FAD15F',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
            fontFamily: 'HiraginoSans-W6',
            fontSize: ThundrSize.medium,
        },
        headerLeft: null,
        headerBackTitle: null,
    }
}