/**
 * -- BrainstormingScreen --
 */

import React from 'react';
import { Dimensions, FlatList, Image, Linking, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import * as firebase from 'firebase';
import { DismissKeyboard } from '../components/DismissKeyboard';
import FlipComponent from 'react-native-flip-component';
import Pulse from 'react-native-pulse';
import Sound from 'react-native-sound';
import SubmittedIdea from '../components/SubmittedIdea';
import ThundrButton from '../components/ThundrButton';
import ThundrSize from '../components/ThundrSize';
import Voice from 'react-native-voice';

const { height, width } = Dimensions.get('window');

const COLORS = [
    '#A6ADE8', // thundr
    '#A6E8BC', // green
    '#E8A6A6', // red
    '#A6D4E8', // blue
    '#E3A6E8', // violet
];

const HEADER_COLORS = [
    '#7979CE', // thundr
    '#6EE294', // green
    '#EB7A7A', // red 
    '#64BDE3', // blue
    '#E189E8', // violet
];

const BUTTON_COLORS = [
    '#454899', // thundr
    '#3BBF66', // green
    '#D93D3D', // red
    '#1EA5DE', // blue
    '#CE43D9', // violet
];

const MICS = [
    require('../images/thundr_mic.png'),
    require('../images/green_mic.png'),
    require('../images/red_mic.png'),
    require('../images/blue_mic.png'),
    require('../images/violet_mic.png'),
];

export default class BrainstormingScreen extends React.Component {
    static navigationOptions = {
        gesturesEnabled: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            headerText: '',
            ideaText: '',            /* Stores current idea */
            edited: '',              /* Used to patch together separate instances of voice in one idea */
            ideas: [],               /* All ideas in the session */
            mode: false,             /* 0 -> brainstorming, 1 -> voting; linked to firebase, controlled by web app */
            channel: 0,              /* Corresponds to different tabs/topics in session */
            recording: false,        /* State of voice */
            error: '',               /* Stores possible error from current instance of voice */
            results: [],             /* Stores results of current instance of voice */
            ideaTitle: 'Your Idea',  /* Displayed on top of the sticky note */ 
            session: this.props.navigation.getParam('session'),  /* Code entered on home screen */
            microphonePermission: false,
            speechRecognitionPermission: false,
        };

        /* react-native-voice setup */
        Voice.onSpeechError = this.onSpeechError;
        Voice.onSpeechResults = this.onSpeechResults;

        /* react-native-sound setup */
        this.state.record_on_sound = new Sound('record_on.mp3', Sound.MAIN_BUNDLE, (e) => {
            if (e) console.log('Failed to load the sound', e);
        });
        this.state.record_off_sound = new Sound('record_off.mp3', Sound.MAIN_BUNDLE, (e) => {
            if (e) console.log('Failed to load the sound', e);
        });
    }

    getHeaderColor = () => {
        return this.state.channel;
    }

    /* Connect to this session's firebase */
    componentDidMount() {
        this.setState({ headerText: 'Brainstorm ' + String(this.state.channel + 1) });
        this.startFirebase();
        Linking.addEventListener('url', this.handleOpenURL.bind(this));
    }

    /* Release resources */
    componentWillUnmount() {
        /* react-native-voice */
        Voice.destroy().then(Voice.removeAllListeners);

        /* react-native-sound */
        this.state.record_on_sound.release();
        this.state.record_off_sound.release();

        /* firebase */
        this.removeFirebase();

        /* Handles QR urls */
        Linking.removeEventListener('url', this.handleOpenURL);
    }

    /* Initiates connection with firebase */
    startFirebase = () => {
        /* Ideas */
        this.ideasRef = firebase.database().ref(this.state.session + '/messages');
        this.ideasRef.on('child_added', this.addIdeaUpdate);
        this.ideasRef.on('child_removed', this.removeIdeaUpdate);
        this.ideasRef.on('child_changed', this.changeIdeaUpdate)

        /* Channel */
        this.channelRef = firebase.database().ref(this.state.session + '/channel');
        this.channelRef.on('value', (snapshot) => { 
            this.setState({
                channel: snapshot.val(), 
                headerText: 'Brainstorm ' + String(snapshot.val() + 1), 
            });
        });

        /* Mode */
        this.modeRef = firebase.database().ref(this.state.session + '/mode');
        this.modeRef.on('value', (snapshot) => { this.setState({mode: snapshot.val()}) });
    }

    /* Removes firebase references */
    removeFirebase = () => {
        this.ideasRef.off('child_added', this.addIdeaUpdate);
        this.ideasRef.off('child_removed', this.removeIdeaUpdate);
        this.ideasRef.off('child_changed', this.changeIdeaUpdate);
        this.channelRef.off('value', (snapshot) => { this.setState({channel: snapshot.val()}) });
        this.modeRef.off('value', (snapshot) => { this.setState({mode: snapshot.val()}) });
    }

    /* Handles using QR code while on BrainstormingScreen */
    handleOpenURL(event) {
        if (event.url) {
            const code = event.url.match(/code=([\S]*)/)[1];
            this.setState({ session: code }, () => {
                this.removeFirebase();
                this.startFirebase();
            });
        }
    }

    /* Called when an idea is changed */
    changeIdeaUpdate = (data) => {
        const ideas = this.state.ideas;
        for (let i = 0; i < ideas.length; i++) {
            if (ideas[i].key === data.key) {
                ideas[i].text = data.val().text;
                this.setState({ ideas });
                return;
            }
        }
    }

    /* Called when firebase/messages is added to */
    addIdeaUpdate = (data) => {
        const ideas = this.state.ideas;
        ideas.push({ 
            text: data.val().text, 
            key: data.key, 
            channel: data.val().channel 
        });
        this.setState({ ideas });
    }

    /* Called when firebase/messages is removed from */
    removeIdeaUpdate = (data) => {
        const ideas = this.state.ideas.filter(item => item.key !== data.key);
        this.setState({ ideas });
    }

    /* Submit to firebase/messages */
    submitIdea = () => {
        if (!this.state.ideaText) return; 
        if (this.state.recording) this._stopRecognizing();

        const postList = firebase.database().ref(this.state.session + '/messages').push();
        postList.set({
            text: this.state.ideaText,
            channel: this.state.channel,
        });

        this.setState({
            results: [],
            ideaText: '',
            edited: '',
            ideaTitle: 'Submitted!',
        }, () => {
            setTimeout(() => this.setState({ ideaTitle: 'Your Idea' }), 2000);
        });

        console.log(this.state.ideas)
    }

    /* Submits a +1 or -1 corresponding to an idea to firebase/votes */
    vote = (key, upvote) => {
        const voteList = firebase.database().ref(this.state.session+'/votes').push();
        voteList.set({
            key: key,
            vote: upvote ? 1 : -1,
            channel: this.state.channel,
        });
    }

    /* Called on voice error */
    onSpeechError = e => {
        console.log('onSpeechError: ', e);
        this.setState({ error: JSON.stringify(e.error) });
    };
    
    /* Called on voice results */
    onSpeechResults = e => {
        if (!this.state.recording) return;

        if (this.state.edited) {
            let more = e.value;
            more[0] = more.length > 0 ? more[0].toLowerCase() : more[0];
            const needs_space = this.state.edited.length > 0 && this.state.edited[this.state.edited.length - 1] !== ' ';
            this.setState({
                results: this.state.edited.split() + more,
                ideaText: needs_space ? this.state.edited + ' ' + more.join(' ') : this.state.edited + more.join(' '),
            });
        } else {
            this.setState({
                results: e.value,
                ideaText: e.value.join(' '), 
            });
        }
    };
    
    /* Starts voice recognition. */
    _startRecognizing = async () => {
        this.setState({ error: '' });

        try {
            await Voice.start('en-US');
        } catch (e) {
            console.error(e);
        }

        this.setState({ recording: true });

        this.state.record_on_sound.play((success) => {
            if (!success) console.log('Playback failed due to audio decoding errors');
        });
    };
    
    /* Stops voice recognition. Allows user to activate again and add onto previous state of ideaText. */
    _stopRecognizing = async () => {
        try {
            await Voice.stop();
        } catch (e) {
            console.error(e);
        }

        const needs_space = this.state.ideaText.length > 0 && this.state.ideaText[this.state.ideaText.length - 1] !== ' ';
        this.setState({ 
            recording: false,
            edited: needs_space ? this.state.ideaText + ' ' : this.state.ideaText,
            ideaText: needs_space ? this.state.ideaText + ' ' : this.state.ideaText,
        });

        this.state.record_off_sound.play((success) => {
            if (!success) console.log('Playback failed due to audio decoding errors');
        });
    };

    /* onPress function for 'x' button */
    clearIdea = () => {
        if (this.state.recording) this._stopRecognizing();

        this.setState({
            ideaText: '',
            results: [],
            edited: '',
        });
    }

    /* onChange function for idea text box */
    updateIdeaText = (text) => {
        this.setState({
            ideaText: text,
            results: text.split(),
            edited: text,
        });
    }

    /* onFocus function for idea text box */
    editIdea = () => {
        if (this.state.recording) {
            this._stopRecognizing();
        } else if (this.state.ideaText.length > 0 && this.state.ideaText[this.state.ideaText.length - 1] !== ' ') {
            this.setState({ ideaText: this.state.ideaText + ' ' });
        }
    }

    /* FlatList renderItem */
    _renderItem = ({item}) => (
        <SubmittedIdea 
            item={item} 
            onPress={this.vote} 
            index={this.state.channel}
        />
    )

    /* FlatList keyExtractor */
    _keyExtractor = (item, index) => item.key;

    /* UI for header for both screens */
    renderHeader = () => {
        return (
            <View style={ [styles.navHeader, {backgroundColor: HEADER_COLORS[this.state.channel]} ]}>
                <TouchableOpacity
                    style={styles.backArrowContainer}
                    onPress={() => this.props.navigation.goBack()}
                >
                    <Image 
                        source={require('../images/back_arrow.png')} 
                        style={{ height: '40%' }}
                        resizeMode='contain'
                    />
                </TouchableOpacity> 
                <View style={styles.navHeaderTextContainer}>
                    <Text style={styles.navHeaderText}>{this.state.headerText}</Text>
                </View>
                <View style={styles.backArrowContainer} />
            </View>
        )
    }

    /* Brainstorming screen UI */
    renderFront = () => {
        return (
            <DismissKeyboard>
                <View style={{ flex: 1 }}>
                    <StatusBar barStyle="light-content" />
                    {this.renderHeader()}
                    <View style={styles.body}>
                        <View style={styles.ideaContainer}>
                            <View style={[styles.ideaHeader, { backgroundColor: COLORS[this.state.channel] }]}>
                                <View style={styles.headerFiller} />
                                <View style={styles.ideaHeaderTextContainer}>
                                    <Text style={styles.ideaHeaderText}>{this.state.ideaTitle}</Text>
                                </View>
                                <View style={styles.headerFiller}>
                                    <TouchableOpacity 
                                        onPress={this.clearIdea} 
                                        style={styles.xContainer} 
                                    >
                                        <Image 
                                            source={require('../images/x.png')} 
                                            style={styles.headerX} 
                                            resizeMode='contain' 
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.ideaBody}>
                                <TextInput
                                    style={styles.ideaText}
                                    onChangeText={(text) => this.updateIdeaText(text)}
                                    onFocus ={this.editIdea}
                                    placeholder='Tap the mic to record an idea!'
                                    placeholderTextColor='#DEDEE6'
                                    value={this.state.ideaText}
                                    multiline={true}
                                    keyboardAppearance='dark'
                                />
                                <ThundrButton 
                                    style={{ marginHorizontal: scale(60) }}
                                    text='Submit' 
                                    color={BUTTON_COLORS[this.state.channel]}
                                    onPress={this.submitIdea} 
                                    disabled={this.state.ideaText ? false : true}
                                    opacity={this.state.ideaText ? 1.0 : 0.2}
                                />
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            {this.state.recording ?
                                <Pulse 
                                    color={COLORS[this.state.channel]}
                                    diameter={scale(150)} 
                                    numPulses={3} 
                                    duration={2000} 
                                /> : null
                            }
                            <TouchableOpacity 
                                style={styles.micButton}
                                onPress={this.state.recording ? this._stopRecognizing : this._startRecognizing}
                            >
                                <Image 
                                    source={MICS[this.state.channel]}
                                    style={styles.mic} 
                                    resizeMode='contain' 
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </DismissKeyboard>
        )
    }

    /* Voting screen UI */
    renderBack = () => {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle='light-content'/>
                {this.renderHeader()}
                <View style={styles.body}>
                    <FlatList
                        data={this.state.ideas.filter(idea => idea.channel === this.state.channel)} 
                        renderItem={this._renderItem}
                        ItemSeparatorComponent={this._renderSeparator} 
                        keyExtractor={this._keyExtractor}
                    />
                </View>
            </View>
        )
    }

    render() {
        return (
            <FlipComponent
                isFlipped={this.state.mode ? true : false}
                frontView={this.renderFront()}
                backView={this.renderBack()}
                frontStyles={styles.flipStyle}
                backStyles={styles.flipStyle}
                rotateDuration={300}
            />
        );
    }
}

const styles = StyleSheet.create({
    navHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingBottom: scale(2)
    },
    navHeaderTextContainer: {
        flex: 7,
        alignItems: 'center',
    },
    navHeaderText: {
        fontFamily: 'HiraginoSans-W6',
        fontSize: ThundrSize.medium,
        color: '#FFFFFF', 
    },
    backArrowContainer: {
        flex: 2,
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingBottom: scale(7),
    },
    flipStyle: {
        height,
        width,
    },
    body: {
        flex: 9.5,
        backgroundColor: '#FFFDF4',
    },
    ideaContainer: {
        flex: 4,
        marginHorizontal: scale(25),
        marginTop: scale(45),
        backgroundColor: '#FFFFFE',
        shadowOffset: { width: 0, height: 3.2 },
        shadowColor: '#9D9D9D',
        shadowOpacity: 1.0,
        borderRadius: 20,
    },
    ideaHeader: {
        flex: 0.65,
        flexDirection: 'row',
        backgroundColor: '#7979CE',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20, 
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    ideaHeaderTextContainer: {
        flex: 6,
        alignItems: 'center',
    },
    ideaHeaderText: {
        fontFamily: 'HiraginoSans-W6',
        fontSize: ThundrSize.smedium,
        color: '#FFFFFF',
        marginBottom: scale(5),
    },
    headerFiller: {
        flex: 2,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    xContainer: {
        width: scale(50),
        height: scale(40),
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingTop: scale(10),
    },
    headerX: {
        height: '100%',
    },
    ideaBody: {
        flex: 4.5,
    },
    ideaText: {
        flex: 3.5,
        marginVertical: scale(20),
        marginHorizontal: scale(15),
        fontFamily: 'HiraginoSans-W3',
        fontSize: ThundrSize.small,
        color: '#434343',
    },
    buttonContainer: {
        flex: 1.5,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    micButton: {
        height: '80%',
    },
});