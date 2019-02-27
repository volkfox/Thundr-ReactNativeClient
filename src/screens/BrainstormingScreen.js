/**
 * -- BrainstormingScreen --
 * @flow
 */

/* --TODOS--
    - onSpeechStart() : start animation around mic
    - onSpeech
*/


import React from 'react';
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
// import firebase from 'react-native-firebase';
import * as firebase from 'firebase';
import Pulse from 'react-native-pulse';
import ThundrButton from '../components/ThundrButton';
import ThundrSize from '../components/ThundrSize';
import Voice from 'react-native-voice';

const firebaseConfig = {
    apiKey: "AIzaSyAZ3_t5WUBasDIBn3CtrNYxAOXn7IN8Jb0",
    authDomain: "voice-test-231101.firebaseapp.com",
    databaseURL: "https://voice-test-231101.firebaseio.com",
    projectId: "voice-test-231101",
    storageBucket: "voice-test-231101.appspot.com",
};

// const session = 'MPUZKX';
const session = 'MPUZKX';

export default class BrainstormingScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'New Brainstorm',
            headerStyle: {
                borderBottomWidth: 0,
                height: ThundrSize.headerHeight,
                backgroundColor: '#7979CE',
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
                fontFamily: 'HiraginoSans-W6',
                fontSize: ThundrSize.medium,
                paddingTop: scale(8),
            },
            headerLeft: (
                <TouchableOpacity
                    style={{ alignItems: 'center', justifyContent: 'center', width: scale(50), height: scale(30) }}
                    onPress={ () => navigation.goBack() }
                >
                    <Image
                        source={require('../images/back_arrow.png')}
                        style={{ height: '100%' }}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            ),
            gesturesEnabled: false,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            ideaText: '',
            ideas: [],
            mode: 0,
            channel: 0,

            /* State for voice recognition */
            recording: false,
            recognized: '',
            pitch: '',
            error: '',
            end: '',
            started: '',
            results: [],
        };

        Voice.onSpeechStart = this.onSpeechStart;
        Voice.onSpeechError = this.onSpeechError;
        Voice.onSpeechResults = this.onSpeechResults;
        firebase.initializeApp(firebaseConfig);
    }

    componentDidMount() {


        /* Ideas */
        const ideasRef = firebase.database().ref(session + '/messages');
        ideasRef.on('child_added', this.updateIdeas);
        ideasRef.on('child_removed', this.removeIdeas);

        /* Channel */
        const channelRef = firebase.database().ref(session + '/channel');
        channelRef.on('value', (snapshot) => { this.setState({channel: snapshot.val()}) });

        /* Mode */
        const modeRef = firebase.database().ref(session + '/mode');
        modeRef.on('value', (snapshot) => { this.setState({mode: snapshot.val()}) });
    }

    componentWillUnmount() {
        Voice.destroy().then(Voice.removeAllListeners);
    }

    updateIdeas = (data) => {
        const ideas = this.state.ideas;
        ideas.push({text: data.val().text, key: data.key});
        this.setState({ ideas });
        // console.log(this.state.ideas);
    }

    removeIdeas = (data) => {
        const ideas = this.state.ideas.filter(item => item.key !== data.key);
        this.setState({ ideas });
    }

    onSpeechStart = e => {
        this.setState({
            recording: true,
        });
    };

    onSpeechError = e => {
        console.log('onSpeechError: ', e);
        this.setState({
            error: JSON.stringify(e.error),
        });
    };

    onSpeechResults = e => {
        this.setState({
            results: e.value,
            ideaText: e.value.join(' '),
            // map function to make ideaText
        });
        if (this.state.results) {
            console.log(this.state.results);
            console.log(this.state.ideaText);
        }
    };

    _startRecognizing = async () => {
        console.log('Start recognizing.');
        this.setState({
            recognized: '',
            pitch: '',
            error: '',
            started: '',
            results: [],
            partialResults: [],
            end: '',
        });

        try {
            await Voice.start('en-US');
        } catch (e) {
            console.error(e);
        }
    };

    _stopRecognizing = async () => {
        console.log('Stopping Recording');
        try {
            await Voice.stop();
        } catch (e) {
            console.error(e);
        }
        this.setState({
            recording: false,
        });
    };

    updateIdeaText = (text) => {
        this.setState({
            ideaText: text,
        });
    }

    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <StatusBar barStyle='light-content' />
                <View style={styles.ideaContainer}>
                    <View style={styles.ideaHeader}>
                        <View style={styles.headerFiller}/>
                        <View style={styles.ideaHeaderTextContainer}>
                            <Text style={styles.ideaHeaderText}>Your Idea</Text>
                        </View>
                        <View style={styles.headerFiller}>
                            <TouchableOpacity
                                onPress={ () => console.log() }  /* Make this reset the idea text and results */
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
                        {/* <TextInput
                            style={styles.ideaText}
                            onChangeText={ (text) => this.updateIdeaText(text) }
                            placeholder='Tap the mic to record an idea!'
                            placeholderTextColor='#8E8E8E'
                            value={this.state.ideaText}
                            multiline={true}
                        /> */}
                        <View style={styles.ideaText}>
                            {this.state.results.map((result, index) => {
                            {/* {this.state.partialResults.map((result, index) => { */}
                                return (
                                    <Text key={`result-${index}`} style={styles.ideaText}>
                                        {result}
                                    </Text>
                                );
                            })}
                        </View>
                        <ThundrButton
                            style={{ marginHorizontal: scale(60) }}
                            text='Submit'
                            color='dark'
                            onPress={ () => console.log } />
                    </View>
                </View>
                <View style={styles.microphoneContainer}>
                    {/* <Pulse color='#D3CFCF' diameter={scale(200)} numPulses={2} speed={15}/> */}
                    <View style={styles.buttonContainer}>
                        {/* <TouchableOpacity onPress={this._startRecognizing}> */}
                        {/* <TouchableOpacity onPress={this.toggleRecord}> */}
                        <TouchableOpacity onPress={this.state.recording ? this._stopRecognizing : this._startRecognizing}>
                            <Image
                                source={require('../images/mic.png')}
                                style={styles.mic}
                                resizeMode='contain'
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
    },
    backArrow: {
        backgroundColor: 'red',
    },
    ideaContainer: {
        flex: 4.5,
        marginHorizontal: scale(23),
        marginTop: scale(30),
        marginBottom: scale(5),
        backgroundColor: '#FFFFFE',
        shadowOffset: { width: 0, height: 3 },
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
    microphoneContainer: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        height: '60%',
        justifyContent: 'center',
    },
    mic: {
        height: '100%',
    },
});
