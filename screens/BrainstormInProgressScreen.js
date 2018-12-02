/*  -- BrainstormInProgressScreen.js --
    Displayed when the user is currently brainstorming.
    User speaks and Thundr records the ideas.
*/

import React from 'react'
import {
    SafeAreaView,
    View,
    StyleSheet,
} from 'react-native'

export default class BrainstormInProgressScreen extends React.Component {
    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <View style={styles.container}>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: '#FAD15F',
    },
    container: {
        flex: 1,
    },
})