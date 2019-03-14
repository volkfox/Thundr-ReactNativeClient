/**
 * -- HomeScreen.js --
 */

import React from 'react';
import { Animated, Dimensions, Image, Keyboard, Linking, StatusBar, StyleSheet, View, TouchableOpacity} from 'react-native';
import { scale } from 'react-native-size-matters';
import { DismissKeyboard } from '../components/DismissKeyboard';
import * as firebase from 'firebase';
import Modal from 'react-native-modal';
import QRCodeScanner from 'react-native-qrcode-scanner';
import ThundrButton from '../components/ThundrButton';
import ThundrTextField from '../components/ThundrTextField';
import ThundrSize from '../components/ThundrSize';

const IMAGE_HEIGHT = scale(108);
const IMAGE_HEIGHT_SMALL = scale(85);
const FONT_SIZE = ThundrSize.title;
const FONT_SIZE_SMALL = ThundrSize.xxxlarge;
const OPACITY = 1.0;
const OPACITY_LOW = 0.0;

const firebaseConfig = {
    apiKey: "AIzaSyAZ3_t5WUBasDIBn3CtrNYxAOXn7IN8Jb0",
    authDomain: "voice-test-231101.firebaseapp.com",
    databaseURL: "https://voice-test-231101.firebaseio.com",
    projectId: "voice-test-231101",
    storageBucket: "voice-test-231101.appspot.com",
};

const { width, height } = Dimensions.get('window');

/* HomeScreen */
export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            code: '',
            isQRScannerVisible: false,
            isCameraDisabled: false,
        };
        this.keyboardHeight = new Animated.Value(0);
        this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
        this.fontSize = new Animated.Value(FONT_SIZE);
        this.opacity = new Animated.Value(OPACITY);
        firebase.initializeApp(firebaseConfig);
    };

    /* Set up keyboard listeners for animations */
    componentWillMount() {
        this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
        this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
    }

    /* Set up deep linking */
    componentDidMount() {
        Linking.getInitialURL().then((url) => {
            if (url) {
                const code = url.match(/code=([\S]*)/)[1];
                this.setState({ code: code });
                this.sendCode();
            }
        }).catch(err => console.error('An error occurred', err));
        Linking.addEventListener('url', this.handleOpenURL.bind(this));
    }

    /* Remove listeners */
    componentWillUnmount() {
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
        Linking.removeEventListener('url', this.handleOpenURL);
    }

    /* Called when a QR code is scanned while the app is open */
    handleOpenURL(event) {
        if (event.url) {
            const code = event.url.match(/code=([\S]*)/)[1];
            this.setState({ code: code }, () => {
                this.sendCode();
            });
        }
    }

    /* Shrinks content when keyboard opens */
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
            Animated.timing(this.opacity, {
                duration: event.duration,
                toValue: OPACITY_LOW,
            }),
        ]).start();
        this.setState({ isCameraDisabled: true });
    };

    /* Grows the content after keyboard is hiding */
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
            Animated.timing(this.opacity, {
                duration: event.duration,
                toValue: OPACITY,
            }),
        ]).start();
        this.setState({ isCameraDisabled: false });
    };

    /* onChange function for code TextInput */
    onChange = (text) => {
        this.setState({ code: text });
    };

    /* Checks if session code is valid */
    validCode = (code) => {
        return !code.includes(' ') && !code.includes('.') && !code.includes('#') && !code.includes('$') && !code.includes('[') && !code.includes(']')
    };

    /* Initiates brainstorm and navigates to BrainstormingScreen if code is valid */
    sendCode = () => {
        if (!this.state.code) {
            alert('Please scan the QR code or enter the code on the display.');
            return;
        }
        if (!this.validCode(this.state.code)) {
            alert('Please scan the QR code or enter the (alphanumeric) code on the display.');
            return;
        }
        let sessionRef = firebase.database().ref().child(this.state.code);
        sessionRef.once('value', (snapshot) => {
            if (snapshot.val() !== null) {
                this.props.navigation.navigate('Brainstorming', { session: this.state.code });
            } else {
                alert('Session with code ' + this.state.code + ' does not exist.');
            }
        });
    };

    /* Called when QRScanner successfully scans a code */
    onSuccess(event) {
        if (event.data) {
            const code = event.data.match(/code=([\S]*)/)[1];
            this.setState({ code: code }, () => {
                this.toggleQRScanner();
                this.sendCode();
            });
        }
    }

    /* Toggles modal */
    toggleQRScanner = () => {
        this.setState({ isQRScannerVisible: !this.state.isQRScannerVisible });
    }

    render() {
        return (
            <DismissKeyboard>
                <Animated.View style={{ flex: 1, backgroundColor: '#7979CE', paddingBottom: this.keyboardHeight }}>
                    <StatusBar barStyle='light-content' hidden={this.state.isQRScannerVisible} />
                    <View style={styles.logoContainer}>
                        <Animated.Image source={require('../images/thundr_logo.png')} style={{ height: this.imageHeight }} resizeMode='contain' />
                        <Animated.Text style={[ styles.text, {fontSize: this.fontSize} ]}>Thundr</Animated.Text>
                    </View>
                    <View style={styles.codeEntryContainer}>
                        <ThundrTextField text='Scan the QR code below!' value={this.state.code} onChange={this.onChange} /> 
                        <ThundrButton 
                            style={{ marginTop: scale(15) }} 
                            color='#454899' 
                            size='large' 
                            text='Join' 
                            onPress={this.sendCode}
                        />
                    </View>
                    <Animated.View style={[styles.cameraContainer, {opacity: this.opacity}]}>
                        <TouchableOpacity 
                            onPress={this.toggleQRScanner}
                            disabled={this.state.isCameraDisabled}
                        >
                            <Image
                                source={require('../images/camera.png')}
                                style={styles.camera}
                                resizeMode='contain'
                            />
                        </TouchableOpacity>
                    </Animated.View>
                    <Modal 
                        isVisible={this.state.isQRScannerVisible}
                        onBackdropPress={this.toggleQRScanner}
                        backdropOpacity={0.3}
                        style={styles.modal}
                    >
                        <View style={styles.QRContainer}>
                            <QRCodeScanner
                                onRead={this.onSuccess.bind(this)}
                                topContent={null}
                                bottomContent={null}
                                cameraStyle={{ height: 0.83 * height }}
                            />
                        </View>
                    </Modal>
                </Animated.View>
            </DismissKeyboard>
        );
    }
}

const styles = StyleSheet.create({
    logoContainer: {
        flex: 2,
        paddingTop: scale(30),
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
    cameraContainer: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    camera: {
        height: '70%',
        marginBottom: scale(10),
    },
    QRContainer: {
        height: '83%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        margin: 0,
        justifyContent: 'flex-start',
    },
});