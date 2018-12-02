
import React from 'react'
import {
    View,
    StyleSheet,
    SafeAreaView,
    Image,
    Text,
    TouchableOpacity,
    StatusBar,
} from 'react-native'

import FontStyles from '../components/FontStyles'

export default class BrainstormingScreen extends React.Component { 
    static navigationOptions = {
        header: null,
    }

    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <View style={styles.finishContainer}>
                    <StatusBar barStyle='light-content'/>
                    <TouchableOpacity
                        onPress={ () => this.props.navigation.navigate('Home')}
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
                    <Text style={styles.text}>Hold to Record an Idea</Text>
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
        height: FontStyles.title,
        alignItems: 'flex-end',
        marginRight: 20,
    },
    finishText: {
        fontFamily: 'HiraginoSans-W6',
        color: '#FFFFFF',
        fontSize: FontStyles.body,
        paddingVertical: (FontStyles.title - FontStyles.body) / 2,
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    text: {
        fontFamily: 'HiraginoSans-W6',
        fontSize: FontStyles.body,
        color: '#FFFFFF',
    },
    done: {

    }
})