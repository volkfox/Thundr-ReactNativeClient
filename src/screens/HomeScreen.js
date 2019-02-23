/**
 * -- HomeScreen.js --
 * @flow
 * @format
 */

/*
    Todo:
    - make modal for error message instead of native apple alert?
    - component never unmounts -- see if this matters with keyboard listeners
*/


import React from 'react';
import { Animated, Keyboard, StatusBar, StyleSheet, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { DismissKeyboard } from '../components/DismissKeyboard';
import * as firebase from 'firebase';
import ThundrButton from '../components/ThundrButton';
import ThundrTextField from '../components/ThundrTextField';
import ThundrSize from '../components/ThundrSize';

const IMAGE_HEIGHT = scale(108);
const IMAGE_HEIGHT_SMALL = scale(85);
const FONT_SIZE = ThundrSize.title;
const FONT_SIZE_SMALL = ThundrSize.xxxlarge;

const firebaseConfig = {
    apiKey: "AIzaSyAZ3_t5WUBasDIBn3CtrNYxAOXn7IN8Jb0",
    authDomain: "voice-test-231101.firebaseapp.com",
    databaseURL: "https://voice-test-231101.firebaseio.com",
    projectId: "voice-test-231101",
    storageBucket: "voice-test-231101.appspot.com",
};

/* HomeScreen */
export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.keyboardHeight = new Animated.Value(0);
        this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
        this.fontSize = new Animated.Value(FONT_SIZE);
        this.state = {
            code: '',
        };
    };

    componentWillMount() {
        this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
        firebase.initializeApp(firebaseConfig);
    };

    componentWillUnmount() {
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
    };

    keyboardWillShow = (event) => {
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue: event.endCoordinates.height,
            }),
            Animated.timing(this.imageHeight, {
                duration: event.duration,
                toValue: IMAGE_HEIGHT_SMALL,
            }),
            Animated.timing(this.fontSize, {
                duration: event.duration,
                toValue: FONT_SIZE_SMALL, 
            }),
        ]).start();
    };

    keyboardWillHide = (event) => {
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue: 0,
            }),
            Animated.timing(this.imageHeight, {
                duration: event.duration,
                toValue: IMAGE_HEIGHT,
            }),
            Animated.timing(this.fontSize, {
                duration: event.duration,
                toValue: FONT_SIZE,
            }),
        ]).start();
    };

    onChange = (code) => {
        this.setState({code: code});
    }

    sendCode = () => {
        if (!this.state.code) {
            alert('Please enter the code on the display.');
            return;
        }
        this.props.navigation.navigate('Brainstorming');
    }

    render() {
        return (
            <DismissKeyboard>
                <Animated.View style={{ flex: 1, backgroundColor: '#7979CE', paddingBottom: this.keyboardHeight }}>
                    <StatusBar barStyle='light-content'/>
                    <View style={styles.logoContainer}>
                        <Animated.Image source={require('../images/logo.png')} style={{ height: this.imageHeight }} resizeMode='contain'/>
                        <Animated.Text style={[ styles.text, {fontSize: this.fontSize} ]}>Thundr</Animated.Text>
                    </View>
                    <View style={styles.codeEntryContainer}>
                        <ThundrTextField text='Enter Code' value={this.state.code} onChange={this.onChange}/> 
                        <ThundrButton 
                            style={{ marginTop: scale(15) }} 
                            color='dark' 
                            size='large' 
                            text='Join' 
                            onPress={this.sendCode}/>
                    </View>
                    <View style={styles.filler}>
                    </View>
                </Animated.View>
            </DismissKeyboard>
        );
    }
}

const styles = StyleSheet.create({
    logoContainer: {
        flex: 3,
        paddingTop: scale(10),
        alignItems: 'center',
        justifyContent: 'center',
    },
    codeEntryContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    text: {
        fontFamily: 'HiraginoSans-W6',
        color: '#FFFFFF',
        marginTop: scale(30),
    },
    filler: {
        flex: 0.5,
    },
});