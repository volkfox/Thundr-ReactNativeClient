/**
  *  -- BrainstormingScreen.js @flow --
  *  Displayed when a brainstorm is in progress. Allows user to tap screen to record an idea.
  *  On second tap, speech to text translation occurs and modal pops up with the generated idea,
  *  which the user can then edit. 
  */

/* TODOs:
    - when state (mode/channel) changes, rerender and animate to signal that we're changing 
*/

import React from 'react'
import {
    Animated,
    Dimensions,
    FlatList,
    Image,
    Keyboard,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import { Audio, FileSystem, Permissions } from 'expo';
import { scale } from 'react-native-size-matters'
import { StackActions, NavigationActions } from 'react-navigation'
import FlipComponent from 'react-native-flip-component'
import Modal from 'react-native-modal'
import Pulse from 'react-native-pulse'
import ThundrButton from '../components/ThundrButton'
import ThundrSize from '../components/ThundrSize'
import * as Expo from 'expo';
import * as firebase from 'firebase';
import Spinner from 'react-native-loading-spinner-overlay'
import SubmittedIdea from '../components/SubmittedIdea'

/* Initialize Firebase. */
const firebaseConfig = {
    apiKey: "AIzaSyAZ3_t5WUBasDIBn3CtrNYxAOXn7IN8Jb0",
    authDomain: "voice-test-231101.firebaseapp.com",
    databaseURL: "https://voice-test-231101.firebaseio.com",
    projectId: "voice-test-231101",
    storageBucket: "voice-test-231101.appspot.com",
};
  
/* Session ID should be read via dialog in the real app. We can check if a valid channel # exists to verify proper session ID. */
// const session = 'MPUZKX';

// const session = '7HHHHH';
// const session = 'FFFFF1';
// const session = 'FFEAAA';
// const session = 'FFFBAA'
// const session = 'AAXAAA'
const session = 'AXAAA'
const DISABLED_OPACITY = 0.1;
const { height, width } = Dimensions.get('window');

export default class BrainstormingScreen extends React.Component { 
    /* Header styling. */
    static navigationOptions = ({navigation})  => {
        _finishBrainstorm = () => {
            navigation.dispatch(
                StackActions.reset({
                    index: 0, 
                    actions: [
                        NavigationActions.navigate({
                            routeName: 'Home',
                        })
                    ],
                })
            );
        }
        return {
            title: 'New Brainstorm',  
            headerStyle: {
                borderBottomWidth: 0,
                height: ThundrSize.headerHeight,
                backgroundColor: '#454899',
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
                fontFamily: 'HiraginoSans-W6',
                fontSize: ThundrSize.medium,
                paddingTop: scale(8),
            },
            headerBackTitle: null,
            // headerRight: (
            //     <TouchableOpacity onPress={_finishBrainstorm}>
            //         <Text style={styles.finishText}>Done</Text>
            //     </TouchableOpacity>
            // ),
        }
    }

    /* Constructor. */
    constructor(props) {
        super(props);
        this.recording = null;
        this.sound = null;
        this.isSeeking = false;
        this.shouldPlayAtEndOfSeek = false;
        this.state = {
            haveRecordingPermissions: false,
            isLoading: false,
            isPlaybackAllowed: false,
            muted: false,
            soundPosition: null,
            soundDuration: null,
            recordingDuration: null,
            shouldPlay: false,
            isPlaying: false,
            isRecording: false,
            shouldCorrectPitch: true,
            volume: 1.0,
            rate: 1.0,
            ideaText: '',
            messages: [],  /* all messages from all channels */
            channel: 0,    /* defaults to channel #0 */
            mode: 1,       /* app mode: 0=send comments, 1=rate comments */
            isFlipped: false,
            spinner: false,
        };
        this.recordingSettings = {
            android: {
                extension: '.m4a',
                outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_AMR_NB,
                audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AMR_NB,
                sampleRate: 44100,
                numberOfChannels: 2,
                bitRate: 128000,
            },
            ios: {
                extension: '.wav',
                outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_LINEARPCM,
                audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
                sampleRate: 44100,
                numberOfChannels: 1,
                bitRate: 128000,
                linearPCMBitDepth: 16,
                linearPCMIsBigEndian: false,
                linearPCMIsFloat: true,
            },
        }
    }
    
    /* Saves ideas to Firebase. */
    saveIdea =  () => {
        const postList = firebase.database().ref(session+'/messages').push();
        postList.set({
            text: this.state.ideaText,
            channel: this.state.channel,
        });
        this.setState({ideaText: ''});
    }

    /* Sends a vote to Firebase. */
    vote = (key, upvote) => {
        const voteList = firebase.database().ref(session+'/votes').push();
        voteList.set({
            key: key,
            vote: upvote ? 1 : -1,
            channel: this.state.channel,
        });
        console.log(upvote, key, this.state.channel);
    }

    /* Called when idea is added. */
    updateMessages = (data) => {
        const messages = this.state.messages;
        messages.push({text: data.val().text, key: data.key});
        this.setState({ messages });
        console.log(this.state.messages);
    }
    
    /* Called when idea is removed. */
    removeMessages = (data) => {
        const messages = this.state.messages.filter(item => item.key !== data.key);
        this.setState({ messages });
    }
    
    /* On render. */
    componentDidMount() {
        this._askForPermissions();
    
        /* Firebase listener setup. */
        firebase.initializeApp(firebaseConfig);
    
        /* List of all comments. */
        const commentsRef = firebase.database().ref(session+ '/messages');
        commentsRef.on('child_added', this.updateMessages);
        commentsRef.on('child_removed', this.removeMessages);
    
        /* Channel # */
        const channelRef = firebase.database().ref(session + '/channel');
        channelRef.on('value', (snapshot) => { this.setState({channel: snapshot.val()}) });
    
        /* Mode code. */
        // const modeRef = firebase.database().ref(session + '/mode');
        // modeRef.on('value', (snapshot) => { this.setState({mode: snapshot.val()}) });

        /* We are not listening to remote likes because mobile client is not showing them. */
        if (this.state.mode) {
            this.setState({isFlipped: this.state.mode});
        }
    }
    
    /* Ask for microphone access. */
    _askForPermissions = async () => {
        const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        this.setState({ haveRecordingPermissions: response.status === 'granted' });
    }
    
    /* Called to update state when recording ends. */
    _updateScreenForSoundStatus = status => {
        if (status.isLoaded) {
            this.setState({
                soundDuration: status.durationMillis,
                soundPosition: status.positionMillis,
                shouldPlay: status.shouldPlay,
                isPlaying: status.isPlaying,
                rate: status.rate,
                muted: status.isMuted,
                volume: status.volume,
                shouldCorrectPitch: status.shouldCorrectPitch,
                isPlaybackAllowed: true,
            });
        } else {
            this.setState({
                soundDuration: null,
                soundPosition: null,
                isPlaybackAllowed: false,
            });
            if (status.error) {
                console.log(`FATAL PLAYER ERROR: ${status.error}`);
            }
        }
    }
    
    /* Called to update state when recording begins. */
    _updateScreenForRecordingStatus = status => {
        if (status.canRecord) {
            this.setState({
                isRecording: status.isRecording,
                recordingDuration: status.durationMillis,
            });
        } else if (status.isDoneRecording) {
            this.setState({
                isRecording: false,
                recordingDuration: status.durationMillis,
            });
            if (!this.state.isLoading) {
                this._stopRecordingAndEnablePlayback();
            }
        }
    }
    
    /* Converts input into formatted byte array. */
    convertToByteArray = input => {
        var binary_string = this.atob(input);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes;
    }
    
    /* Converts input to bytes. */
    atob = input => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        let str = input.replace(/=+$/, '');
        let output = '';
        if (str.length % 4 === 1) {
            throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
        }
        for (let bc = 0, bs = 0, buffer, i = 0; buffer = str.charAt(i++); ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer, bc++ % 4) ? 
            output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0)
        {
            buffer = chars.indexOf(buffer);
        }
        return output;
    }
    
    /* Get formated time. */
    _getMMSSFromMillis(millis) {
        const totalSeconds = millis / 1000;
        const seconds = Math.floor(totalSeconds % 60);
        const minutes = Math.floor(totalSeconds / 60);
        const padWithZero = number => {
            const string = number.toString();
            if (number < 10) {
                return '0' + string;
            }
            return string;
        };
        return padWithZero(minutes) + ':' + padWithZero(seconds);
    }
    
    /* Get recording timestamp. */
    _getRecordingTimestamp() {
        if (this.state.recordingDuration != null) {
            return `${this._getMMSSFromMillis(this.state.recordingDuration)}`;
        }
        return `${this._getMMSSFromMillis(0)}`;
    }
    
    /* Called to begin recording. */
    async _stopPlaybackAndBeginRecording() {
        this.setState({ isLoading: true });

        if (this.sound !== null) {
            await this.sound.unloadAsync();
            this.sound.setOnPlaybackStatusUpdate(null);
            this.sound = null;
        }

        await Audio.setAudioModeAsync({
            playThroughEarpieceAndroid: true,
            allowsRecordingIOS: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        });

        if (this.recording !== null) {
            this.recording.setOnRecordingStatusUpdate(null);
            this.recording = null;
        }

        const recording = new Audio.Recording();
        await recording.prepareToRecordAsync(this.recordingSettings);
        recording.setOnRecordingStatusUpdate(this._updateScreenForRecordingStatus);
        this.recording = recording;
        await this.recording.startAsync();  /* Will call this._updateScreenForRecordingStatus to update the screen. */

        this.setState({ isLoading: false });
    }
    
    /* Called to end recording. */
    async _stopRecordingAndEnablePlayback() {
        this.setState({ isLoading: true });
        this.setState({ spinner: true });

        try {
            await this.recording.stopAndUnloadAsync();
        } catch (error) {
            /* Do nothing -- we are already unloaded. */
        }

        const info = await FileSystem.getInfoAsync(this.recording.getURI());
        const audioStruct = JSON.stringify(info)
        const encoded: string = await Expo.FileSystem.readAsStringAsync(info.uri,{ encoding: FileSystem.EncodingTypes.Base64 });
        const audioData = this.convertToByteArray(encoded);

        try {
            let response = await fetch('https://stream.watsonplatform.net/speech-to-text/api/v1/recognize', {
                'method': 'POST',
                'headers': {
                    'Content-Type': "audio/wav",
                    'Authorization': "Basic YXBpa2V5OmNCZ2JkNV9lVTdjQXlRb19FX1M2N01lVDg5YnJWNnJpS0NuTDZJTWZibTVI",
                },
                'body': audioData,
            });
            const responseJson = await response.json();
            console.log(responseJson);
            let results = "";
            for (var utterance of responseJson.results) {
                results += utterance.alternatives[0].transcript+" ";
            }
            this.setState({ ideaText: results });
        } catch (error) {
            console.error(error);
        }
    
        await Audio.setAudioModeAsync({
            playThroughEarpieceAndroid: true,
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            playsInSilentLockedModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        });
    
        const { sound, status } = await this.recording.createNewLoadedSoundAsync(
            {
                isLooping: true,
                isMuted: this.state.muted,
                volume: this.state.volume,
                rate: this.state.rate,
                shouldCorrectPitch: this.state.shouldCorrectPitch,
            },
            this._updateScreenForSoundStatus
        );
        this.sound = sound;
        this.setState({ isLoading: false });
        this.setState({ spinner: false });
        this._toggleModal();
    }
    
    /* Called to start/end recording. */
    _onRecordPressed = () => {
        if (this.state.isRecording) {
            this._stopRecordingAndEnablePlayback();
        } else {
            this._stopPlaybackAndBeginRecording();
        }
    }

    /* Toggles visibility of AddIdeaModal */
    _toggleModal = () => this.setState({isModalVisible : !this.state.isModalVisible})


    _renderSeparator = () => (
        <View style = { {height: scale(30)} }/>
    )
    
    /* renderItem function for FlatList. */
    _renderItem = ({item}) => (
        <SubmittedIdea item={item} onPress={this.vote}/>
    )

    /* Render function. */
    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <FlipComponent
                    isFlipped={this.state.isFlipped}
                    frontView={
                        <SafeAreaView>
                            <StatusBar barStyle='light-content'/>
                            <TouchableOpacity 
                                style={ {height: '100%', opacity: this.state.isLoading ? DISABLED_OPACITY : 1.0} }
                                onPress={this._onRecordPressed}
                                disabled={this.state.isLoading}
                            >
                                <View style={styles.reminderContainer}>
                                    <Text style={styles.reminderText}>Tap to Record an Idea</Text>
                                </View>
                                <View style={styles.boltContainer}>
                                    { this.state.isRecording ? <Pulse color='#A6A8E8' diameter={scale(300)}/> : null}
                                    <Image
                                        style={styles.bolt}
                                        source={require('../images/bolt.png')}
                                        resizeMode='contain'
                                    />
                                </View>
                                <View style={styles.reminderContainer}>
                                    <Text style={styles.reminderText}>Tap Again to Submit</Text>
                                </View>
                            </TouchableOpacity>
                            <Spinner
                                visible={this.state.spinner}
                                textContent={'Creating Idea...'}
                                textStyle={{color: '#FFFFFF'}}

                            />
                            <AddIdeaModal
                                isModalVisible={this.state.isModalVisible}
                                toggleModal={this._toggleModal}
                                textValue={this.state.ideaText}
                                onChangeText={(text) => this.setState({ideaText: text})}
                                onPress={this.saveIdea}
                            /> 
                        </SafeAreaView>
                    }
                    backView={
                        <SafeAreaView>
                            <StatusBar barStyle='light-content'/>
                            <FlatList
                                style={ {height: height - ThundrSize.headerHeight - scale(50)} }
                                data={this.state.messages} 
                                renderItem={this._renderItem}
                                ItemSeparatorComponent={this._renderSeparator} 
                            />
                        </SafeAreaView>
                    }
                    frontStyles={styles.frontStyles}
                    backStyles={styles.backStyles}
                    rotateDuration={300}
                />
            </SafeAreaView>
        ) 
    } 
}

const MODAL_HEIGHT = 0; 
const MODAL_HEIGHT_KEYBOARD = scale(220);

/* Modal that allows you to edit the idea you recorded. */
class AddIdeaModal extends React.Component {

    constructor(props) {
        super(props);
        this.keyboardHeight = new Animated.Value(0);
        this.modalHeight = new Animated.Value(MODAL_HEIGHT);
    };

    /* Submits idea to Firebase. */
    _submitIdea = () => {
        this.props.onPress();
        this.props.toggleModal();
    };

    componentWillMount() {
        this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
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
            Animated.timing(this.modalHeight, {
                duration: event.duration,
                toValue: MODAL_HEIGHT_KEYBOARD,
            }),
        ]).start();
    };

    keyboardWillHide = (event) => {
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue: 0,
            }),
            Animated.timing(this.modalHeight, {
                duration: event.duration,
                toValue: MODAL_HEIGHT,
            }),
        ]).start();
    };


    /* Renders a modal that displays the generated idea. */
    render() {
        return (
            <Modal 
                isVisible={this.props.isModalVisible}
                onBackdropPress={this.props.toggleModal}
            >
                <Animated.View style={[styles.modalContainer, {marginBottom: this.modalHeight}]}>
                    <View style={styles.modalTitleContainer}>
                        <View style={ {flex: 1.5} }/>
                        <View style={styles.modalTitleTextContainer}>
                            <Text style={styles.modalTitleText}>New Idea</Text>
                        </View>
                        <View style={styles.exitButtonContainer}>
                            <TouchableOpacity onPress={this.props.toggleModal}>
                                <Image
                                    source={require('../images/white_x.png')}
                                    style={styles.exitButton}
                                    resizeMode='contain'
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.modalBodyContainer}>
                        <View style={ {flex: 8} }>
                            <TextInput
                                style={styles.textInput}
                                placeholder='Idea'
                                clearButtonMode='while-editing'
                                onChangeText={ (text) => this.props.onChangeText(text) }
                                value={this.props.textValue}
                                selectionColor= '#A6A8E8'
                                multiline={true}
                                keyboardAppearance='dark'
                            />
                        </View>
                        <View style={styles.submitButtonContainer}>
                            <ThundrButton text='Submit' onPress={this._submitIdea}/>
                        </View>
                    </View>
                </Animated.View>
            </Modal>
        )
    }
}

/* Style sheet. */
const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: '#ECECFC',
        justifyContent: 'center',
    },
    finishText: {
        fontFamily: 'HiraginoSans-W6',
        color: '#FFFFFF',
        fontSize: ThundrSize.xsmall,
        paddingTop: scale(8),
        paddingRight: scale(13),
    },
    boltContainer: {
        flex: 5,
        justifyContent: 'center',
    },
    bolt: {
        alignSelf: 'center',
    },
    reminderContainer: {
        flex: 1, 
        justifyContent: 'center',
    },
    reminderText: {
        alignSelf: 'center',
        // color: '#9D9BEC',
        color: '#DDDCF0',
        fontFamily: 'HiraginoSans-W6',
        fontSize: ThundrSize.small,
    },
    modalContainer: {
        alignSelf: 'center',
        height: '60%',
        width: '90%',
        backgroundColor: '#F5FCFF',
        borderRadius: 6,
    },
    modalTitleContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#A6A8E8',
        alignItems: 'center',
        borderTopRightRadius: 6,
        borderTopLeftRadius: 6,
    },
    modalTitleTextContainer: {
        flex: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalTitleText: {
        fontFamily: 'HiraginoSans-W3',
        fontSize: ThundrSize.medium,
        paddingTop: scale(20),
        color: '#FFFFFF',
    },
    modalBodyContainer: {
        flex: 7,
        marginTop: scale(10),
    },
    exitButton: {
        width: scale(20), 
        height: scale(20),
    },
    exitButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: scale(10),
        paddingRight: scale(20),
    },
    submitButtonContainer: {
        flex: 2.2,
        justifyContent: 'center',
    },
    textInput: {
        fontFamily: 'HiraginoSans-W3',
        fontSize: ThundrSize.medium,
        marginHorizontal: scale(25),
        marginTop: scale(10),
    },
    frontStyles: {
        backgroundColor: '#7979CE',
        justifyContent: 'center',
        height: height - ThundrSize.headerHeight, 
        width,
      },
      backStyles: {
        backgroundColor: '#ECECFC',
        justifyContent: 'center',
        height: height - ThundrSize.headerHeight,
        width,
      },
})