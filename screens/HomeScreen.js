/*  -- HomePage.js --
    Home page of Thundr. Allows user to browse previous brainstorms
    and has a FAB that allows creation of new brainstorms.
*/

import React from 'react'
import { 
    FlatList,
    Image,
    SafeAreaView,
    StatusBar, 
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View, 
} from 'react-native'
import { scale } from 'react-native-size-matters'
import ActionButton from 'react-native-action-button'
import brainstormData from '../data/BrainstormData'
import HomeScreenItem from '../components/HomeScreenItem'
import Modal from 'react-native-modal'
import ThundrSize from '../components/ThundrSize'

export default class HomeScreen extends React.Component {
    state = {
        isModalVisible: false,
    }
    
    render() {
        return (
            <SafeAreaView style={{flex: 1}}> 
                <StatusBar barStyle='light-content'/>
                <Modal 
                    isVisible={this.state.isModalVisible}    
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <View style={styles.iconContainer}>
                                <TouchableOpacity
                                    onPress={this._toggleModalOff}
                                >
                                    <Image
                                        source={require('../images/gray_back_arrow.png')}
                                        resizeMode='contain'
                                        style={{ width: scale(22), height: scale(22) }}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.searchBarContainer}>
                                <TextInput
                                    placeholder='Search'
                                    style={styles.searchText}
                                    autoFocus={true}
                                />
                            </View>
                            <View style={styles.iconContainer}>
                                <TouchableOpacity
                                    onPress={ () => {} }
                                >
                                    <Image 
                                        source={require('../images/mic.png')}
                                        resizeMode='contain'
                                        style= {{ width: scale(22), height: scale(22) }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.modalBody}>
                        </View>
                    </View>
                </Modal>
                <FlatList
                    data={brainstormData}
                    renderItem={this._renderItem}
                    ItemSeparatorComponent={this._renderSeparator}
                />
                <ActionButton
                    buttonColor='#FAD15F' 
                    onPress={ () => {this.props.navigation.push('NewBrainstorm')}}
                />
            </SafeAreaView>
        )
    }

    /* renderItem function for Flatlist. */
    _renderItem = ({item}) => (
        <HomeScreenItem
            title={item.title}
            date={item.date}
            description={item.description}
            ideas={item.ideas}
            collaborators={item.collaborators}
        />
    )

    /* renderSeparator function for Flatlist. */
    _renderSeparator = () => (
        <View 
            style = {{
                height: scale(0.5),
                backgroundColor: '#cccccc',
            }}
        />
    )

    /* Give reference to toggle function to navigation. */
    componentDidMount() {
        this.props.navigation.setParams({
            toggleModalOn: this._toggleModalOn
        });
    }

    _toggleModalOn = () => this.setState({ isModalVisible: true })
    _toggleModalOff = () => this.setState({ isModalVisible: false })

    /* Header styling. */
    static navigationOptions = ({navigation}) => ({
        title: 'Brainstorms', 
        headerStyle: {
            borderBottomWidth: 0,
            height: ThundrSize.headerHeight,
            backgroundColor: '#FAD15F',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
            fontFamily: 'HiraginoSans-W3',
            fontSize: ThundrSize.medium,
        },
        headerBackTitle: null,
        headerRight: (
            <TouchableOpacity 
                style={ {paddingRight: scale(25), paddingBottom: scale(8)} } 
                onPress={navigation.getParam('toggleModalOn')}
            >
                <Image
                    source={require('../images/search.png')}
                    resizeMode='contain'
                    style={ {width: scale(17), height: scale(17)} }
                />
            </TouchableOpacity>
        ),
    })
}

const styles = StyleSheet.create({
    modalContainer: {
        alignSelf: 'center',
        height: '110%',
        width: '110%',
        backgroundColor: '#F5FCFF',
    },
    modalHeader: {
        flex: 1.2,
        flexDirection: 'row',
    },
    modalBody: {
        flex: 8,
        backgroundColor: '#ECECEC',
    },
    iconContainer: {
        flex: 1.5,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: scale(15),
    },
    searchBarContainer: {
        flex: 7,
        justifyContent: 'flex-end',
        paddingBottom: scale(12),
        paddingLeft: scale(20),
    },
    searchText: {
        fontFamily: 'HiraginoSans-W3',
        fontSize: ThundrSize.small,
    },
})