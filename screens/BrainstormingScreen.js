/*  -- BrainstormingScreen.js --
    Displayed when a brainstorm is in progress. Allows user to
    press on the screen and record ideas.
*/

import React from 'react'
import {
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { scale } from 'react-native-size-matters'
import { StackActions, NavigationActions } from 'react-navigation'
import ThundrSize from '../components/ThundrSize'

export default class BrainstormingScreen extends React.Component { 
    render() {
        const collaborators = this.props.navigation.getParam('collaborators', null)

        /* Reset stack after navigating away. */
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: 'PostBrainstorm',
                    params: { collaborators: collaborators }
                })
            ]
        })

        return (
            <SafeAreaView style={styles.safeContainer}>
                <TouchableOpacity
                    style={{flex: 1}}
                >
                    <View style={styles.finishContainer}>
                        <StatusBar barStyle='light-content'/>
                        <TouchableOpacity
                            onPress={ () => this.props.navigation.dispatch(resetAction) }
                            style={styles.finishButton}
                        >
                            <Text style={styles.finishText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.boltContainer}>
                        <Image
                            style={styles.bolt}
                            source={require('../images/bolt.png')}
                            resizeMode='contain'
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Hold and Speak to Record an Idea</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }

    /* Header styling. */
    static navigationOptions = {
        header: null,
    }
}

/* Style sheet. */
const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: '#FAD15F',
    },
    finishContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    boltContainer: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bolt: {

    },
    finishButton: {
        width: '25%',
        height: ThundrSize.buttonHeight,
        alignItems: 'flex-end',
        marginRight: scale(20),
    },
    finishText: {
        fontFamily: 'HiraginoSans-W6',
        color: '#FFFFFF',
        fontSize: ThundrSize.medium,
        paddingVertical: (ThundrSize.buttonHeight - ThundrSize.medium) / 2,
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    text: {
        fontFamily: 'HiraginoSans-W3',
        fontSize: ThundrSize.small,
        color: '#FFFFFF',
    },
})