/*  -- HomePage.js --
    Home page of Thundr. Allows user to browse previous brainstorms
    and has a FAB that allows creation of new brainstorms.
*/

import React from 'react'
import { 
    View, 
    StyleSheet, 
    StatusBar, 
    SafeAreaView,
    ScrollView,
    Image,
} from 'react-native'
import FontStyles from '../components/FontStyles'
import ActionButton from 'react-native-action-button'

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Brainstorms', 
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
                <View style={styles.container}>
                    <StatusBar barStyle='light-content'/>
                    <ScrollView>
                        <View style={styles.imageContainer}>
                            <Image 
                                source={require('../images/idea1.png')}
                                style={styles.idea}
                                resizeMode='contain'
                            />
                        </View>
                        <View style={styles.imageContainer}>
                            <Image 
                                source={require('../images/idea2.png')}
                                style={styles.idea}
                                resizeMode='contain'
                            />
                        </View>
                        <View style={styles.imageContainer}>
                            <Image 
                                source={require('../images/idea3.png')}
                                style={styles.idea}
                                resizeMode='contain'
                            />
                        </View>
                        <View style={styles.imageContainer}>
                            <Image 
                                source={require('../images/idea4.png')}
                                style={styles.idea}
                                resizeMode='contain'
                            />
                        </View>
                        <View style={styles.imageContainer}>
                            <Image 
                                source={require('../images/idea4.png')}
                                style={styles.idea}
                                resizeMode='contain'
                            />
                        </View>
                    </ScrollView>
                    <ActionButton
                        buttonColor='#FAD15F' 
                        onPress={ () => {this.props.navigation.push('NewBrainstorm')}}
                    />
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    imageContainer: {
       alignItems: 'center',
       height: 150,
       justifyContent: 'flex-start',
    },
    idea: {
        width: '90%',
    }
})