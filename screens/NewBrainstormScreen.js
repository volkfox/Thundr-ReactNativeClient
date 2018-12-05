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
    Image,
    FlatList,
} from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import FontStyles from '../components/FontStyles'
import CollaboratorItem from '../components/CollaboratorItem'
import { scale } from 'react-native-size-matters'
import ThundrButton from '../components/ThundrButton'

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
            <SafeAreaView style={{ flex: 1}}>
                <View style={{ flex: 4 }}>
                    <View style={styles.fieldContainer}>
                        <View style={{ width: scale(30) }}/>
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
                    <View style={{ flex: 3, paddingBottom: scale(10) }}>
                        <FlatList
                            ref='flatList'
                            data={this.state.collaboratorsHolder}
                            renderItem={this._renderItem}
                            extraData={this.state.collaboratorsHolder}
                        />
                    </View>
                </View>
                <ThundrButton
                    text='Start'
                    color='yellow'
                    onPress={ () => {this.props.navigation.dispatch(resetAction)} }
                />
                <View style={{ flex: 4 }}/>
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
    static navigationOptions = ({navigation}) => ({
        title: 'Add People', 
        headerStyle: {
            borderBottomWidth: 0,
            height: FontStyles.headerHeight,
            backgroundColor: '#FAD15F',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
            fontFamily: 'HiraginoSans-W6',
            fontSize: FontStyles.medium,
        },
        headerBackTitle: null,
        headerLeft: (
            <TouchableOpacity 
                style={ {paddingLeft: scale(12), paddingBottom: scale(9)} } 
                onPress={ () => {navigation.pop()}}
            >
                <Image
                    source={require('../images/white_back_arrow.png')}
                    resizeMode='contain'
                    style={ {width: scale(22), height: scale(22)} }
                />
            </TouchableOpacity>
        )
    })
}

/* Style sheet. */
const styles = StyleSheet.create({
    fieldContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: scale(20),
    },
    addButtonContainer: {
        marginLeft: 10,
        width: scale(30),
        height: scale(50),
        justifyContent: 'center',
    },
    addButton: {
        width: scale(15),
        height: scale(15),
    },
    inputField: {
        width: '75%',
        fontFamily: 'HiraginoSans-W3',
        fontSize: FontStyles.medium,
        borderBottomColor: '#FAD15F',
        borderBottomWidth: scale(1.5),
    },
})