/*  -- NewBrainstormScreen.js --
    Allows user to start a new brainstorm by adding people.
*/

import React from 'react'
import {
    SafeAreaView,
    View,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Text,
} from 'react-native'
import FontStyles from '../components/FontStyles'

/* 
    TODO: 
    - make back arrow icon into an 'x'
*/

export default class NewBrainstormScreen extends React.Component {
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
            fontSize: FontStyles.header,
        },
        headerBackTitle: null,
    }
    
    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <View style={styles.inputContainer}>
                    <View style={styles.fieldContainer}>
                        <TextInput 
                            style={styles.inputField}
                            placeholder='People'
                        />
                    </View>
                    <View style={styles.peopleContainer}>
                    </View>
                </View>
                <View style={styles.startContainer}>
                    <TouchableOpacity
                        style={styles.startButton}
                        onPress={ () => {this.props.navigation.navigate('Brainstorming')}}
                    >
                        <Text style={styles.startText}>Start</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.keyboardContainer}>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
    },
    inputContainer: {
        flex: 4,
    },
    fieldContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
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
        width: '80%',
        fontFamily: 'HiraginoSans-W3',
        fontSize: FontStyles.body,
        borderBottomColor: '#FAD15F',
        borderBottomWidth: 2,
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
})